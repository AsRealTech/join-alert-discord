const { Client, GatewayIntentBits } = require('discord.js');

// Load token from environment variable
const token = process.env.BOT_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers // Needed for member join events
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