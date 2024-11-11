from aiogram import Router
from aiogram.types import Message, FSInputFile
from aiogram.filters import CommandStart
from aiogram.enums.parse_mode import ParseMode
from aiogram.types import Message
from aiogram.utils.media_group import MediaGroupBuilder
import logging
import app.keyboard as kb
from loader import bot

CHANNEL_ID = "-1002480432914"
INDEX = 0

router = Router()

@router.message(CommandStart())
async def start_command(message: Message):
    await message.reply("Нажмите кнопку, чтобы подать заявку.",
                        reply_markup=kb.builder.as_markup(),
                        parse_mode=ParseMode.HTML,
                        disable_web_page_preview=True)



@router.message()
async def send_message(message: Message, text):
    print("11")
    await bot.send_message(chat_id=CHANNEL_ID, text=text, parse_mode=ParseMode.HTML, disable_web_page_preview=True)


@router.message()
async def send_media(message: Message, file_paths):
    print("12")
    media = MediaGroupBuilder()
    for file_path in file_paths:
        if file_path.endswith('.mp4') or file_path.endswith('.WEBM'):
            media.add_video(media=FSInputFile(file_path))
        else:
            media.add_photo(media=FSInputFile(file_path))
    try:
        await bot.send_media_group(chat_id=CHANNEL_ID, media=media.build())
    except Exception as e:
        logging.error(f"Ошибка при отправки медиа: {e}")