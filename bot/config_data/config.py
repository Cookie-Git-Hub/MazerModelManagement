import os
from dotenv import load_dotenv, find_dotenv

if not find_dotenv():
    exit("Переменные окружения не загружены, так как отсутствует .env файл")
else:
    load_dotenv()
    
BOT_TOKEN = os.getenv('BOT_TOKEN')
