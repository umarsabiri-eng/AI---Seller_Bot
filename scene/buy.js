const {Scenes} = require('telegraf')
const User = require('../model/user')
const restartString = require('../restartString')

const buyScenes = new Scenes.WizardScene('buy',
    async (ctx)=>{
        try {
            console.log(`[BUY SCENE] Step 1 - User ${ctx.from.id} (${ctx.from.username}) entered buy scene`)
            console.log(`[BUY SCENE] Step 1 - Course selected: ${ctx.session.course_name}`)
            await ctx.reply(`Лутфан акси пардохти худро бор кунед`)
            return ctx.wizard.next()
        } catch (error) {
            console.log(`[BUY SCENE] Step 1 - ERROR:`, error)
            await ctx.reply('Хатогие рух дод. Лутфан бори дигар кӯшиш кунед')
            return ctx.scene.leave()
        }
    },
    async ctx=>{
        try {
            console.log(`[BUY SCENE] Step 2 - Received message from user ${ctx.from.id}`)
            console.log(`[BUY SCENE] Step 2 - Message type: ${ctx.message ? 'text/photo' : 'unknown'}`)
            console.log(`[BUY SCENE] Step 2 - Has photo: ${ctx.update.message?.photo ? 'yes' : 'no'}`)
            console.log(`[BUY SCENE] Step 2 - Message text: ${ctx.message?.text}`)

            if(restartString.includes(ctx.message.text)) {
                console.log(`[BUY SCENE] Step 2 - User cancelled with restart string`)
                return ctx.scene.leave(await ctx.reply("Амалиёт бекор карда шуд"))
            }

            if(!ctx.update.message.photo){
                console.log(`[BUY SCENE] Step 2 - No photo received, asking user to resend`)
                await ctx.reply('Лутфан як акси дурустро бор кунед')
                return ctx.wizard.back()
            }

            let photo = ctx.update.message.photo[0].file_id
            console.log(`[BUY SCENE] Step 2 - Photo received: ${photo}`)
            console.log(`[BUY SCENE] Step 2 - Session course_name: ${ctx.session.course_name}`)

            await ctx.reply('Маълумоти шумо бомуваффақият пешниҳод карда шуд. Администратори мо онро ба зудӣ тафтиш мекунад ва агар ҳама чиз хуб бошад, мо онро ба зудӣ тасдиқ мекунем')

            let course_names;
            if(ctx.session.course_name == 'course1'){
                course_names = "мини ЧАЙКА / 97с"
            }else if(ctx.session.course_name == 'course2'){
                course_names = "ЧАЙКА ПРЕМИУМ / 947с"
            }else if(ctx.session.course_name == 'course3'){
                course_names = "ЧАЙКА VIP 👑 / 997с"
            }

            console.log(`[BUY SCENE] Step 2 - Course name mapped: ${course_names}`)
            console.log(`[BUY SCENE] Step 2 - Fetching admin users from database...`)

            const users = await User.find({role: 'admin'})
            console.log(`[BUY SCENE] Step 2 - Found ${users.length} admin(s)`)
            console.log(`[BUY SCENE] Step 2 - Admin IDs: ${users.map(u => u.user_id).join(', ')}`)

            for(let user of users){
                try {
                    console.log(`[BUY SCENE] Step 2 - Sending photo to admin ${user.user_id} (${user.username})`)
                    const callbackData = `allow_${ctx.from.id}_${ctx.session.course_name}`;
                    const rejectData = `reject_${ctx.from.id}_${ctx.session.course_name}`;
                    console.log(`[BUY SCENE] Step 2 - Allow callback: ${callbackData}`)
                    console.log(`[BUY SCENE] Step 2 - Reject callback: ${rejectData}`)

                    await ctx.telegram.sendPhoto(user.user_id, photo, {
                        caption: `User ID: ${ctx.from.id} \nName: ${ctx.from.first_name} ${ctx.from.last_name|| ""} \nUsername: ${ctx.from.username || ""}, \n\nCourse: ${course_names}`,
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {text: "ALLOW ✅", callback_data: callbackData},
                                    {text: "REJECT ❌", callback_data: rejectData}
                                ]
                            ]
                        }
                    })
                    console.log(`[BUY SCENE] Step 2 - Successfully sent photo to admin ${user.user_id}`)
                } catch (error) {
                    console.log(`[BUY SCENE] Step 2 - ERROR sending to admin ${user.user_id}:`, error)
                }
            }

            console.log(`[BUY SCENE] Step 2 - Leaving buy scene`)
            return ctx.scene.leave()
        } catch (error) {
            console.log(`[BUY SCENE] Step 2 - CRITICAL ERROR:`, error)
            await ctx.reply('Хатогие рух дод. Лутфан бори дигар кӯшиш кунед')
            return ctx.scene.leave()
        }
    }
)


module.exports = buyScenes
