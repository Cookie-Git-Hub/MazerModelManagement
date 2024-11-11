from aiogram.utils.keyboard import InlineKeyboardBuilder

url="https://b117-82-146-252-31.ngrok-free.app/index.html"
builder = InlineKeyboardBuilder()
builder.button(text="Подать заявку", url=url)
