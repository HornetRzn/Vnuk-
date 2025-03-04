const { Telegraf } = require('telegraf');
require('dotenv').config();  // Добавляем для работы с .env файлом

const bot = new Telegraf(process.env.BOT_TOKEN);

// Получаем информацию о боте
bot.telegram.getMe().then((botInfo) => {
  bot.botInfo = botInfo;
  console.log(`Бот @${botInfo.username} запущен!`);
});

// Реагируем на реплаи (бот отвечает только тем, кто ему отвечает)
bot.on('message', async (ctx) => {
  console.log('Сообщение:', ctx.message.text);
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

// Реагируем на ключевые слова
bot.hears(/привет|бот|жопа|салют|помощь/i, (ctx) => {
  const userName = ctx.from.first_name || 'друг';
  ctx.reply(
    `*${userName}*, я здесь! 🚀`,
    { 
      parse_mode: 'Markdown',
      reply_to_message_id: ctx.message.message_id 
    }
  );
});

// Запускаем бота (работает 24/7)
bot.launch().then(() => console.log('Бот успешно запущен!'));

// Обрабатываем ошибки
process.on("uncaughtException", (err) => console.error("Ошибка:", err));
process.on("unhandledRejection", (err) => console.error("Ошибка:", err));