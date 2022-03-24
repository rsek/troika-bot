import { SelectMenuComponent } from "discord.js";
import _ from "lodash";
import { NumericAttrHash, currentKeyName, maxKeyName } from "../ux/NumericAttrHash.js";
import { endOfRoundToken, isPlayerToken, henchmanToken, enemyToken } from "./initiativeTokens.js";
import numberEmoji from "../../constants/numberEmoji.js";
import getTaskMenuStub from "../../interactions/tasks/getTaskMenuStub.js";

export const returnTokenMenuId = "returnTokenMenu";
/**
 * Builds a select menu used to return tokens to the initiative token stack.
 * @param tokens The token attributes to use when building the menu.
 * @returns The menu.
 */
export default function buildReturnTokenMenu(tokens: NumericAttrHash) {
  const menu = getTaskMenuStub(returnTokenMenuId)
    .setPlaceholder("Return tokens to initiative stack...")
  ;
  _.forEach(tokens, (token) => {
    if (token.name !== endOfRoundToken && token[currentKeyName] < token[maxKeyName]) {
      switch (true) {
        case isPlayerToken(token.name): {
          menu.addOptions(
            token
              .toSelectMenuOption({ current: 1, max: 0 })
              .setLabel(`Return 1 of ${token.name}'s tokens to stack`)
              .setEmoji({ name: "👤" })
          );
          break;
        }
        case token.name === henchmanToken: {
          menu.addOptions(
            token
              .toSelectMenuOption({ current: 1, max: 0 })
              .setLabel("Return 1 henchman token to stack")
              .setEmoji({ name: "👥" })
          );
          break;
        }
        case token.name === enemyToken: {
          numberEmoji.slice(1,Math.min(6, token[currentKeyName])).forEach((emoji, index) => {
            const currentValue = index+1;
            const missingTokens = token[maxKeyName] - token[currentKeyName];
            if (currentValue <= missingTokens) {
              const option = token
                .toSelectMenuOption({ current: currentValue, max: 0 })
                .setLabel(`Return ${currentValue} enemy ${currentValue > 1 ? "tokens" : "token"} to stack`)
                .setEmoji({ name: emoji as string })
            ;
              menu.addOptions(option);
            }
          });
          break;
        }
        default:
          break;
      }
    }
  });
  return menu;
}