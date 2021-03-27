const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "eval",
    run: async(client,message,args) => {
        if(message.author.id != "537360299456462852")
            return message.reply("Only bot developer can use this command!")
        const text = args.join(" ")
        try {
            const replay = await eval(text)
            message.channel.send("```" + replay +"```")
        } catch(err) {
            message.channel.send("```" + err +"```")
        }
    }
}