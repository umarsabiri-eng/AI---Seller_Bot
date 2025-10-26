const fs = require('fs')
const path = require('path')

module.exports = async(ctx)=>{
    try {
        await ctx.replyWithPhoto({source: path.join(__dirname , '..', "image", "button14.jpg")}, {
            caption: `Ин танҳо як қисме \nаз донишҷӯён аст. \n\nБарои донишҷуёни бештар, \nтугмачаи поёнро ПАХШ КУН \n-------------`,
            reply_markup: {
                inline_keyboard:[
                    [
                        {text: "Visit" , url: "https://t.me/Feadback_Stidents"}
                    ]
                ]
            }
        })
    } catch (error) {
        console.log(error)
    }
}