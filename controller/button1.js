const fs = require('fs')
const path = require('path')

module.exports = async(ctx)=>{
    try {
        await ctx.replyWithPhoto({source: fs.readFileSync(path.join(__dirname,'..', "image", "photo132.jpg"))}, {
            protect_content: true,
            parse_mode: "Markdown",
            caption: `*Курси худро интихоб кун* \n--------------------- \n✅️ дар камтар аз 10 минут  \n✅️ *ЧАЙКА* - ро бигир`,
            reply_markup: {
                inline_keyboard: [
                    [{text: 'мини 97с | як умр', callback_data: "btn1"}],
                    [{text: "ПРЕМУИМ 997с | як умр", callback_data: "btn2"}],
                    [{text: 'ВИП 2500с | як умр', callback_data: "btn3"}],
                ]
            }
        })

    } catch (error) {
        console.log(error)
    }
}