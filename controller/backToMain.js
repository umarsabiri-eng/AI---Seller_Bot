const { Markup } = require('telegraf')
const mainKeyboard = require('../menu/user')
module.exports = async (ctx)=>{
  try{ await ctx.reply('📲 Menu', Markup.keyboard(mainKeyboard).resize()) }catch(e){}
}
