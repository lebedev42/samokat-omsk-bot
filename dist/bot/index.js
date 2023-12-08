"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const grammy_1 = require("grammy");
const runner_1 = require("@grammyjs/runner");
const transformer_throttler_1 = require("@grammyjs/transformer-throttler");
const parse_mode_1 = require("@grammyjs/parse-mode");
const session_1 = require("./session");
const handlers_1 = __importDefault(require("./handlers"));
const bot = new grammy_1.Bot(process.env.BOT_TOKEN);
const throttler = (0, transformer_throttler_1.apiThrottler)();
bot.api.config.use(throttler);
bot.use(parse_mode_1.hydrateReply);
bot.use((0, runner_1.sequentialize)(session_1.getSessionKey));
bot.use(session_1.session);
bot.use(handlers_1.default);
// Start bot with polling by default and Sequentialize runner
const runner = (0, runner_1.run)(bot);
// Stopping the bot when Node process
// is about to be terminated
const stopRunner = () => runner.isRunning() && runner.stop();
process.once("SIGINT", stopRunner);
process.once("SIGTERM", stopRunner);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYm90L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUJBQXVCO0FBQ3ZCLG1DQUE2QjtBQUM3Qiw2Q0FBc0Q7QUFDdEQsMkVBQStEO0FBQy9ELHFEQUFvRDtBQUdwRCx1Q0FBbUQ7QUFFbkQsMERBQWtDO0FBRWxDLE1BQU0sR0FBRyxHQUFHLElBQUksWUFBRyxDQUEyQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sU0FBUyxHQUFHLElBQUEsb0NBQVksR0FBRSxDQUFDO0FBRWpDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM5QixHQUFHLENBQUMsR0FBRyxDQUFDLHlCQUFZLENBQUMsQ0FBQztBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsc0JBQWEsRUFBQyx1QkFBYSxDQUFDLENBQUMsQ0FBQztBQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsQ0FBQztBQUNqQixHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFRLENBQUMsQ0FBQztBQUVsQiw2REFBNkQ7QUFDN0QsTUFBTSxNQUFNLEdBQUcsSUFBQSxZQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFFeEIscUNBQXFDO0FBQ3JDLDRCQUE0QjtBQUM1QixNQUFNLFVBQVUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0FBRTdELE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDIn0=