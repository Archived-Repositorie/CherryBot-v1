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
    name: "work",
    run: async(client,message,args) => {
        const currency = db.get(`${message.guild.id}_currency`) || "&"
        const randome = random(10,50)
        const date1 = new Date();
        const date2 = db.get(`${message.author.id}_work_${message.guild.id}_time`) || 100000000000000
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
        db.set(`${message.author.id}_work_${message.guild.id}_time`, date1.getTime())
        db.add(`${message.guild.id}_currency_${message.author.id}`,randome)
        const embed = new Discord.MessageEmbed()
            .setTitle("You're working...")
            .setDescription(`You earned ${randome}${currency}`)
            .setTimestamp()
            .setColor("DARK_RED")
            .setFooter("CherryBot 2021")
        message.reply(embed)
    }
}