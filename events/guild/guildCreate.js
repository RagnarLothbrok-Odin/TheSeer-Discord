const { MessageEmbed } = require('discord.js');
const SQLite = require('better-sqlite3');
const { prefix } = require('../../botconfig.json');

const db = new SQLite('./db/db.sqlite');

module.exports = async (bot, guild) => {
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${
      guild.memberCount
    } members!`,
  );
  // activity
  const watchbotgrab = db.prepare('SELECT count(*) FROM watchedbots').get();
  bot.user.setActivity(`${watchbotgrab['count(*)']} Bots Across ${bot.guilds.cache.size} Guilds | ${prefix}help`, {
    type: 'WATCHING',
  });

  let defaultChannel = '';
  guild.channels.cache.forEach((channel) => {
    if (channel.type === 'text' && defaultChannel === '') {
      if (channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
        defaultChannel = channel;
      }
    }
  });
  const embed = new MessageEmbed()
    .setTitle('Hello, I\'m **The Seer**! Thanks for inviting me!')
    .setDescription('The prefix for all my commands is `ts;`, e.g: `ts;help`.\nIf you find any bugs, report them with `-bugreport <bug>`');
  defaultChannel.send({
    embed,
  });
};
