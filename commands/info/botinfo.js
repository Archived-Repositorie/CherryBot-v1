const Discord = require("discord.js")
const process = require('process');

module.exports = {
    name: "botinfo",
    run: async(client,message,args,prefix) => {
        const info = {
            node: process.version.toString().replace("20201024fdaf9cbfe3",""),
            version: Discord.version,
            ram: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " mb",
            ping: Math.round(client.ws.ping) + " ms",
            servers: client.guilds.cache.size
        }
        const embed = new Discord.MessageEmbed()
            .setTitle("About the bot")
            .addFields({
                name: "Node.js",
                value: info.node
            },{
                name: "Discord.js",
                value: info.version
            },{
                name: "Ram",
                value: info.ram
            },{
                name: "Ping",
                value: info.ping
            },{
                name: "Servers",
                value: info.servers
            })
            .setThumbnail(client.user.avatarURL({size: 4096, dynamic: true}))
            .setTimestamp()
            .setColor("DARK_RED")
            .setFooter("CherryBot 2021")
        message.reply(embed)
    }
}