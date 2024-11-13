// bot/bot.js
const axios = require("axios");
const FormData = require("form-data"); // Убедитесь, что form-data установлена
const { telegramToken, chatId } = require("../config");
const TELEGRAM_API = `https://api.telegram.org/bot${telegramToken}`;
const { Telegraf } = require("telegraf");
const bot = new Telegraf(telegramToken);

// Обработчик команды /start, чтобы отправить ссылку на Web App
bot.start((ctx) => {
  ctx.reply("Заполните форму, нажав на кнопку ниже.", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть форму",
            web_app: { url: "https://000f-37-214-32-178.ngrok-free.app" },
          },
        ],
      ],
    },
  });
});

bot.launch();
console.log("Бот запущен и готов открыть Web App");

async function sendMessageToTelegram(data, files) {
  const messageText = `📋Подана новая заявка📋\n <b>Имя:</b> ${data.name}\n <b>Рост:</b> ${data.height}\n <b>Возраст:</b> ${data.age}\n <b>Национальность:</b> ${data.nationality}\n <b>Проживает:</b> ${data.based}\n <b>Замеры:</b> ${data.bust}/${data.waist}/${data.hips}\n <b>Instagram:</b> ${data.instagram}\n <b>Контактные данные:</b> ${data.contact}\n <b>О себе:</b> ${data.about}`;

  // Отправка текстового сообщения в Telegram
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: messageText,
    parse_mode: "HTML",
  });


  const photos = [];
  const videos = [];

  files.forEach((file) => {
    const fileType = file.mimetype.split('/')[0];  // Получаем тип файла (image или video)

    if (fileType === 'image') {
      photos.push(file);
    } else if (fileType === 'video') {
      videos.push(file);
    }
  });

  const mediaGroup = [];

    // Добавляем фотографии в группу
    photos.forEach((file, index) => {
      mediaGroup.push({
        type: 'photo',
        media: `attach://${file.originalname}`,
        caption: index === 0 ? messageText : '',  // Добавляем описание только для первой фотографии
      });
    });
  
    // Добавляем видео в группу
    videos.forEach((file, index) => {
      mediaGroup.push({
        type: 'video',
        media: `attach://${file.originalname}`,
        caption: index === 0 ? messageText : '',  // Добавляем описание только для первого видео
      });
    });

    // Создаем FormData и добавляем файлы
  const formData = new FormData();
  formData.append('chat_id', chatId);
  formData.append('media', JSON.stringify(mediaGroup));

  // Добавляем каждый файл как вложение
  [...photos, ...videos].forEach((file) => {
    formData.append(file.originalname, file.buffer, file.originalname);
  });

  // Отправляем запрос на sendMediaGroup
  await axios.post(`${TELEGRAM_API}/sendMediaGroup`, formData, {
    headers: formData.getHeaders(),
  }).catch((error) => {
    console.error('Ошибка при отправке файлов в Telegram:', error);
  });

  // // Отправка файлов в Telegram
  // for (const file of files) {
  //   const formData = new FormData();
  //   formData.append('chat_id', chatId);
  //   formData.append('document', file.buffer, file.originalname);  // Преобразование в правильный формат

  //   await axios.post(`${TELEGRAM_API}/sendDocument`, formData, {
  //     headers: formData.getHeaders()
  //   }).catch(error => {
  //     console.error("Ошибка при отправке файла в Telegram:", error);
  //   });
  // }
}

module.exports = { sendMessageToTelegram };
