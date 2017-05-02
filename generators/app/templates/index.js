'use strict';

const fs      = require("fs");
const Clapp   = require("./modules/clapp-discord");
const cfg     = require("../config.js");
const pkg     = require("../package.json");
const Discord = require("discord.js");
const bot     = new Discord.Client();

const app = new Clapp.App({
  name: cfg.name,
  desc: pkg.description,
  prefix: cfg.prefix,
  version: pkg.version,
  onReply: (msg, context) => {
    // Fired when input is needed to be shown to the user.

    context.msg.reply('\n' + msg).then(botResponse => {
      if (cfg.deleteAfterReply.enabled) {

        context.msg.delete(cfg.deleteAfterReply.time)
          .catch(console.error);

        botResponse.delete(cfg.deleteAfterReply.time)
          .catch(console.error);

      }
    });
  }
});

// Load every command in the commands folder
fs.readdirSync("./lib/commands/").forEach(file => {
  app.addCommand(require("./commands/" + file));
});

bot.on("message", msg => {
  // Fired when someone sends a message

  if (app.isCliSentence(msg.content)) {
    // Keep adding properties to the context as you need them
    app.parseInput(msg.content, { msg });
  }
});

bot.login(cfg.token).then(() => console.log("Running!")).catch(console.error);
