const Discord = require('discord.js');
const winston = require('winston');
const dotenv = require('dotenv');
const path = require('path');
const glob = require('glob');

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
        new winston.transports.Console(),
    ]
});

// Load commands dynamically
const commands = [];

const commandFilenames = glob.sync("./commands/*.js");

for (const filename of commandFilenames.map((f) => path.basename(f, ".js"))) {
    commands.push(require("./commands/" + filename));
}

// Initialize Discord Bot
const client = new Discord.Client();

client.on('ready', () => {
    logger.info(`Logged in as ${client.user.tag}!`);
    logger.info(`Registered commands: ${commandFilenames.map((f) => path.basename(f)).join(',')}.`)
});

client.on('message', msg => {
    // Ignore bots
    if (msg.author.bot) {
        return;
    }

    // Check all commands to see if the message body contains given text
    for (const command of commands) {
        if (msg.content.toLowerCase().includes(command.bodyIncludes)) {
            // Pass message first, logger is optional
            command.callback(msg, { logger });
        }
    }
});

client.login(process.env.DISCORD_AUTH_TOKEN);