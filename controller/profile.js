const { Markup } = require('telegraf')
const User = require('../model/user')

const RANKS = { free: 0, mini: 1, premium: 2, vip: 3 }
const PURCHASE_TIER = { course1: 'mini', course2: 'premium', course3: 'vip' }

function resolveTier(purchases = []) {
  if (!Array.isArray(purchases) || purchases.length === 0) return 'free'
  let highest = 0
  for (const item of purchases) {
    if (!item) continue
    let code = item
    if (typeof item === 'object') {
      if (item.course) code = item.course
      else if (item.code) code = item.code
      else if (item.name) code = item.name
    }
    if (typeof code !== 'string') continue
    const normalized = PURCHASE_TIER[code] || code.toLowerCase()
    const rank = RANKS[normalized]
    if (typeof rank === 'number' && rank > highest) highest = rank
  }
  return Object.keys(RANKS).find(key => RANKS[key] === highest) || 'free'
}

function mapTierToLabel(tier) {
  switch (tier) {
    case 'mini':
      return 'Mini'
    case 'premium':
      return 'Premium'
    case 'vip':
      return 'VIP'
    default:
      return 'Ройгон'
  }
}

module.exports = async (ctx) => {
  try {
    const u = await User.findOne({ user_id: ctx.from.id }).lean().catch(() => null)
    const name = (u && u.first_name)
      ? u.first_name
      : (ctx.from.username ? `@${ctx.from.username}` : 'Дӯст')

    const tierKey = u ? resolveTier(u.purchases) : 'free'
    const label = mapTierToLabel(tierKey)

    const message = `👤 Ном: ${name}\n✅ Курс: ${label}\n📆 Срок: Як умр\n\n🔥 Курси беҳтар даркор?\n🚀 Аз поён харид кунед.`

    const keyboard = Markup.keyboard([
      [{ text: '🎁 Курсӣ ройгон' }],
      [{ text: '🛍️ ХАРИДАНИ КУРС 🛍️' }],
      [{ text: '⬅️ Бозгашт' }]
    ]).resize()

    await ctx.reply(message, {
      parse_mode: 'Markdown',
      reply_markup: keyboard.reply_markup
    })
  } catch (error) {
    console.log('profile_error', error)
  }
}
