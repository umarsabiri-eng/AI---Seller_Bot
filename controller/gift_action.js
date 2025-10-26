require('dotenv').config()

module.exports = async(ctx)=>{
    try {
        const status = await ctx.getChatMember(ctx.from.id, process.env.MUST_JOIN_CHANNEL)
        if(status.status === "member" || status.status === "creator" || status.status === "administrator"){
            await ctx.reply(`ТӮҲФА ОМОДА АСТ 🎁 \nпеш аз махкам шудан‼️ \nтугмачаро ПАХШ КУН👇 \n---------------------‍`, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "ПАХШ КУН!", url: process.env.GIFT_CHANNEL}]
                    ]
                }
            })
        }else{
            await ctx.reply(`Барои гирифтани тӯҳфа шумо \nбояд ба канал обуна шавед \n\nдар ин канал хабарҳои \n“тӯҳфа” ро мегиред.`, {
                reply_markup: {
                    inline_keyboard: [
                        [{text: "ҲАМРОҲ ШАВ!", url: "https://t.me/"+process.env.MUST_JOIN_CHANNEL}]
                    ]
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}