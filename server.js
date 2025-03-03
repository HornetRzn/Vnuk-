const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Настройка вебхука
app.use(express.json());
app.use(bot.webhookCallback('/'));

// Обработчик реплаев на сообщения бота
bot.on('message', async (ctx) => {
  const reply = ctx.message.reply_to_message;
  if (reply && reply.from.username === ctx.botInfo.username) {
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

// Обработчик ключевых слов в ЛЮБЫХ сообщениях
bot.hears(['привет', 'старт', 'бот', 'помощь'], (ctx) => {
  const userName = ctx.from.first_name || 'друг';
  ctx.reply(`*${userName}*, я здесь! Просто ответь мне реплаем, если нужна помощь. 🚀`, 
    { parse_mode: 'Markdown' }
  );
});

// Запуск сервера
app.listen(process.env.PORT || 3000, () => {
  bot.launch(); // Запуск Long Polling
  console.log('Бот запущен через Long Polling!');
});
