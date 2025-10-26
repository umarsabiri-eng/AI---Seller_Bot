module.exports = async (ctx)=>{
  try{
    const text = [
      '👋 Ба Чайка AI салом гуед!',
      '✅ Беҳтарин роботи шахсӣ',
      '✅ 100 забонро медонад',
      '🇺🇸🇬🇧🇷🇺🇸🇦🇹🇷🇨🇳🇩🇪+100🌎',
      '✅ Ҳамарӯза ройгон аст!'
    ].join('\n')
    await ctx.reply(text, {
      reply_markup: {
        inline_keyboard: [[
          { text: 'Даромадан 🚀', url: 'https://t.me/NewAI_Chatbot?start=5232900857' }
        ]]
      }
    })
  }catch(e){}
}
