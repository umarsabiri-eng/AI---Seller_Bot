module.exports = async (ctx)=>{
  try{
    await ctx.reply('Тугмачаро ПАХШ КУН👇
ТӮҲФАРО БИГИР! 🎁', {
      reply_markup: {
        inline_keyboard: [[
          { text: 'гирифтан', url: 'https://t.me/+XljVnvQgMJxjMjEy' }
        ]]
      }
    })
  }catch(e){}
}
