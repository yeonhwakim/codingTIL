const TelegramBot = require('node-telegram-bot-api');

const token= process.env.BOT_TOKEN;
const id = process.env.BOT_ID; // <--- 나의 Token

const bot = new TelegramBot(token, {polling: false});
module.exports = (req, res) =>{
  bot.sendMessage(id, req.body.text);
  return res.end('success')
}