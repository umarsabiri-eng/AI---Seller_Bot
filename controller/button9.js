const fs = require('fs')
const path = require('path')

module.exports = async (ctx) => {
    const caption = `● Тамоман *хавотир* набош!\n● *⚠️МЕДОНИ ЧАРО?⚠️*\n\n● Вақте бо *телефон* ёд мегирифтам, медидам *мотивация лозимӣ* буд. \n\n● Ва *медидам* бо чи роҳ\n *мотивация* ва *discipline* дар \nёдгири *бо телефон* кор мекунад. \n\n● Ба ҳамин далел тақрибан дар ҳар дарси ЧАЙКА, *мотивация* мебини. \n\n● *Боз чизе ҳаст* дар ЧАЙКА \nбихоҳи ва надошта бошад?😉\n\n*ДАР ВИДЕО МOТИВАЦИЯИ ХУДРО БИН😎\n💥ТУРБО💥*\n-----------------`
    const fallbackText = `*Мотивацияро аз худ оғоз кун!* Дар ЧАЙКА ту ҳар дарс бо эътимод ва дастгирӣ пеш меравӣ. Вақте тайёр шавӣ, ман қадам ба қадам роҳнамоӣ мекунам.`

    try {
        const file = path.join(__dirname, '..', 'image', 'video.mp4')
        if (fs.existsSync(file)) {
            await ctx.replyWithVideo({ source: file }, { caption, parse_mode: 'Markdown' })
        } else {
            await ctx.reply(fallbackText, { parse_mode: 'Markdown' })
        }
    } catch (error) {
        console.error('[button9] handler error', error)
        try {
            await ctx.reply('Видеои лозимӣ пайдо нашуд, аммо ман ҳоло ҳам кӯмак мекунам.')
        } catch (err) {
            console.error('[button9] fallback reply failed', err)
        }
    }
}
