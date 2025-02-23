require("dotenv").config();

// Keep Alive System
const keepAlive = require("./keep_alive.js");
keepAlive();

// Express Setup
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Discord Bot Setup
const { Client, Intents } = require("discord.js");

const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
});

bot.on("ready", async () => {
  console.log(`[ Client ] ${bot.user.tag} Is Now Online`);

  let guild = bot.guilds.cache.get(process.env.SERVER_ID);
  if (!guild) throw `[ Error ] Didn't Find Any Server: ${process.env.SERVER_ID}`;

  let role = guild.roles.cache.find((r) => r.id === process.env.ROLE_ID);
  if (!role) throw `[ Error ] Didn't Find Any Role in ${guild.name}`;

  if (process.env.INTERVAL < 6000) console.log("!!! Enjoy Your Rainbow Roles");

  setInterval(() => {
    role
      .edit({ color: Math.floor(Math.random() * 16777215) })
      .catch((err) => console.log(`[ Error ] An error occurred during the role change:`, err));
  }, parseInt(process.env.INTERVAL));

  bot.user.setPresence({
    status: "dnd",
    activity: {
      name: "Roles Color Changer",
      type: "WATCHING",
    },
  });
});

bot.login(process.env.BOT_TOKEN);


