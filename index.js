const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Load token from environment variable
const token = process.env.BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
    console.log(` Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', member => {
    // Replace YOUR_USER_ID with your own Discord ID
    const myUserId = process.env.CLIENT_ID;
    
    member.client.users.fetch(myUserId).then(user => {
        user.send(` Someone joined ${member.guild.name}: **${member.user.tag}** `);
    }).catch(console.error);
});

client.login(token);