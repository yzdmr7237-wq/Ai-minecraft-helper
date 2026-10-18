
const mineflayer = require('mineflayer');

const host = process.env.MC_HOST;
const port = Number(process.env.MC_PORT || 25565);
const username = process.env.MC_USERNAME;

if (!host || !username) {
  console.error('Missing MC_HOST or MC_USERNAME environment variables.');
  process.exit(1);
}

const bot = mineflayer.createBot({
  host,
  port,
  username,
  auth: process.env.MC_AUTH || 'microsoft'
});

bot.once('spawn', () => {
  console.log('Minecraft AI bot connected!');
});

bot.on('chat', (player, message) => {
  if (player === bot.username) return;

  if (message.toLowerCase() === '!bot') {
    bot.chat(`Hello ${player}! I am online.`);
  }
});

bot.on('kicked', reason => {
  console.log('Bot kicked:', reason);
});

bot.on('error', error => {
  console.error('Minecraft error:', error.message);
});

bot.on('end', () => {
  console.log('Minecraft connection ended.');
});
