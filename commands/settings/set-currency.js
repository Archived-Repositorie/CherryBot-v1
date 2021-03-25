const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "set-currency",
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
        if(!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You didn't give a sign")
                .setDescription("Enter any currency in your message")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        const embed = new Discord.MessageEmbed()
            .setTitle("Currency changed")
            .setDescription(`Changed the server currency to ${args[0]}`)
            .setTimestamp()
            .setColor("DARK_RED")
            .setFooter("CherryBot 2021")
        message.reply(embed)
        db.set(`${message.guild.id}_currency`,args[0])
    }
}