// Copied from here: https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
console.log(bot);
bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});
console.log(bot);
bot.on('message', function (user, userID, channelID, message, evt) {
	bot.sendMessage({to: channelID, message: 'I live!'})
    if (message.substring(0, 1) == '!') {
        // var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
         }
     }
});
console.log(bot);