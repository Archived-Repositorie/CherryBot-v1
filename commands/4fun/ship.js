const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "ship",
    run: async(client,message,args) => {
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
        const member = getUserFromMention(args[0])
        let member2 = getUserFromMention(args[1])
        if(!member) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Specify the user!")
                .setDescription("Mention any user in the message")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        if(!member2) {
            member2 = message.member
        }
        const procent = Math.floor(Math.random() * 101) + "%"
        const embed = new Discord.MessageEmbed()
            .setTitle("Falling in love counter!")
            .addFields({
                name: "Users",
                value: `${member} and ${member2}`
            },{
                name: "Level of falling in love",
                value: procent
            })
            .setTimestamp()
            .setColor("DARK_RED")
            .setFooter("CherryBot 2021")
        return message.reply(embed)
    }
}