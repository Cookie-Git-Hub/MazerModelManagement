const http = require("http");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");


// ME-типы файлов, используемые для отправки в HTTP-ответе
const contentTypes = {
    ".ico": "image/x-icon",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".html": "text/html; charset=utf-8",
    ".css": "text/css",
    ".js": "text/javascript",
};

// Функция для отправки файлов
function sendFile(response, filePath, contentType) {
    fs.createReadStream(filePath).pipe(response);
}

// Функция для обработки ошибок
function handleError(response, statusCode, message) {
    response.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
    response.end(`<h1>${statusCode} - ${message}</h1>`);
}

function handleApplication(request, response) {
    if (request.method === "POST") {
        const form = new formidable.IncomingForm({
            multiples: true, // Позволяет обработать несколько файлов
            uploadDir: "./bot/app/applications", // Временная папка для загрузки
            keepExtensions: true, // Сохранять расширения файлов
        });

        form.parse(request, (err, fields, files) => {
            if (err) {
                console.error("Error parsing form:", err);
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ error: "Server Error" }));
                return;
            }

            console.log("files")
            console.log(files)


            // Проверка полей формы
            const newUser = {
                name: fields.name[0],
                height: fields.height[0],
                age: fields.age[0],
                nationality: fields.nationality[0],
                based: fields.based[0],
                bust: fields.bust[0],
                waist: fields.waist[0],
                hips: fields.hips[0],
                instagram: fields.instagram[0],
                contact: fields.contact[0],
                about: fields.about[0],
            };

            const userFileName = `${newUser.name}_${newUser.age}.json`;
            const userFilePath = path.join("./bot/app/applications", userFileName);
            const mediaFolderName = `${newUser.name}_${newUser.age}`;
            const mediaFolderPath = path.join("./bot/app/applications", mediaFolderName);

            // Сохраняем JSON с данными пользователя
            fs.mkdir("./bot/app/applications", { recursive: true }, (err) => {
                if (err) {
                    console.error("Error creating directory:", err);
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ error: "Server Error" }));
                    return;
                }

                fs.writeFile(userFilePath, JSON.stringify(newUser, null, 2), (err) => {
                    if (err) {
                        console.error("Error saving user data:", err);
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ error: "Server Error" }));
                        return;
                    }
                    console.log("User data saved to:", userFilePath);
                });

                fs.readFile('./bot/app/data.json', 'utf8', (err, data) => {
                    if (err) {
                        console.error("Ошибка при чтении файла:", err);
                        return;
                    }

                    // Парсим содержимое файла в объект
                    let jsonData;
                    try {
                        jsonData = JSON.parse(data);
                    } catch (parseErr) {
                        console.error("Ошибка при парсинге JSON:", parseErr);
                        return;
                    }

                    // Находим последний индекс и увеличиваем его на 1
                    const keys = Object.keys(jsonData);
                    const lastIndex = Math.max(...keys.map(key => parseInt(key)), -1);
                    const newIndex = lastIndex + 1;

                    // Добавляем новый объект в JSON
                    jsonData[newIndex] = mediaFolderName;

                    // Записываем обновленные данные обратно в файл
                    fs.writeFile("./bot/app/data.json", JSON.stringify(jsonData, null, 4), 'utf8', (writeErr) => {
                        if (writeErr) {
                            console.error("Ошибка при записи в файл:", writeErr);
                            return;
                        }
                        console.log("Новый объект успешно добавлен!");
                    });
                });
            });

            // Создаем папку для медиафайлов
            fs.mkdir(mediaFolderPath, { recursive: true }, (err) => {
                if (err) {
                    console.error("Error creating media directory:", err);
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ error: "Server Error" }));
                    return;
                }

                // Если `files.mediaInput` не массив, преобразуем его в массив
                const mediaFiles = Array.isArray(files.mediaInput) ? files.mediaInput : [files.mediaInput];
                console.log("mediaFiles")
                console.log(mediaFiles)

                // Сохраняем каждый файл
                mediaFiles.forEach((file) => {
                    if (file && file.filepath) {
                        const mediaFilePath = path.join(mediaFolderPath, file.originalFilename || file.newFilename);
                        fs.rename(file.filepath, mediaFilePath, (err) => {
                            if (err) {
                                console.error("Error moving media file:", err);
                            } else {
                                console.log("Media file saved to:", mediaFilePath);
                            }
                        });
                    }
                });

                // Успешный ответ
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Application submitted successfully" }));
            });
        });
    } else {
        response.writeHead(405, { "Content-Type": "text/plain" });
        response.end("Method Not Allowed");
    }
}




// Создаем HTTP-сервер
const server = http.createServer(function (request, response) {
    const url = request.url;

    switch (url) {
        case "/":
            response.writeHead(301, {
                Location: "/index.html",
                "Content-Type": "text/html; charset=utf-8",
            });
            response.end();
            break;

        case "/index.html":
            sendFile(response, `./server/public${url}`, contentTypes[".html"]);
            break;

        case "/styles.css":
            sendFile(response, "./server/public/styles.css", contentTypes[".css"]);
            break;

        case "/application":
            handleApplication(request, response);
            break;


        default:
            const filePath = path.join("./server/public", url.substring(1));
            fs.access(filePath, fs.constants.R_OK, (err) => {
                if (err) {
                    handleError(response, 404, "Not Found");
                } else {
                    const extname = path.extname(filePath);
                    const contentType = contentTypes[extname] || "application/octet-stream";
                    response.writeHead(200, { "Content-Type": contentType });
                    sendFile(response, filePath, contentType);
                }
            });
    }
});

const port = 8080;
server.listen(port, function () {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});

//node server.js 

