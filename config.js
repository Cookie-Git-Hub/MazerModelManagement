require('dotenv').config();

module.exports = {
    telegramToken: process.env.BOT_TOKEN,
    chatId: process.env.CHAT_ID,
    serverPort: 8080
  };

