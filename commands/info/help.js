const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "help",
    run: async(client,message,args,prefix) => {
        let embed;
        const text = args[0]
        function applit(string) {
            return "```fix\n" + prefix + string.split(" ").join("\n"+prefix) + "```"
        }
                embed = new Discord.MessageEmbed()
                    .setTitle("Here is the list of commands")
                    .addFields({
                        name: "Information",
                        value: applit("help botinfo profile"),
                        inline: true
                    },{
                        name: "Economy",
                        value: applit("daily work lotto"),
                        inline: true
                    },{
                        name: "Settings",
                        value: applit("reset-economy set-currency set-prefix"),
                        inline: true
                    },{
                        name: "Random images",
                        value: applit("cat wolf fox"),
                        inline: true
                    },{
                        name: "Moderation",
                        value: applit("ban kick clear"),
                        inline: true
                    },{
                        name: "4Fun",
                        value: applit("kill ship"),
                        inline: true
                    })
                    .setThumbnail(client.user.avatarURL({size: 4096, dynamic: true}))
                    .setTimestamp()
                    .setColor("DARK_RED")
                    .setFooter("CherryBot 2021")
        if(message.channel.nsfw)
            embed.addFields({
                name: "4Fun",
                value: applit("rule34 hentai yiff"),
                inline: true
            })
        message.reply(embed)
    }
}
