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
    // Получаем данные пользователя
    const userName = ctx.from.first_name || 'друг';
    const userId = ctx.from.id;
    const userMessage = ctx.message.text || '...';

    // Отправляем ответ КОНКРЕТНОМУ пользователю с реплаем
    await ctx.reply(
      `Привет, *${userName}*! Ты написал: "${userMessage}".\n` + 
      'Как я могу помочь? 😊',
      { 
        parse_mode: 'Markdown', // Форматирование текста
        reply_to_message_id: ctx.message.message_id // Ответ на сообщение пользователя
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
