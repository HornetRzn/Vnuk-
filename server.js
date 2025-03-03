const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Вебхук
app.use(express.json());
app.use(bot.webhookCallback('/'));

// Обработка реплаев (проверка по ID бота)
bot.on('message', async (ctx) => {
  console.log('Сообщение:', ctx.message.text); // Логирование
  const reply = ctx.message.reply_to_message;
  if (reply && reply.from.id === ctx.botInfo.id) {
    const userName = ctx.from.first_name || 'друг';
    await ctx.reply(
      `Привет, *${userName}*! Чем помочь? 😊`,
      { 
        parse_mode: 'Markdown',
        reply_to_message_id: ctx.message.message_id
      }
    );
  }
});

// Обработка ключевых слов
bot.hears(/привет|бот|помощь/i, (ctx) => {
  const userName = ctx.from.first_name || 'друг';
  ctx.reply(
    `*${userName}*, я здесь! 🚀`,
    { 
      parse_mode: 'Markdown',
      reply_to_message_id: ctx.message.message_id 
    }
  );
});

// Запуск сервера
app.listen(process.env.PORT || 3000, () => {
  console.log('Бот запущен через вебхук!');
});
