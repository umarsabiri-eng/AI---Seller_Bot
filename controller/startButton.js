const User = require('../model/user')
const usermenu = require('../menu/user')

module.exports = async(ctx)=>{
    try {
        const user = await User.findOne({user_id: ctx.from.id})
        if(!user){
            const r = new User({
                user_id: ctx.from.id,
                name: ctx.from.first_name,
                username: ctx.from.username,
            })
            await r.save()
        }
        await ctx.reply("Welcome to the bot", {
            reply_markup: {
                keyboard: usermenu,
                resize_keyboard: true
            }
        })
    } catch (error) {
        console.log(error)
    }
}