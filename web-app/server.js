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
        console.error("Error: Required fields are missing");
        return res.status(400).send({
          success: false,
          message: "Please fill in all required fields.",
        });
      }

      if (!files || files.length === 0) {
        console.error("Error: missing files");
        return res
          .status(400)
          .send({ success: false, message: "You must attach files." });
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
        .send({ success: true, message: "Application sent successfully!" });
    } else {
      console.error("Uninitialized input");
      return res
        .status(503)
        .send({ success: false, message: "Use to tg WebApp." });
    }
  } catch (error) {
    console.error("Error sending data:", error);
    res
      .status(500)
      .send({ success: false, message: "Error sending data" });
  }
});

app.listen(serverPort, () =>
  console.log(`Server is running on http://127.0.0.1:${serverPort}`)
);
