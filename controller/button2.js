const fs = require('fs')
const path = require("path")

module.exports = async (ctx)=>{
    try {
        await ctx.replyWithPhoto({source: path.join(__dirname, '..', "image", "Banner.jpg")}, {
            caption: `ТӮҲФА ИНТИЗОРИ ТУ БУД 🎁 \nпеш аз махкам шудан! \nтугмачаро ПАХШ КУН👇 \n---------------------‍`,
            reply_markup: {
                inline_keyboard: [
                    [{text: "гирифтан", callback_data: "gift"}]
                ]
            }
        })
    } catch (error) {
        console.log(error)
    }
}