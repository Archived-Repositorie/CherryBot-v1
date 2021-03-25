const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "set-prefix",
    run: async(client,message,args,prefix) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You don't have permissions!")
                .setDescription("You do not have permissions to manage this server")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
	const text = args[0]
        if(!text || text == "") {
            const embed = new Discord.MessageEmbed()
                .setTitle("You did not specify a prefix")
                .setDescription("Include any prefix in your message")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        const embed = new Discord.MessageEmbed()
            .setTitle("Prefix changed")
            .setDescription(`Changed the server prefix to ${text}`)
            .setTimestamp()
            .setColor("DARK_RED")
            .setFooter("CherryBot 2021")
        message.reply(embed)
        db.set(`${message.guild.id}_prefix`,text)
    }
}
