const Discord = require("discord.js")
const akaneko = require('akaneko')

module.exports = {
    name: "hentai",
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
        akaneko.nsfw.hentai().then(image => {
            const embed = new Discord.MessageEmbed()
                .setTitle("Here you go :3")
                .setImage(image)
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            message.reply(embed)
        })
    }
}