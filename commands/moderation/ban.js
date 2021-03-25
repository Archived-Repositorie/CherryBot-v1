const Discord = require("discord.js")

module.exports = {
    name: "ban",
    run: async(client,message,args) => {
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You don't have permissions!")
                .setDescription("You do not have permissions to ban users")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        const member = message.mentions.members.first()
        if(!member) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Specify the user!")
                .setDescription("Mention any user in the message")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        if(!member.bannable) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You cannot ban a user!")
                .setDescription("I do not have permissions to ban this user")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        const reason = args.slice(1).join(" ") || "nothing"
        member.ban({
            reason: reason
        })
        const embed = new Discord.MessageEmbed()
            .setTitle("User has been successfully banned")
            .addFields({
                name: "Reason",
                value: reason
            },{
                name: "User",
                value: member
            })
            .setTimestamp()
            .setColor("DARK_RED")
            .setFooter("CherryBot 2021")
        message.reply(embed)
    }
}