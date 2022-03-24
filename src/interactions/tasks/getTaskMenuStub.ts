import { SelectMenuBuilder } from "discord.js";
import { taskMenuIdPrefix } from "../components/TaskMenu.js";


export default function getTaskMenuStub(idSuffix: string) {
  return new SelectMenuBuilder()
    .setCustomId(`${taskMenuIdPrefix}.${idSuffix}`)
    .setMaxValues(1)
    .setMinValues(1);
}
