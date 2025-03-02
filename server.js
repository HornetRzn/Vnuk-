const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Диалог только через реплай
bot.on('message', async (ctx) => {
  const reply = ctx.message.reply_to_message;
  if (reply && reply.from.username === ctx.botInfo.username) {
    await ctx.reply('Привет! Как твои дела? 😊');
  }
});

// Реакция на ключевые слова
bot.hears(['привет', 'старт'], (ctx) => {
  ctx.reply('Рад тебя видеть! Чем помочь?');
});

// Запуск сервера для Render
app.listen(process.env.PORT || 3000, () => {
  bot.launch();
  console.log('Бот запущен!');
});
