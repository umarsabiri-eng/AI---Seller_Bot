module.exports = async(ctx)=>{
    try {
        await ctx.reply(`👋 Ба Чайка AI салом гуед! \n✅ Беҳтарин роботи шахсӣ \n✅ 100 забонро медонад \n🇺🇸🇬🇧🇷🇺🇸🇦🇹🇷🇨🇳🇩🇪+100🌎 \n✅ Ҳамарӯза ройгон аст!`,{
            parse_mode: "Markdown",
            reply_markup:{
                inline_keyboard: [
                    [{text: "Ҳамроҳ шавед 🚀", url: "https://t.me/NewAI_Chatbot?start=5232900857"}]
                ]
            }
        })
       
    } catch (error) {
        console.log(error)
    }
}