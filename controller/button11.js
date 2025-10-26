const fs = require('fs')
const path = require('path')

module.exports = async(ctx)=>{
    try {
        await ctx.replyWithPhoto({source: path.join(__dirname, '..', "image", "Banner2.jpg")}, {
            caption: `● ЧАЙКА курси онлайни аст \n● Дар 1 ҳафта 3 дарс \n● Дар телеграм мегузарад. \n● Ба 3 курси ЧАЙКА👑 \n● ҳамавақт дастрасӣ дори✅ \n● хубияш ин аст, ки😎 \n● дилхоҳ вақту ҷо меомӯзи🌍`,
            parse_mode: "Markdown"
        })
    } catch (error) {
        console.log(error)
    }
}