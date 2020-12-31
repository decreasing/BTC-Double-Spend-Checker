const discord = require("discord.js")
const axios = require("axios")
var firebase = require("firebase");
const { promptMessage } = require("../functions.js");
const superagent = require("superagent");

module.exports.run = async (bot,message, args, prefix, database) => {
    if (message.content.startsWith(`${prefix}`)){

      
        const TXID = message.content.split(" ")[1]
        if (!TXID) return message.reply("Please provide a valid TXID.")

        let TXIDsearch3 = async() => {
          let response3 = await axios.get(`https://api.blockchair.com/bitcoin/dashboards/transaction/${TXID}`)
          let TXIDdata3 = response3.data
          return TXIDdata3
      }

      
      let TXIDValue3 = await TXIDsearch3()
      console.log(TXIDValue3.data[TXID].transaction.output_total_usd)


        let TXIDsearch = async() => {
            let response = await axios.get(`https://confirmbtc.net/api/api.php?txid=${TXID}`)
            let TXIDdata = response.data
            return TXIDdata
        }


        let TXIDValue = await TXIDsearch()
        console.log(TXIDValue)
        
        if (!TXIDValue.fee){
            const errorEmbed = new discord.MessageEmbed()
            .setTitle(`TXID Invalid ❌`)
            .setDescription(`The TXID you have provided is invalid, please try again.`)
            .setColor('YELLOW')
            .setFooter("Created by vertical#0007")

            message.channel.send(errorEmbed)
            }
        if (TXIDValue.fee == "0"){
          const errorEmbed = new discord.MessageEmbed()
          .setTitle(`TXID Invalid ❌`)
          .setDescription(`The TXID you have provided is invalid, please try again.`)
          .setColor('YELLOW')
            .setFooter("Created by vertical#0007")

          message.channel.send(errorEmbed)
          }

          else if (TXIDValue.fee < 1 && TXIDValue.eta == "Confirmed"){
          const Confirmed = new discord.MessageEmbed()
          .setTitle(`Transaction Info`)
          .setColor(`GREEN`)
          .addField("Transaction ID", TXID)
          .addField('Amount', `$${TXIDValue3.data[TXID].transaction.output_total_usd}`,true)
          .addField('ETA', `${TXIDValue.eta}`, true)
          .addField('Fee', `$${TXIDValue.fee}`, true)
          .addField('Risk', `${TXIDValue.risk}`, true)
          .addField('Confirmations', `${TXIDValue.confirmations}`, true)
          .addField("Date", TXIDValue3.data[TXID].transaction.date)
          .setTimestamp()
            .setFooter("Created by vertical#0007")

          message.channel.send(Confirmed)
          message.reply("We will notify you when it confirms.")
          }

        else if (TXIDValue.fee < 1 && TXIDValue.eta !== "Confirmed"){
          const DoubleSpend = new discord.MessageEmbed()
          .setTitle(`DOUBLE SPEND ALERT 🚨 Transaction Info`)
          .setColor(`RED`)
          .addField("Transaction ID", TXID)
          .addField('Amount', `$${TXIDValue3.data[TXID].transaction.output_total_usd}`,true)
          .addField('ETA', `${TXIDValue.eta} - **WILL TAKE HOURS, IF NOT DAYS**`)
          .addField('Fee', `$${TXIDValue.fee} - **INCREDIBLY LOW, BE ADVISED AND WAIT FOR A CONFIRMATION**`)
          .addField('Risk', `High`)
          .addField('Confirmations', `${TXIDValue.confirmations}`)
          .addField("Date", TXIDValue3.data[TXID].transaction.date)
          .setTimestamp()
            .setFooter("Created by vertical#0007")

          message.channel.send(DoubleSpend)
          message.reply("We will notify you when it confirms.")
        }


        else if (TXIDValue.fee >= 20 && TXIDValue.eta !== "Confirmed"){
        const normal = new discord.MessageEmbed()
        .setTitle(`Transaction Info`)
        .setColor(`YELLOW`)
        .addField("Transaction ID", TXID)
        .addField('Amount', `$${TXIDValue3.data[TXID].transaction.output_total_usd}`,true)

        .addField('ETA', `${TXIDValue.eta}`, true)
        .addField('Fee', `$${TXIDValue.fee}`, true)
        .addField('Risk', `${TXIDValue.risk}`, true)
        .addField('Confirmations', `${TXIDValue.confirmations}`, true)
        .addField("Date", TXIDValue3.data[TXID].transaction.date)
        .setTimestamp()
            .setFooter("Created by vertical#0007")

        message.channel.send(normal)
        message.reply("We will notify you when it confirms.")

        }
        else if (TXIDValue.eta == "Confirmed"){
          const Confirmed = new discord.MessageEmbed()
        .setTitle(`Transaction Info`)
        .setColor(`GREEN`)
        .addField("Transaction ID", TXID)
        .addField('Amount', `$${TXIDValue3.data[TXID].transaction.output_total_usd}`,true)

        .addField('ETA', `${TXIDValue.eta}`, true)
        .addField('Fee', `$${TXIDValue.fee}`, true)
        .addField('Risk', `${TXIDValue.risk}`, true)
        .addField('Confirmations', `${TXIDValue.confirmations}`, true)
        .addField("Date", TXIDValue3.data[TXID].transaction.date)
        .setTimestamp()
             .setFooter("Created by vertical#0007")

        message.channel.send(Confirmed)
        }

        if (TXIDValue.fee > 1 && TXIDValue.eta !== "Confirmed"){
          const Confirmed = new discord.MessageEmbed()
          .setTitle(`Transaction Info`)
          .setColor(`YELLOW`)
          .addField("Transaction ID", TXID)
          .addField('Amount', `$${TXIDValue3.data[TXID].transaction.output_total_usd}`,true)

          .addField('ETA', `${TXIDValue.eta}`, true)
          .addField('Fee', `$${TXIDValue.fee}`, true)
          .addField('Risk', `${TXIDValue.risk}`, true)
          .addField('Confirmations', `${TXIDValue.confirmations}`, true)
          .addField("Date", TXIDValue3.data[TXID].transaction.date)
          .setTimestamp()
            .setFooter("Created by vertical#0007")

          message.channel.send(Confirmed)
          message.reply("We will notify you when it confirms.")

        const CheckBTC = async function() {
          let TXIDsearch2 = async() => {
                  let response2 = await axios.get(`https://confirmbtc.net/api/api.php?txid=${TXID}`)
                  let TXIDdata2 = response2.data
                  return TXIDdata2
              }
      
              
              let TXIDValue2 = await TXIDsearch2()
              console.log(TXIDValue2)

              }

              let dupo = setInterval(CheckBTC,600);

              if (TXIDValue.risk === "Confirmed"){
                  clearInterval(dupo)  

              message.reply(`Transaction **${TXID}** of **${TXIDValue3.data[TXID].transaction.output_total_usd} USD** has confirmed!`)
              
              }

            }

    } 
    
}


module.exports.config = {
    name: "check",
    permission: "Everyone",
    description: "check",
    usage: ".check",
    aliases: ["ch"]
  }