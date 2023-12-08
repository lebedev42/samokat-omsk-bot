"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = exports.getSessionKey = exports.initial = void 0;
const grammy_1 = require("grammy");
const initial = () => ({});
exports.initial = initial;
function getSessionKey(ctx) {
    return ctx.from?.id.toString();
}
exports.getSessionKey = getSessionKey;
exports.session = (0, grammy_1.session)({ initial: exports.initial, getSessionKey });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ib3Qvc2Vzc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBNkM7QUFLdEMsTUFBTSxPQUFPLEdBQUcsR0FBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUE5QixRQUFBLE9BQU8sV0FBdUI7QUFFM0MsU0FBZ0IsYUFBYSxDQUFDLEdBQVk7SUFDeEMsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNqQyxDQUFDO0FBRkQsc0NBRUM7QUFFWSxRQUFBLE9BQU8sR0FBRyxJQUFBLGdCQUFRLEVBQUMsRUFBRSxPQUFPLEVBQVAsZUFBTyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMifQ==