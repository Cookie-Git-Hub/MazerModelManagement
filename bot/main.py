import asyncio
import logging
from loader import bot, dp
from app.handlers import router
from app.functions import collect_data

async def main():
    logging.basicConfig(level=logging.INFO)
    dp.include_router(router)
    
    # Создаем задачу для collect_data(), чтобы она работала параллельно
    asyncio.create_task(run_collect_data())
    
    try:
        await dp.start_polling(bot)
    except Exception as e:
        logging.error(f"Произошла ошибка во время работы бота: {e}")

async def run_collect_data():
    while True:
        try:
            await collect_data()
        except Exception as e:
            logging.error(f"Ошибка в функции collect_data: {e}")
        await asyncio.sleep(60)

if __name__ == '__main__':
    try:
        asyncio.run(main()) 
    except (KeyboardInterrupt, SystemExit):
        print('Бот остановлен')
