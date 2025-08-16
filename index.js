const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const alertUserId = process.env.CLIENT_ID; // Renamed for clarity

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', member => {
    client.users.fetch(alertUserId).then(user => {
        user.send(`Someone joined ${member.guild.name}: **${member.user.tag}**`)
            .then(() => console.log(`Alert sent to ${user.tag}`))
            .catch(err => console.error('Failed to send DM:', err));
    }).catch(console.error);
});

client.login(token);