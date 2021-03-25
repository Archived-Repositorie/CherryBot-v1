const { posts } = require("rule34js")
const Discord = require("discord.js")
module.exports = {
    name: "rule34",
    run: async(client,message,args) => {
        if(!message.channel.nsfw) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Not the right channel!")
                .setDescription("Use the command on the nsfw channel!")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        if(!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You didn't specify anything!")
                .setDescription("Give any image name")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        const response = await posts({tags:[args[0]]})
        if(!response.posts) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Not found!")
                .setDescription("No images in this category were found")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            message.reply(embed)
        }
        try {
            const values = response.posts
            const randomValue = values[parseInt(Math.random() * values.length)]
            const embed = new Discord.MessageEmbed()
                .setTitle("Here you go :3")
                .setImage(randomValue.file_url)
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            message.reply(embed)
        }catch(err) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Not found!")
                .setDescription("No images in this category were found")
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            message.reply(embed)
        }
    }
}
