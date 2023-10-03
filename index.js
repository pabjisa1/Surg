let discord = require('discord.js-selfbot-v13')
const client = new discord.Client()
const fs = require('fs')
const express = require("express")
const server = express()

server.all('/', (req, res) => {
  res.write('haloh')
  res.end();
})

function keepAlive() {
  server.listen(3000)
  console.log("Server is Online")
}

function checkString(string, include) {
  const memeg = include.toLowerCase()
  const memeg2 = include.toUpperCase()
  if (string.toLowerCase().indexOf(memeg) !== -1 || string.toUpperCase().indexOf(memeg2) !== -1) {
    return true;
  } else {
    return false;
  }
}

keepAlive()

let promot = 0;

//database
let channels = JSON.parse(fs.readFileSync("./channels.json"))
let promotext = `
CHEAP CRIME CARDS SHOP AT **JSJF**
CHEAP CRIME CARDS SHOP AT **JSJF**

:information_source:  Crime Wave 1.5 each

:red_square:  Heat Vision 13/1
:red_square:  Incinerate 8/1
:red_square:  Flame On 10/1
:red_square:  Liquify 12/1
:red_square:  Overheat 13/1

:green_square:  Super Strength 13/1
:green_square:  Super Speed 10/1
:green_square:  Enrage 14/1
:green_square:  Crush 11/1
:green_square:  Regeneration 5/1

:blue_square:  Ice Shards 13/1
:blue_square:  Frost Breath 10/1
:blue_square:  Ice Barrier 13/1
:blue_square:  Puddle 13/1
:blue_square:  Frozen Mirror 5/1

:yellow_square:  Shocking Fist 11/1
:yellow_square:  Thunderstorm 11/1 
:yellow_square:  Overcharge 13/1
:yellow_square:  Megawatt Pulse 5/1
:yellow_square:  Resuscitate 13/1

:information_source:  Crime Wave 1.5 each

==================================
CHEAP CRIME CARDS SHOP AT **JSJF** `;

client.on("ready", () => {
  console.log(`${client.user.tag} Successfully Logged in!`);

  client.user.setStatus("Invisible");

  setInterval(function () {
    promot += 1;
    channels.map(i => {
      try {
        client.channels.cache.get(i).send(promotext);
      } catch (err) {
        return console.log(err);
      }
    });
  }, 7200000); // 1000 ms = 1 detik
});

client.on("messageCreate", async (message) => {
  const prefix = ("!");

  if (
    message.channel.type == "DM" &&
    !message.author.bot &&
    message.author.id != client.user.id &&
    message.author.id != "1049369483598368889"
  ) 
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix).trim().split(/ +/g);
  const body = args.shift().toLowerCase();
  const command = body.slice(1);

  const own = ["1049369483598368889"];
  if (!own.includes(message.author.id)) return;

  if (command == "addchan") {
    for (let x of args) {
      channels.push(x);
    }
    fs.writeFileSync("./channels.json", JSON.stringify(channels));
    return message.reply(`**${args.length}** Channels Added to Database.`);
  } else if (command == "ping") {
    message.reply(`Pong! ${client.ws.ping}ms`)
  } else if (command == "prom") {
    return message.reply(
      `I already promoted the server for **${promot}** times since i've been turned on.`
    );
  } else if (command == "help") {
    return message.reply(
      `**My Commands :** 
> !help
> !addchan
> !prom
> !ctext
> !fetchchan
> !fetchinv
`
    );
  } else if (command == "ctext") {
    const text = message.content.slice(7);

    promotext = text;

    return message.reply(`Promotion Text Has Been Changed to: \n${promotext}`);
  } else if (command == "fetchchan") {
    let count = 0;
    channels = [];
    fs.writeFileSync("./channels.json", JSON.stringify(channels));
    client.channels.cache.map((chan) => {
      if (chan.type == "GUILD_TEXT") {
        if (
          checkString(chan.name.toString(), "market") ||
          checkString(chan.name.toString(), "lapak") ||
          checkString(chan.name.toString(), "ᴍᴀʀᴋᴇᴛ") ||
          checkString(chan.name.toString(), "ʟᴀᴩᴀᴋ") ||
          checkString(chan.name.toString(), "🅜🅐🅡🅚🅔🅣") ||
          checkString(chan.name.toString(), "𝙈𝘼𝙍𝙆𝙀𝙏") ||
          checkString(chan.name.toString(), "promosi") ||
          checkString(chan.name.toString(), "jualan") ||
          checkString(chan.name.toString(), "marketplace") ||
          checkString(chan.name.toString(), "marketplace") ||
          checkString(chan.name.toString(), "market-place")
        ) {
          count++;
          channels.push(chan.id);
          fs.writeFileSync("./channels.json", JSON.stringify(channels));
        }
      }
    });
    message.reply(`Added new **${count}** Channels to Database.`);
  } else if (command == "fetchinv") {
    for (let i of channels) {
      client.channels.cache
        .get(i)
        .createInvite({
          maxAge: 600000,
        })
        .then((inv) => {
          message.channel.send(`https://discord.gg/${inv.code}`);
        });
    }
  }
});

process.on("unhandledRejection", (error) => {
  return;
});

client.login("MTA2NTI2NTYzNjcwNTU4MzI2NA.GuzV0i.yqvZ-9oUUNVIbECC4Nx_jy2cijUYpk64NJds34");
//client.login(token)
