const Discord = require("discord.js")
const yiff = require("yiff")
const config = {
    creator: "CherryFox",
    name: "CherryBot",
    version: "1.0"
}

module.exports = {
    name: "cat",
    run: async(client,message,args) => {
        const sheri = new yiff.sheri(config)
        const ee = sheri.cat.then(e => {
            const embed = new Discord.MessageEmbed()
                .setTitle("Kitty")
                .setImage(e.url)
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            message.reply(embed)
        })
    }
}