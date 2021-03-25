const DIscord = require("discord.js")

module.exports = {
    name: "kill",
    run: async(client,message,args) => {
        const member = message.mentions.members.first()
        if(!member) {
            const embed = new DIscord.MessageEmbed()
                .setTitle("Specify the user!")
                .setDescription("Mention any user in the message")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        const text = args.slice(1).join(" ") || "nothing"
        const embed = new DIscord.MessageEmbed()
            .setTitle("You killed the user!")
            .addFields({
                name: "Reason",
                value: text
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