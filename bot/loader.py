from aiogram import Bot, Dispatcher
from watchdog.observers import Observer
from config_data import config

bot = Bot(token=config.BOT_TOKEN)

dp = Dispatcher()
observer = Observer()