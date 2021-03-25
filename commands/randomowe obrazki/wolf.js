const Discord = require("discord.js")
const yiff = require("yiff")
const config = {
    creator: "NightlyFox",
    name: "CherryBot",
    version: "1.0"
}

module.exports = {
    name: "wolf",
    run: async(client,message,args) => {
        const sheri = new yiff.sheri(config)
        const ee = sheri.wolf.then(e => {
            const embed = new Discord.MessageEmbed()
                .setTitle("Wolf")
                .setImage(e.url)
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            message.reply(embed)
        })
    }
}