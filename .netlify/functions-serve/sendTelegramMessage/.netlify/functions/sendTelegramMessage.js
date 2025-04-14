var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// .netlify/functions/sendTelegramMessage.js
var sendTelegramMessage_exports = {};
__export(sendTelegramMessage_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(sendTelegramMessage_exports);
async function handler(event) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430: \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F \u043D\u0435 \u0437\u0430\u0434\u0430\u043D\u044B");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "\u041F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F \u043D\u0435 \u0437\u0430\u0434\u0430\u043D\u044B" })
    };
  }
  let name = "";
  let phone = "";
  let message = "";
  try {
    const body = JSON.parse(event.body);
    name = body.name || "";
    phone = body.phone || "";
    message = body.message || "";
  } catch (err) {
    console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0430\u0440\u0441\u0438\u043D\u0433\u0430 \u0442\u0435\u043B\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430", err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u0430" })
    };
  }
  const text = `
  \u{1F4DD} \u041D\u043E\u0432\u0430\u044F \u0437\u0430\u044F\u0432\u043A\u0430 \u0441 \u0441\u0430\u0439\u0442\u0430 SoulDialogue
  
  \u{1F4C6} ${(/* @__PURE__ */ new Date()).toLocaleDateString("ru-RU")}
  \u23F0 ${(/* @__PURE__ */ new Date()).toLocaleTimeString("ru-RU").slice(0, 5)}
  
  \u{1F464} \u0418\u043C\u044F: ${name}
  \u{1F4DE} \u0422\u0435\u043B\u0435\u0444\u043E\u043D: ${phone}
  \u2709\uFE0F \u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435: ${message}
    `;
  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text
      })
    });
    const result = await telegramRes.json();
    if (!telegramRes.ok) {
      console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0432 Telegram:", result);
      return {
        statusCode: telegramRes.status,
        body: JSON.stringify({ error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435", details: result })
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, result })
    };
  } catch (error) {
    console.error("\u274C \u0421\u0431\u043E\u0439 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0432 Telegram:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438", details: error.message })
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=sendTelegramMessage.js.map
