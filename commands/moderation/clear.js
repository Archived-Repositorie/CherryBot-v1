const Discord = require("discord.js")

module.exports = {
    name: "clear",
    run: async(client,message,args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You don't have permissions!")
                .setDescription("You do not have permissions to manage messages")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        const number = Math.round(args[0] * 1)
        if(!number) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You didn't give a number!")
                .setDescription("Enter any number in the message")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        if(number > 100 || number < 1) {
            const embed = new Discord.MessageEmbed()
                .setTitle("The number given is incorrect!")
                .setDescription("Give a number greater than 1 and less than 100")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        message.delete()
        message.channel.messages.fetch({
            limit: number,
        }).then((messages) => {
            message.channel.bulkDelete(messages).catch(error => error);
        });
        const embed = new Discord.MessageEmbed()
            .setTitle(`Deleted ${number} message!`)
            .setTimestamp()
            .setColor("DARK_RED")
            .setFooter("CherryBot 2021")
        message.reply(embed)

    }
}