const {Telegraf, session, Scenes} = require('telegraf')
const mongoose = require('mongoose')
const adminscene = require('./scene/admin')
const buyscene = require('./scene/buy')
const path = require('path')
const fs = require('fs')
require('dotenv').config()


const broadcast = require('./controller/broadcast')
const startButton = require('./controller/startButton')
const button1 = require('./controller/button1')
const btn1_action = require('./controller/btn1_action')
const btn2_action = require('./controller/btn2_action')
const btn3_action = require('./controller/btn3_action')
const button2 = require('./controller/button2')
const gift_action = require('./controller/gift_action')
const button3 = require('./controller/button3')
const button4 = require('./controller/button4')
const button5 = require('./controller/button5')
const button6 = require('./controller/button6')
const button7 = require('./controller/button7')
const button8 = require('./controller/button8')
const button9 = require('./controller/button9')
const button10 = require('./controller/button10')
const button11 = require('./controller/button11')
const button12 = require('./controller/button12')
const button13 = require('./controller/button13')
const button14 = require('./controller/button14')
const questionsMenu = require('./controller/questionsMenu')
const backToMain = require('./controller/backToMain')
const chatgptButton = require('./controller/chatgptButton')


const bot = new Telegraf(process.env.BOT_TOKEN || '6891176898:AAFrOpOr92HAk8yRVJkWxmbllSwpEs2IazE')

bot.use(session())

bot.catch((err, ctx)=>console.log(err))

mongoose.connect(process.env.DB_URI || 'mongodb://mongo:rm5fem8gjys7nlvi@107.172.58.34:27017/menubot?authSource=admin', {
    authSource: 'admin'
})
.then(()=>console.log('DB Connected'))
.catch(e=>console.log(e))

const stage = new Scenes.Stage([adminscene, buyscene])
bot.use(stage.middleware())

// Broadcast handler - listens to channel posts from broadcast channel
bot.on('channel_post', broadcast)

bot.start(startButton)

bot.hears('🛍️ ХАРИДАНИ КУРС 🛍️', button1)


bot.action("btn1", btn1_action)

bot.action("btn2", btn2_action)

bot.action("btn3", btn3_action)

bot.action(["course1", "course2", "course3"], async ctx=>{
    try {
        console.log(`[APP] Course selection - User ${ctx.from.id} (${ctx.from.username}) selected ${ctx.match[0]}`)
        ctx.session.course_name = ctx.match[0]
        console.log(`[APP] Course selection - Session course_name set to: ${ctx.session.course_name}`)
        console.log(`[APP] Course selection - Entering buy scene...`)
        ctx.scene.enter('buy')
        await ctx.deleteMessage()
        await ctx.answerCbQuery()
    } catch (error) {
        console.log(`[APP] Course selection - ERROR:`, error)
    }
})

bot.hears("🎁 Курси ройгон", button2)

bot.action("gift", gift_action)

bot.hears('🤖 Роботи Чайка AI', button3)

bot.hears("чихел бихарам?", button4)

bot.hears("курс телефони аст?", button5)

bot.hears("бо тел ёд мегирам?", button6)

bot.hears("забонам 0 аст", button7)

bot.hears("вақтам кам аст", button8)

bot.hears("МОТИВАЦИЯ НЕСТ", button9)

bot.hears("800 қолаб чист?", button10)

bot.hears("тарзи дарс гузари?", button11)

bot.hears("оё моҳона аст?", button12)

bot.hears("кай гап мезанам?", button13)

bot.hears("розигии донишҷуён", button14)

bot.command('makeadmin', async ctx=>{
    try {
        ctx.scene.enter('admin')
    } catch (error) {
        console.log(error)
    }
})

bot.action(/allow_/, async ctx=>{
    try {
        console.log(`[APP] Allow action - Admin ${ctx.from.id} (${ctx.from.username}) triggered ALLOW`)
        console.log(`[APP] Allow action - Callback data: ${ctx.match.input}`)

        await ctx.deleteMessage()
        await ctx.answerCbQuery('Тасдиқ карда шуд')

        const user_id = ctx.match.input.split("_")[1]
        const course = ctx.match.input.split("_")[2]

        console.log(`[APP] Allow action - Parsed user_id: ${user_id}`)
        console.log(`[APP] Allow action - Parsed course: ${course}`)

        if(course === "course1"){
            console.log(`[APP] Allow action - Sending course1 access to user ${user_id}`)

            await ctx.telegram.sendMessage(user_id, `*ТАБРИК* дусти *ЧАЙКА*👏 \nбарои худат аз қалбам \nтабрик мегуям❤️ \n\nАлакай ба курси\n*мини SPEAK*\nдастраси дори. \n\nДар ин *сылка* бдро \nва лаззат бибар😊`,{
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: 'ЧАЙКА SPEAK', url: "https://t.me/+NCvkeCdHi9RiNWMy"}
                        ]
                    ]
                },
                protect_content: true,
                parse_mode: "Markdown"
            })
        }
        if(course === "course2"){
            console.log(`[APP] Allow action - Sending course2 access to user ${user_id}`)
            await ctx.telegram.sendMessage(user_id, `*ТАБРИК* дусти *ЧАЙКА👏* \nбарои худат аз қалбам  \nтабрик мегуям❤️  \n\nАлакай ба курси \n*ЧАЙКА SPEAK* \nдастраси дори. \n\nДар ин *сылка* бдро \nва лаззат бибар😊`,{
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: 'ЧАЙКА SPEAK', url: "https://t.me/+7OIM7eGloZw3YWZi"}
                        ]
                    ]
                },
                protect_content: true,
                parse_mode: "Markdown"
            })
        }
        if(course === "course3"){
            console.log(`[APP] Allow action - Sending course3 access to user ${user_id}`)
            await ctx.telegram.sendMessage(user_id, `*ТАБРИК* дусти *ЧАЙКА👏* \nбарои худат аз қалбам  \nтабрик мегуям❤️  \n\nАлакай ба курси \n*ЧАЙКА SPEAK* \nдастраси дори. \n\nДар ин *сылка* бдро \nва лаззат бибар😊`,{
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text: 'ЧАЙКА SPEAK', url: "https://t.me/+cXflySQN7XI0MDIy"}
                        ]
                    ]
                },
                protect_content: true,
                parse_mode: "Markdown"
            })
        }

        console.log(`[APP] Allow action - Successfully processed approval for user ${user_id}`)

    } catch (error) {
        console.log(`[APP] Allow action - ERROR:`, error)
    }
})

bot.action(/reject_/, async ctx=>{
    try {
        console.log(`[APP] Reject action - Admin ${ctx.from.id} (${ctx.from.username}) triggered REJECT`)
        console.log(`[APP] Reject action - Callback data: ${ctx.match.input}`)

        await ctx.deleteMessage()
        await ctx.answerCbQuery('Рад карда шуд')

        const user_id = ctx.match.input.split("_")[1]
        const course = ctx.match.input.split("_")[2]

        console.log(`[APP] Reject action - Parsed user_id: ${user_id}`)
        console.log(`[APP] Reject action - Parsed course: ${course}`)
        console.log(`[APP] Reject action - Sending rejection message to user ${user_id}`)

        await ctx.telegram.sendMessage(user_id, `Бубахшед барои рад. Пардохти шумо равшан нест. Агар ба шумо ягон кӯмак лозим бошад, пас ба администратори мо муроҷиат кунед. ташаккур \n@umarsobir_support`)

        console.log(`[APP] Reject action - Successfully processed rejection for user ${user_id}`)
    } catch (error) {
        console.log(`[APP] Reject action - ERROR:`, error)
    }
})



bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

bot.hears('💬 Ҷавоби саволҳо', questionsMenu)


bot.hears('⬅️ Бозгашт', backToMain)


bot.hears('Курс дар ChatGPT', chatgptButton)


bot.hears('🟢 Обновит', startButton)

const aiGeneral = require('./controller/ai_general')

bot.on('text', aiGeneral)

const freeCourse = require('./controller/freeCourse')

bot.hears('🎁 Курсӣ ройгон', freeCourse)

const cheikaAiLanding = require('./controller/cheikaAiLanding')
bot.hears('🤖 Чайка AI', cheikaAiLanding)

bot.hears('Старт 🟢', startButton)

bot.hears('🟢 СТАРТ 🟢', startButton)

bot.hears('Курсӣ ройгон 🎁', freeCourse)
