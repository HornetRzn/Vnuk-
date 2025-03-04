const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Получаем информацию о боте (чтобы ctx.botInfo был доступен)
bot.telegram.getMe().then((botInfo) => {
  bot.botInfo = botInfo;
  console.log(`Бот @${botInfo.username} запущен!`);
});

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

// Запуск бота (БЕЗ вебхуков)
bot.launch().then(() => console.log('Бот успешно запущен!'));

// Обработка ошибок
process.on("uncaughtException", (err) => console.error("Ошибка:", err));
process.on("unhandledRejection", (err) => console.error("Ошибка:", err));
