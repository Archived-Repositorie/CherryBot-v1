const Discord = require("discord.js")

function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

module.exports = {
    name: "kick",
    run: async(client,message,args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You don't have permissions!")
                .setDescription("You do not have permissions to kick users")
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
        if(!member.kickable) {
            const embed = new Discord.MessageEmbed()
                .setTitle("User cannot be kicked out!")
                .setDescription("I do not have the permissions to kick out this user")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        const reason = args.slice(1).join(" ") || "nothing"
        member.kick()
        const embed = new Discord.MessageEmbed()
            .setTitle("User has been successfully kicked out")
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