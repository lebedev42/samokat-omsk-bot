"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const grammy_1 = require("grammy");
const commands_1 = __importDefault(require("./commands"));
const composer = new grammy_1.Composer();
composer
    .on("message")
    .filter((ctx) => ctx.chat?.type === "private")
    .use(commands_1.default);
exports.default = composer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYm90L2hhbmRsZXJzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUJBQXVCO0FBQ3ZCLG1DQUFrQztBQUdsQywwREFBa0M7QUFFbEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxpQkFBUSxFQUFXLENBQUM7QUFFekMsUUFBUTtLQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7S0FDYixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxLQUFLLFNBQVMsQ0FBQztLQUM3QyxHQUFHLENBQUMsa0JBQVEsQ0FBQyxDQUFDO0FBRWpCLGtCQUFlLFFBQVEsQ0FBQyJ9