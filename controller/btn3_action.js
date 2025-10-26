const fs = require('fs')
const path = require('path')

module.exports = async(ctx)=>{
    try {
        await ctx.deleteMessage()
        await ctx.replyWithPhoto( {source: fs.readFileSync(path.join(__dirname, '..', "image", "thirdbtn.png"))}, {
            caption: `Ба комилтарин курси онлайнии *“ЧАЙКА SPEAK”* хуш омадед 🙂\n\n*>>>>‼️1-НАРХ‼️<<<<*  \n\n🚫*нархи асосӣ:* 🚫\n🇹🇯 2,999с | 🇷🇺 24,990р  \n————————————\n▎🎁 Бо нархи скидка: \n▎✅ *2500 сомонӣ* 🇹🇯\n▎✅ *20,000 рубл* 🇷🇺  \n———————————— \n\n*>>>‼️2-ПАРДОХТ‼️<<<* \n\nЯке аз роҳи пардохтро \nинтихоб кунед.\n\n1️⃣ *Душанбе сити*\n✅️ 917151080 \n\n2️⃣ *Сбербанк Русия*\n✅️ 2202 2061 0661 9872 \nУмарали Обиджонович С \n\n*>>>‼️3-ГИРИФТАН‼️<<<*\n\n🔹 *Баъд аз пардохт* \n✅ *Ман пардохт кардам* пахш кунед ва сурати чекро ҳамонҷо фиристед.  \n\n⏱ Дар камтар аз 10 минут ба *ЧАЙКА VIP* меравем 👑\n\n———————————\n⚠️ Чекро БОТ тафтиш намекунад, *операторҳо тафтиш мекунанд.* `,
            reply_markup: {
                inline_keyboard: [
                    [{text: "Ман пардохт кардам", callback_data: "course3"}]
                ]
            },
            parse_mode: "Markdown"
        })
    } catch (error) {
        console.log(error)
    }
}