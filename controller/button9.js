const fs = require('fs')
const path = require('path')

module.exports = async (ctx)=>{
    try {
        await ctx.replyWithVideo({source: path.join(__dirname, '..', "image", "video.mp4")}, {
            caption: `● Тамоман *хавотир* набош!\n● *⚠️МЕДОНИ ЧАРО?⚠️*\n\n● Вақте бо *телефон* ёд мегирифтам, медидам *мотивация лозимӣ* буд. \n\n● Ва *медидам* бо чи роҳ\n *мотивация* ва *discipline* дар \nёдгири *бо телефон* кор мекунад. \n\n● Ба ҳамин далел тақрибан дар ҳар дарси ЧАЙКА, *мотивация* мебини. \n\n● *Боз чизе ҳаст* дар ЧАЙКА \nбихоҳи ва надошта бошад?😉\n\n*ДАР ВИДЕО МOТИВАЦИЯИ ХУДРО БИН😎\n💥ТУРБО💥*\n-----------------`,
            parse_mode: "Markdown"
        })
    } catch (error) {
        console.log(error)
    }
}