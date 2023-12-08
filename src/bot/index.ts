import "dotenv/config";
import { Bot } from "grammy";
import { run, sequentialize } from "@grammyjs/runner";
import { apiThrottler } from "@grammyjs/transformer-throttler";
import { hydrateReply } from "@grammyjs/parse-mode";
import type { ParseModeFlavor } from "@grammyjs/parse-mode";

import { getSessionKey, session } from "./session";
import { Context } from "./context";
import handlers from "./handlers";

console.error("process.env", process.env);

const bot = new Bot<ParseModeFlavor<Context>>(process.env.BOT_TOKEN);
const throttler = apiThrottler();

bot.api.config.use(throttler);
bot.use(hydrateReply);
bot.use(sequentialize(getSessionKey));
bot.use(session);
bot.use(handlers);

// Start bot with polling by default and Sequentialize runner
const runner = run(bot);

// Stopping the bot when Node process
// is about to be terminated
const stopRunner = () => runner.isRunning() && runner.stop();

process.once("SIGINT", stopRunner);
process.once("SIGTERM", stopRunner);
