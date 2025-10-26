const { Markup } = require('telegraf')
const keyboard = [
  [{ text: 'чихел бихарам?' }, { text: 'курс телефони аст?' }],
  [{ text: 'бо тел ёд мегирам?' }, { text: 'забонам 0 аст' }],
  [{ text: 'вақтам кам аст' }, { text: 'МОТИВАЦИЯ НЕСТ' }],
  [{ text: '800 қолаб чист?' }, { text: 'тарзи дарс гузари?' }],
  [{ text: 'оё моҳона аст?' }, { text: 'кай гап мезанам?' }],
  [{ text: 'розигии донишҷуён' }, { text: 'Курс дар ChatGPT' }],
  [{ text: '⬅️ Бозгашт' }]
]
module.exports = async (ctx)=>{
  try{ await ctx.reply('💬 Ҷавоби саволҳо', Markup.keyboard(keyboard).resize()) }catch(e){}
}
