const express = require('express');
const multer = require('multer');
const { sendMessageToTelegram } = require('../bot/bot.js');
const { serverPort } = require('../config');

const app = express();
const upload = multer();

app.use(express.json());
app.use(express.static('./web-app/public'));

app.post('/submit', upload.array('files', 8), async (req, res) => {
  try {
    // const { name, email, message } = req.body;
    const { name, height, age, nationality, based, bust, waist, hips, instagram, contact, about} = req.body;
    const files = req.files;

    console.log("Полученные данные:", { name, height, age, nationality, based, bust, waist, hips, instagram, contact, about, files }); // Добавьте вывод данных для проверки

    if (!name || !height || !age || !nationality || !based || !bust || !waist || !hips || !instagram || !contact || !about) {
      console.error("Ошибка: отсутствуют обязательные поля");
      return res.status(400).send({ success: false, message: 'Заполните все обязательные поля.' });
    }

    if (!files || files.length === 0) {
      console.error("Ошибка: отсутствуют файлы");
      return res.status(400).send({ success: false, message: 'Необходимо прикрепить файлы.' });
    }

    // Send in Tg
    await sendMessageToTelegram({ name, height, age, nationality, based, bust, waist, hips, instagram, contact, about}, files);
    res.status(200).send({ success: true, message: 'Заявка успешно отправлена!' });
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    res.status(500).send({ success: false, message: 'Ошибка при отправке данных' });
  }
});


app.listen(serverPort, () => console.log(`Server is running on http://127.0.0.1:${serverPort}`));
