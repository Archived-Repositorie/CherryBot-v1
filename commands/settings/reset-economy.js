const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "reset-economy",
    run: async(client,message,args,prefix) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You don't have permissions!")
                .setDescription("You do not have administrator permissions")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        const text = args[0] || ""
        if(text.toLowerCase() != "accept") {
            const embed = new Discord.MessageEmbed()
                .setTitle("Are you sure you want to?")
                .setDescription(`To reset the economy type ${prefix}reset-economy accept`)
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        message.channel.startTyping()
        message.guild.members.cache.forEach(member => db.delete(`${message.guild.id}_currency_${member.user.id}`))
        const embed = new Discord.MessageEmbed()
            .setTitle("Done!")
            .setDescription("The economy has been reset!")
            .setTimestamp()
            .setColor("DARK_RED")
            .setFooter("CherryBot 2021")
        message.reply(embed)
        message.channel.stopTyping()
    }
}