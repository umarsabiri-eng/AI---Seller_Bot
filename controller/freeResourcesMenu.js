const { Markup } = require('telegraf')
const freeResourcesKeyboard = require('../menu/freeResources')

module.exports = async (ctx) => {
  try {
    await ctx.reply('🎁 Ройгонҳо', Markup.keyboard(freeResourcesKeyboard).resize())
  } catch (error) {
    console.log(error)
  }
}
