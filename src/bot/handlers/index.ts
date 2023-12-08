import "dotenv/config";
import { Composer } from "grammy";
import { Context } from "../context";

import commands from "./commands";
import webAppData from "./webAppData";

const composer = new Composer<Context>();

composer.use(webAppData);

composer
  .on("message")
  .filter((ctx) => ctx.chat?.type === "private")
  .use(commands);

export default composer;
