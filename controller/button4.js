const path = require('path')
const fs = require('fs')

module.exports = async (ctx) => {
    const caption = `Бисёр осон аст! \n\n● 🛍️ ХАРИДАН 🛍️ - ро пахш кун. \n\n● Картаро интихоб кун. \n\n● Чеки пардохтро равон кун\n\n● Аз тарафи мо ХОЛИД чеки шуморо ТАФТИШ мекунад.  \n\n● Баъд аз ҳамин БОТ дар лаҳза ба ЧАЙКА меравем.`
    const fallbackText = `*Хариданаш осон аст!* Тугмаи 🛍️ ХАРИДАНИ КУРС 🛍️-ро пахш кун, усули пардохтро интихоб ва чеки худро фирист. Мо зуд ҷавоб медиҳем ва ба курс равона мекунем.`

    try {
        const file = path.join(__dirname, '..', 'image', 'button4.mp4')
        if (fs.existsSync(file)) {
            await ctx.replyWithVideo({ source: file }, { caption, parse_mode: 'Markdown' })
        } else {
            await ctx.reply(fallbackText, { parse_mode: 'Markdown' })
        }
    } catch (error) {
        console.error('[button4] handler error', error)
        try {
            await ctx.reply('Видеои лозимӣ пайдо нашуд, аммо ман ҳоло ҳам кӯмак мекунам.')
        } catch (err) {
            console.error('[button4] fallback reply failed', err)
        }
    }
}
