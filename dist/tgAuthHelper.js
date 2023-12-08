"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.transformInitData = void 0;
const webcrypto_1 = require("@peculiar/webcrypto");
const crypto = new webcrypto_1.Crypto();
function transformInitData(initData) {
    return Object.fromEntries(new URLSearchParams(initData));
}
exports.transformInitData = transformInitData;
async function validate(data, botToken) {
    const encoder = new TextEncoder();
    const checkString = Object.keys(data)
        .filter((key) => key !== 'hash')
        .map((key) => `${key}=${data[key]}`)
        .sort()
        .join('\n');
    const secretKey = await crypto.subtle.importKey('raw', encoder.encode('WebAppData'), { name: 'HMAC', hash: 'SHA-256' }, true, ['sign']);
    const secret = await crypto.subtle.sign('HMAC', secretKey, encoder.encode(botToken));
    const signatureKey = await crypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, true, ['sign']);
    const signature = await crypto.subtle.sign('HMAC', signatureKey, encoder.encode(checkString));
    const hex = [...new Uint8Array(signature)]
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    return data.hash === hex;
}
exports.validate = validate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGdBdXRoSGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3RnQXV0aEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBNkM7QUFFN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBTSxFQUFFLENBQUM7QUFFNUIsU0FBZ0IsaUJBQWlCLENBQUMsUUFBUTtJQUN4QyxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRkQsOENBRUM7QUFFTSxLQUFLLFVBQVUsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRO0lBQzNDLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7SUFFbEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDbEMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDO1NBQy9CLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDbkMsSUFBSSxFQUFFO1NBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWQsTUFBTSxTQUFTLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDN0MsS0FBSyxFQUNMLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQzVCLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLElBQUksRUFDSixDQUFDLE1BQU0sQ0FBQyxDQUNULENBQUM7SUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNyQyxNQUFNLEVBQ04sU0FBUyxFQUNULE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQ3pCLENBQUM7SUFDRixNQUFNLFlBQVksR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUNoRCxLQUFLLEVBQ0wsTUFBTSxFQUNOLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ2pDLElBQUksRUFDSixDQUFDLE1BQU0sQ0FBQyxDQUNULENBQUM7SUFDRixNQUFNLFNBQVMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUN4QyxNQUFNLEVBQ04sWUFBWSxFQUNaLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQzVCLENBQUM7SUFFRixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdkMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRVosT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQztBQUMzQixDQUFDO0FBdkNELDRCQXVDQyJ9