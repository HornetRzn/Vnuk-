const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Настройка вебхука
app.use(express.json());
app.use(bot.webhookCallback('/')); // Путь для обработки вебхука

// Логика бота
bot.on('message', async (ctx) => {
  const reply = ctx.message.reply_to_message;
  
  // Проверяем, что реплай направлен на сообщение бота
  if (reply && reply.from.username === ctx.botInfo.username) {
    const userName = ctx.from.first_name || 'друг';
    
    // Отправляем ответ без цитирования текста пользователя
    await ctx.reply(
      `Привет, *${userName}*! Чем могу помочь? 😊`,
      { 
        parse_mode: 'Markdown', 
        reply_to_message_id: ctx.message.message_id // Ответ привязывается к сообщению пользователя
      }
    );
  }
});

bot.hears(['привет', 'старт'], (ctx) => {
  ctx.reply('Рад тебя видеть! Чем помочь?');
});

// Запуск сервера
app.listen(process.env.PORT || 3000, () => {
  console.log('Бот запущен через вебхук!');
});
