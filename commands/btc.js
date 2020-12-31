const discord = require("discord.js");
const axios = require("axios");
const firebase = require("firebase");

module.exports.run = async (bot,message, args, prefix, database) => {
    if (message.content.startsWith(`${prefix}`)){
        
        let getHash = async() => {
            let response = await axios.get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
            let hashed = response.data
            return hashed
        }
    
        let hashValue = await getHash()
        console.log(hashValue)
        
        const USDVal = hashValue.bpi.USD.rate
        const GBPVal = hashValue.bpi.GBP.rate
        const EURVal = hashValue.bpi.EUR.rate

       /* var USDR = USDVal.toFixed(2);
        var GBPR = GBPVal.toFixed(2);
        var EURR = EURVal.toFixed(2); */

        const CurrentPriceEmbed = new discord.MessageEmbed()
        .setTitle("Current Bitcoin Value")
        .setDescription("1 Single Bitcoin")
        .addField("USD", USDVal, true)
        .addField("GBP", GBPVal, true)
        .addField("EUR", EURVal, true)
	    .setThumbnail('https://pngimg.com/uploads/bitcoin/bitcoin_PNG48.png')
        .setColor("YELLOW")
        .setFooter("Created by vertical#0007")
        .setTimestamp()
	    message.channel.send(CurrentPriceEmbed)
    }
}

module.exports.config = {
    name: "btc",
    permission: "Everyone",
    description: "btc",
    usage: ".btc",
    aliases: []
}