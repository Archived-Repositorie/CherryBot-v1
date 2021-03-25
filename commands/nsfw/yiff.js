const Discord = require("discord.js")
const yiff = require("yiff")
const config = {
    creator: "NightlyFox",
    name: "NightlyBot",
    version: "1.0"
}

module.exports = {
    name: "yiff",
    run: async(client,message,args) => {
        if(!message.channel.nsfw) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Not the right channel!")
                .setDescription("Use the command on the nsfw channel!")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        const sheri = new yiff.sheri(config)
        const ee = sheri.yiff.then(e => {
            const embed = new Discord.MessageEmbed()
                .setTitle("Here you go :3")
                .setImage(e.url)
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            message.reply(embed)
        })
    }
}