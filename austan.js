const Discord = require('discord.js');
const winston = require('winston');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

if (process.env.DISCORD_AUTH_TOKEN === undefined) {
    throw "Error: DISCORD_AUTH_TOKEN environment variable is unset.";
}

// Configure logger settings
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
    ),
    transports: [
        new winston.transports.Console()
    ]
});

// Initialize Discord Bot
const client = new Discord.Client();

client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.login(process.env.DISCORD_AUTH_TOKEN);