const {Scenes} = require('telegraf')
const User = require('../model/user')
const restartStrings = require('../restartString')

const adminScenes = new Scenes.WizardScene('admin',

    async (ctx)=>{
        try {
            await ctx.reply("Калиди администратори худро ворид кунед")
            return ctx.wizard.next()
        } catch (error) {
            console.log(error)
            await ctx.reply("Хатогие рух дод. Лутфан бори дигар кӯшиш кунед")
            return ctx.scene.leave()
        }
    },
    async ctx=>{
        try {
            if(!ctx.message.text) return ctx.scene.leave(await ctx.reply("Навъи парол нодуруст аст"))
            if(restartStrings.includes(ctx.message.text)) return ctx.scene.leave(await ctx.reply("Амалиёт бекор карда шуд"))
            if(ctx.message.text != process.env.ADMIN_PASSWORD) return ctx.scene.leave(await ctx.reply("Навъи парол нодуруст аст"))
            const user = await User.findOne({user_id: ctx.from.id})
            if(user){
                user.role = "admin"
                await user.save()
            }
            await ctx.reply("Шумо ба вазифаи администратори бот ворид шудед")
            return ctx.scene.leave()
        } catch (error) {
            console.log(error)
            await ctx.reply("Хатогие рух дод. Лутфан бори дигар кӯшиш кунед")
            return ctx.scene.leave()
        }
    }
)


module.exports = adminScenes