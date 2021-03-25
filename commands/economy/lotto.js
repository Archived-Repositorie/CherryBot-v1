const Discord = require("discord.js")
const db = require("quick.db")
function time(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = {
    name: "lotto",
    run: async(client,message,args,prefix) => {
        const currency = db.get(`${message.guild.id}_currency`) || "&"
        if(!(args[0] * 1 && args[1] * 1 && args[2] * 1)) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Give arguments!")
                .setDescription(`Give three numbers`)
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        if(!(db.get(`${message.guild.id}_currency_${message.author.id}`) > 99)) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You have no money!")
                .setDescription(`To play you must have 100${currency} or more`)
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            return message.reply(embed)
        }
        const date1 = new Date();
        const date2 = db.get(`${message.author.id}_lotto_${message.guild.id}_time`) || 100000000000000
        const timeDiff = Math.abs(date2 - date1.getTime());
        const timeDiffInSecond = Math.ceil(timeDiff / 1000);
        if(!(timeDiffInSecond >= 1200)) {
            const embed = new Discord.MessageEmbed()
                .setTitle("You use the command too often!")
                .setDescription(`Use the command for ${time(600 - timeDiffInSecond)}`)
                .setTimestamp()
                .setColor("DARK_RED")
                .setFooter("CherryBot 2021")
            db.set(`${message.author.id}_lotto_${message.guild.id}_time`, date2)
            return message.reply(embed)
        }
        db.add(`${message.guild.id}_currency_${message.author.id}`, -100)
        db.set(`${message.author.id}_work_${message.guild.id}_time`, date1.getTime())
        const numbers = {
            _1: random(1,50),
            _2: random(1,50),
            _3: random(1,50)
        }
        const arguments = {
            _1: Math.round(args[0]),
            _2: Math.round(args[1]),
            _3: Math.round(args[2])
        }
        let gg = `You lost! You have lost the money you put into the lotto, which is 100${currency}`
        if(arguments._1 == numbers._1 || arguments._2 == numbers._2 || arguments._3 == numbers._3) {
            gg = `You have won! You have won 200${currency}`
            db.add(`${message.guild.id}_currency_${message.author.id}`, 300)
        }
        const i = arguments == numbers
        const embed = new Discord.MessageEmbed()
            .setTitle("Lottery!")
            .addFields({
                name: "Your numbers",
                value: `${arguments._1} ${arguments._2} ${arguments._3}`
            },{
                name: "Numbers generated",
                value: `${numbers._1} ${numbers._2} ${numbers._3}`
            })
            .setDescription(gg)
            .setTimestamp()
            .setColor("DARK_RED")
            .setFooter("CherryBot 2021")
        message.reply(embed)
    }
}
