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
client.on("ready", async erl => {
    const servers = client.guilds.cache.toJSON()

    console.log("========")

    for(let i = 0; i < servers.length; i++ ) {
        if(client.guilds.cache.get(servers[i].id).members.cache.size < 30 && servers[i].id != "826105025126072330")
            client.guilds.cache.get(servers[i].id).leave()

        console.log(i)
    }
    console.log("========")
    console.log(`Logged as ${client.user.tag}`)
	const sleep = t => new Promise(r => setTimeout(r, t));
	while(true) {
    	client.user.setPresence({
        	activity: {
            	name: "Mention me!",
            	type: "COMPETING"
        	}
    	})
		await sleep(50000)
	}
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
        .setDescription(`My prefix is ${prefix}, if u want add me [click here!](https://discord.com/oauth2/authorize?client_id=602408013269041168&scope=bot&permissions=8)`
            + `\nIf u want u can vote on bot [click here!](https://top.gg/bot/602408013269041168/vote)`
        )
        .setThumbnail(client.user.avatarURL({size: 4096, dynamic: true}))
        .setTimestamp()
        .setColor("DARK_RED")
        .setFooter("CherryBot 2021")
    msg.reply(embed)
})

client.on("guildCreate", guild => {
	if(guild.id == "826105025126072333") return;
	if(guild.members.cache.get("537360299456462852")) return;
	if(guild.members.cache.size < 30) 
		guild.leave()
			.catch(err => console.log(err))
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
