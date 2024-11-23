// bot/bot.js
const axios = require("axios");
const FormData = require("form-data"); 
const { telegramToken, chatId, URL} = require("../config");
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
            web_app: { url: URL },
            // web_app: { url: "mazer-model-management-d8442e8f971d.herokuapp.com" },
          },
        ],
      ],
    },
  });
});



bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;
  
  if (data === 'disabled') {
    await ctx.answerCbQuery('Эта кнопка уже была использована.', { show_alert: true });
    return; 
  }

  const [action, contact, lang] = data.split(':');

  let responseMessage;
  let updatedButtons;

  if (action === 'accept') {
    responseMessage = lang === 'ua'
      ? "Вітаю, запрошуємо до співпраці, наш агент незабаром з вами зв'яжеться"
      : "Congratulations, we invite you to cooperate. Our agent will be in contact with you soon";
    updatedButtons = [
      [{ text: "✅ Приглашен", callback_data: 'disabled' }]
    ];
  } else if (action === 'reject') {
    responseMessage = lang === 'ua'
      ? "Вибачте, ви нам не підходите."
      : "Sorry, you are not suitable for us.";
    updatedButtons = [
      [{ text: "❌ Отклонено", callback_data: 'disabled' }]
    ];
  }

  try {
    await ctx.answerCbQuery(`Вы выбрали: ${responseMessage}`);
    
    await ctx.editMessageReplyMarkup({
      inline_keyboard: updatedButtons,
    });

    await bot.telegram.sendMessage(contact, responseMessage, {
      parse_mode: "HTML"
    });
  } catch (error) {
    console.error("Ошибка при обработке нажатия кнопки:", error);
  }
});


bot.launch();

async function sendMessageToTelegram(data, files) {
  const messageText = `📋Подана новая заявка📋\n <b>Имя:</b> ${data.name}\n <b>Рост:</b> ${data.height}\n <b>Возраст:</b> ${data.age}\n <b>Национальность:</b> ${data.nationality}\n <b>Проживает:</b> ${data.based}\n <b>Параметры:</b> ${data.bust}/${data.waist}/${data.hips}\n <b>Instagram:</b> ${data.instagram_link}\n <b>Контактные данные:</b> ${data.contact}\n <b>О себе:</b> ${data.about}`;
  
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: messageText,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Принять", callback_data: `accept:${data.userID}:${data.language}` },
          { text: "❌ Отклонить", callback_data: `reject:${data.userID}:${data.language}` }
        ]
      ]
    }
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
