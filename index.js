require('dotenv').config();
const mysql = require("mysql");
const colors = require("colors");
const config = require('./config.json')
const {token,NameHub,sql,phone,MadeBy,LOGOHUB,buyer,keymanager,keymanagername} = require('./config.json')
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

let commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (let file of commandFiles) {
  let command = require('./commands/' + file);
  client.commands.set(command.data.name, command);
}

function log(text, color) {
  if (typeof(color) == "undefined") { console.log(text) }
  if (typeof(color) != "undefined") { console.log(colors[color](text)) }
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function handleConnection() {
  con = mysql.createConnection(config.sql);

  con.connect(function(err) {
      if (err) {
          log("[ERROR] An error has occurred while connection: " + err, "red");
          log("[INFO] Attempting to establish connection with SQL database.", "yellow");
          setTimeout(handleConnection, 2000);
      } else {
          log("[SUCCESS] SQL database connection established successfully.", "green");
      }
  });

  con.on("error", function(err) {
      console.log("Error: " + err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
          handleConnection();
      } else {
          throw err;
      }
  });
}

con = mysql.createConnection(config.sql);

con.connect(function(err) {
  if (err) {
      log("[ERROR] An error has occurred while connection: " + err, "red");
      log("[INFO] Attempting to establish connection with SQL database.", "yellow");
      setTimeout(handleConnection, 2000);
  } else {
      log("[SUCCESS] SQL database connection established successfully.", "green");
  }
});

con.on("error", function(err) {
  console.log("Error: " + err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
  } else {
      throw err;
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  let command = client.commands.get(interaction.commandName);
  if (!command) return interaction.reply({ content: 'ไม่มีคำสั่งนี้อยู๋ในระบบแล้ว!', ephemeral: true });

  await interaction.deferReply({ ephemeral: true });

  try {
    const role = interaction.guild.roles.cache.find(role => role.id === buyer);
    await command.execute(interaction,con,NameHub,MadeBy,makeid,role,log,buyer,keymanager,keymanagername);
  } catch (err) {
    console.log(err);
    await interaction.followUp({ content: 'มีบางอย่างผิดพลาดระหว่างทำงาน โปรดลองใหม่อีกครั้งภายหลัง', ephemeral: true });
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);
