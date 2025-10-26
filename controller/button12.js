module.exports = async(ctx)=>{
    try {
        await ctx.reply(`*САВОЛ:* \nОё ЧАЙКА *моҳона* \n*пардохт* мешавад? \n------------ \n*АЛБАТТА КИ НЕ!* \n\nБарои ЧАЙКА SPEAK ҳамагӣ \n*як бор пардохт* мешавад. \nВа ҳамеша дар ихтиёрат аст😎`, {parse_mode: "Markdown"})
    } catch (error) {
        console.log(error)
    }
}