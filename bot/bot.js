// bot/bot.js
const axios = require("axios");
const FormData = require("form-data"); 
const { telegramToken, chatId } = require("../config");
const TELEGRAM_API = `https://api.telegram.org/bot${telegramToken}`;
const { Telegraf } = require("telegraf");
const bot = new Telegraf(telegramToken);

bot.start((ctx) => {
  ctx.reply("🇺🇸Click the button below to fill out the form. \n🇺🇦Натисніть кнопку внизу, щоб заповнити форму.", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open form",
            web_app: { url: "https://b693-37-214-30-223.ngrok-free.app" },
          },
        ],
      ],
    },
  });
});

bot.launch();

async function sendMessageToTelegram(data, files) {
  const messageText = `📋Подана новая заявка📋\n <b>Имя:</b> ${data.name}\n <b>Рост:</b> ${data.height}\n <b>Возраст:</b> ${data.age}\n <b>Национальность:</b> ${data.nationality}\n <b>Проживает:</b> ${data.based}\n <b>Замеры:</b> ${data.bust}/${data.waist}/${data.hips}\n <b>Instagram:</b> ${data.instagram}\n <b>Контактные данные:</b> ${data.contact}\n <b>О себе:</b> ${data.about}`;

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: messageText,
    parse_mode: "HTML",
  });


  const photos = [];
  const videos = [];

  files.forEach((file) => {
    const fileType = file.mimetype.split('/')[0];

    if (fileType === 'image') {
      photos.push(file);
    } else if (fileType === 'video') {
      videos.push(file);
    }
  });

  const mediaGroup = [];

    photos.forEach((file, index) => {
      mediaGroup.push({
        type: 'photo',
        media: `attach://${file.originalname}`,
        caption: index === 0 ? '' : messageText, 
        parse_mode: "HTML",
      });
    });

    videos.forEach((file, index) => {
      mediaGroup.push({
        type: 'video',
        media: `attach://${file.originalname}`,
        caption: index === 0 ? '' : messageText,
        parse_mode: "HTML",
      });
    });

  const formData = new FormData();
  formData.append('chat_id', chatId);
  formData.append('media', JSON.stringify(mediaGroup));

  [...photos, ...videos].forEach((file) => {
    formData.append(file.originalname, file.buffer, file.originalname);
  });

  await axios.post(`${TELEGRAM_API}/sendMediaGroup`, formData, {
    headers: formData.getHeaders(),
  }).catch((error) => {
    console.error('Error sending files to Telegram:', error);
  });

}

module.exports = { sendMessageToTelegram };
