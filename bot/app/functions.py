from app.handlers import send_message, send_media
import json
import os
import asyncio

INDEX = 0 
                
async def data_handler(media_folder_path):
    print("8")
    json_file_path = f"{media_folder_path}.json"


    with open(json_file_path, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
    # Формирование сообщения
    message = (f"📋Подана новая заявка📋\n"
               f"<b>Имя:</b> {data.get('name', 'Unknown')}\n"
               f"<b>Рост:</b> {data.get('height', 'Unknown')}\n"
               f"<b>Возраст:</b> {data.get('age', 'Unknown')}\n"
               f"<b>Национальность:</b> {data.get('nationality', 'Unknown')}\n"
               f"<b>Проживает:</b> {data.get('based', 'Unknown')}\n"
               f"<b>Замеры:</b> {data.get('bust', 'Unknown')}/{data.get('waist', 'Unknown')}/{data.get('hips', 'Unknown')}\n"
               f"<b>Instagram:</b> {data.get('instagram', 'Unknown')}\n"
               f"<b>Контактные данные:</b> {data.get('contact', 'Unknown')}\n"
               f"<b>О себе:</b> {data.get('about', 'Unknown')}")
    print("9")
    await send_message(None, message)
    file_paths = [os.path.join(media_folder_path, media_file) for media_file in os.listdir(media_folder_path)
                  if os.path.isfile(os.path.join(media_folder_path, media_file))]
    if file_paths:
        print("10")
        await send_media(None, file_paths)

async def collect_data():
    print("6")
    with open('bot/app/data.json', 'r') as file:
        data = json.load(file)
        last_index = int(list(data.keys())[-1])
        print("last_index")
        print(last_index)
        global INDEX
        if last_index > INDEX:
            print("INDEX")
            print(INDEX)
            for i in range(INDEX + 1, last_index + 1): 
                path = data.get(f"{i}")
                if path:
                    folder_path = f"bot/app/applications/{path}"
                    print("7")
                    await data_handler(folder_path)
                    await asyncio.sleep(10)
            INDEX = last_index

    
    

