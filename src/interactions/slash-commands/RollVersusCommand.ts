import "reflect-metadata";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption , SlashGroup } from "discordx";
import RollVersus from "../../modules/rolls/RollVersus.js";
import { fileURLToPath } from "url";

console.info("initializing", fileURLToPath(import.meta.url));

@Discord()
export abstract class RollVersusCommand {
  @Slash("versus", { description: "Two opponents each roll 2d6 and add any applicable bonuses. The higher total wins." })
  @SlashGroup("roll")
  async versus(
    @SlashOption("character-bonus", {
      type: ApplicationCommandOptionType.Number,
      minValue: 0
    })
      characterBonus: number,
    @SlashOption("opponent-bonus", {
      type: ApplicationCommandOptionType.Number,
      minValue: 0
    })
      opponentBonus: number,
    @SlashOption("character-name",{
      type: ApplicationCommandOptionType.String,
      description: "The character's name.",
      required: false
    })
      characterName = "Player",
    @SlashOption("opponent-name", {
      type: ApplicationCommandOptionType.String,
      description: "A name or label for the opponent.",
      required: false
    })
    opponentName = "Opponent",
    @SlashOption("description", {
      type: ApplicationCommandOptionType.String,
      description: "An optional text description to include with the roll.",
      required: false
    })
    description = "",
    interaction: CommandInteraction
  ) {
    const roll = new RollVersus(characterBonus,opponentBonus,characterName,opponentName, description.length ? description : undefined);

    await interaction.reply({ embeds: [roll.toEmbed()] });
  }
}