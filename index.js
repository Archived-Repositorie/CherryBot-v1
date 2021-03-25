const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
    disableEveryone: true,
    autoReconnect: true
});
const db = require("quick.db")
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    fs.readdirSync("./commands/").forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"))
        for (let file of commands) {
            let pull = require(`./commands/${dir}/${file}`)
            client.commands.set(pull.name, pull)
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    })
})
let prefix
client.on("ready", () => {
    console.log(`Logged as ${client.user.tag}`)
    client.user.setPresence({
        activity: {
            name: 'Add me justfox.cf/nightlybot',
            type: "COMPETING"
        }
    })
})
client.on("message", msg => {
    try {
    if(!msg.mentions.members.first()) return;
    }
    catch(err) {
	return err;
    }
    if(msg.mentions.members.first().user.id != client.user.id) return;
    if(!msg.guild) return;
    const prefix = db.get(`${msg.guild.id}_prefix`) || "&"
    const embed = new Discord.MessageEmbed()
        .setTitle("Hello user!")
        .setDescription(`My prefix is ${prefix}, if u want add me [click here!](https://justfox.cf/nightlybot)`)
        .setThumbnail(client.user.avatarURL({size: 4096, dynamic: true}))
        .setTimestamp()
        .setColor("DARK_RED")
        .setFooter("CherryBot 2021")
    msg.reply(embed)
})
client.on("message", async message => {
    if(!message.guild) return;
    prefix = db.get(`${message.guild.id}_prefix`) || "&"
    if (!message.content.startsWith(prefix)) return
    if(message.author.bot) return
    if (!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(' ')
    const cmd = args.shift().toLowerCase()

    if (cmd.length === 0) return;
    const comm = client.commands.get(cmd)
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))
    if (command)
        command.run(client, message, args,prefix)
})
let config = require('./config.json');
client.login(config.token);
/*
function time(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " godzina, " : " godzin, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minuta, " : " minut, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sekunda" : " sekund") : "";
    return hDisplay + mDisplay + sDisplay;
}
        const date1 = new Date();
        const date2 = db.get(`${message.author.id}_daily_${message.guild.id}_time`) || date1.getTime()
        const timeDiff = Math.abs(date2 - date1.getTime());
        const timeDiffInSecond = Math.ceil(timeDiff / 1000);
        if(!(timeDiffInSecond >= 86400)) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Aby odebrać nagrode musisz poczekać!")
                .setDescription(`Użyj komende za ${time(86400 - timeDiffInSecond)}`)
                .setTimestamp()
                .setColor("DARK_PURPLE")
                .setFooter("NightlyBot 2020")
            db.set(`${message.author.id}_daily_${message.guild.id}_time`, date2)
            return message.channel.send(embed)
        }
        db.set(`${message.author.id}_work_${message.guild.id}_time`, date1.getTime())
*/

