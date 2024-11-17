const express = require("express");
const multer = require("multer");
const { sendMessageToTelegram } = require("../bot/bot.js");
const { serverPort } = require("../config");
const crypto = require("crypto");
const app = express();
const upload = multer();

const { telegramToken } = require("../config");
const BOT_TOKEN = telegramToken;
const SECRET_KEY = crypto
  .createHmac("sha256", BOT_TOKEN)
  .update("WebAppData")
  .digest();
console.log("SECRET_KEY на сервере:", SECRET_KEY.toString("hex"));

app.use(express.json());
app.use(express.static("./web-app/public"));

let validateTelegramWebApp = false

app.post("/validate", (req, res) => {
  const initData = req.body.initData;

  function validateTelegramWebAppData(initData, BOT_TOKEN) {
    const secretKey = crypto
      .createHmac("sha256", "WebAppData")
      .update(BOT_TOKEN)
      .digest();

    const initDataParams = new URLSearchParams(initData);
    const hash = initDataParams.get("hash");
    initDataParams.delete("hash");

    const dataCheckString = Array.from(initDataParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    const calculatedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    validateTelegramWebApp = calculatedHash === hash;
    console.log(validateTelegramWebApp);

    if (calculatedHash === hash) {
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
    return validateTelegramWebApp;
  }
  validateTelegramWebAppData(initData, BOT_TOKEN);
});

app.post("/submit", upload.array("files", 8), async (req, res) => {
  try {
    if (validateTelegramWebApp) {
      const {
        name,
        height,
        age,
        nationality,
        based,
        bust,
        waist,
        hips,
        instagram,
        contact,
        about,
      } = req.body;
      const files = req.files;

      console.log("Полученные данные:", {
        name,
        height,
        age,
        nationality,
        based,
        bust,
        waist,
        hips,
        instagram,
        contact,
        about,
        files,
      }); // Добавьте вывод данных для проверки

      if (
        !name ||
        !height ||
        !age ||
        !nationality ||
        !based ||
        !bust ||
        !waist ||
        !hips ||
        !instagram ||
        !contact ||
        !about
      ) {
        console.error("Ошибка: отсутствуют обязательные поля");
        return res.status(400).send({
          success: false,
          message: "Заполните все обязательные поля.",
        });
      }

      if (!files || files.length === 0) {
        console.error("Ошибка: отсутствуют файлы");
        return res
          .status(400)
          .send({ success: false, message: "Необходимо прикрепить файлы." });
      }

      await sendMessageToTelegram(
        {
          name,
          height,
          age,
          nationality,
          based,
          bust,
          waist,
          hips,
          instagram,
          contact,
          about,
        },
        files
      );
      res
        .status(200)
        .send({ success: true, message: "Заявка успешно отправлена!" });
    } else {
      console.error("Неинициализированый вход");
      return res
        .status(503)
        .send({ success: false, message: "Use to tg WebApp." });
    }
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
    res
      .status(500)
      .send({ success: false, message: "Ошибка при отправке данных" });
  }
});

app.listen(serverPort, () =>
  console.log(`Server is running on http://127.0.0.1:${serverPort}`)
);
