import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js"; // Убедись, что путь правильный

dotenv.config(); // Загружаем переменные окружения

// Подключение к MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/ModelHub", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Данные тестового пользователя
const testUser = {
  name: "Andrei Maisak",
  email: "user1@user",
  phone: "123-456-7890",
  location: "New York, USA",
  measurements: {
    height: "180 cm",
    bust: "90 cm",
    waist: "75 cm",
    hips: "95 cm",
  },
  password: "user1", // Простой пароль для теста (изменить на более сложный)
  documents: [
    { title: "Passport", date: "2023-01-01" },
    { title: "Visa", date: "2024-02-15" },
  ],
  agencies: [
    { name: "Elite Models", location: "Paris, France", status: "Active" },
    { name: "Next Management", location: "London, UK", status: "Pending" },
  ],
  events: [
    { title: "Fashion Week", date: "2024-03-10", status: "Confirmed" },
    { title: "Photo Shoot", date: "2024-04-05", status: "Planned" },
  ],
  avatar:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png",
  isAdmin: false, // Если нужно создать администратора, поставь `true`
};

// Функция для регистрации тестового пользователя
const registerTestUser = async () => {
  try {
    // Проверяем, есть ли уже такой пользователь
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log("Пользователь уже существует!");
      mongoose.connection.close();
      return;
    }

    // Хэшируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(testUser.password, 10);

    // Создаем нового пользователя
    const newUser = new User({
      ...testUser,
      password: hashedPassword,
    });

    // Сохраняем в базе данных
    await newUser.save();
    console.log("✅ Тестовый пользователь успешно зарегистрирован!");
  } catch (error) {
    console.error("❌ Ошибка при регистрации:", error);
  } finally {
    mongoose.connection.close(); // Закрываем соединение с MongoDB
  }
};

// Запуск функции
registerTestUser();