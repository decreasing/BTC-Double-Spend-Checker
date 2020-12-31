const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.description = new Discord.Collection();
client.usage = new Discord.Collection();
client.permission = new Discord.Collection();

const firebase = require("firebase");
const { message } = require("noblox.js");
var config_fire = {
  apiKey: "",
  authDomain: "",
  databaseURL: "https://redeemingbot.firebaseio.com",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(config_fire);
  const database = firebase.database();
  
fs.readdir("./commands/", (err, files) => {
    if (err) {
      console.log(err);
    }
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length === 0) {
      console.log("Couldn't execute files");
    }
    jsfile.forEach((f, i) => {
      console.log(`Command ${f} executed`);
      let pull = require(`./commands/${f}`);
      client.commands.set(pull.config.name, pull);
      pull.config.aliases.forEach(alias => {
        client.aliases.set(alias, pull.config.name);
      });
      client.description.set(pull.config.name);
      client.usage.set(pull.config.name);
      client.permission.set(pull.config.name);
    });
  });




  client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setActivity(`${client.guilds.cache.size} servers`, {type:"WATCHING"});
})

client.on('guildMemberAdd', member => {
    const WelcomeEmbed = new Discord.MessageEmbed()
    .setTitle(`Welcome to the ROBUX shop! :)`)
    .setFooter(`If you ever have any inquiries, please contact any of the support/staff, we are here to help!`)
    member.send(WelcomeEmbed)
    console.log(`${member.id} joined the server.`)

    var data = database.ref(`Users/${member.id}`).once("value")
    database.ref(`Users/${member.id}`).update({
      address:"a",
    })
    database.ref(`Deposits/${member.id}`).update({
      address:"a",
    })
    
})



client.on("message", async message => {
    const prefix = "!";

    if (message.author.bot) return;

    var args = message.content.substring(prefix.length).split(" ");
    let messageArray = message.content.split(" ");
    let msgcontent = message.content.substring(prefix.length).slice(" ");

    
    let cmd = messageArray[0];
    let commandFile =
      client.commands.get(cmd.slice(prefix.length)) ||
      client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    if (commandFile)  {
        commandFile.run(client, message, args, prefix,database);

    }
});

client.login('bot token');
