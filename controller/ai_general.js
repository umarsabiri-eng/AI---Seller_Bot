// General AI replies using OpenAI API via fetch (no extra deps).
// Reads OPENAI_API_KEY from env. Gracefully offline if missing.
const fs = require('fs')
const path = require('path')

const EXTRA_SKIP_LABELS = [
  '⬅️ Бозгашт',
  'гирифтан',
  '🛍️ ХАРИДАНИ КУРС 🛍️',
  '🤖 Чайка AI',
  '🎁 Курсӣ ройгон',
  '💬 Ҷавоби саволҳо',
  '🟢 Обновит'
]

// Flatten reply-keyboard labels to skip AI on those taps
function collectLabels () {
  let keyboardLabels = []
  try {
    const keyboard = require('../menu/user')
    for (const row of keyboard) {
      for (const b of row) {
        if (b && b.text) keyboardLabels.push(b.text)
      }
    }
  } catch (e) {}

  const merged = [...keyboardLabels, ...EXTRA_SKIP_LABELS]
  return Array.from(new Set(merged))
}
const BUTTON_LABELS = collectLabels()

async function callOpenAI (prompt) {
  const key = process.env.OPENAI_API_KEY
  if (!key) { console.log('AI_KEY_MISSING'); return null }
  const sysBase = "You are a bold, empowering sales assistant for UMAR's English courses. Be concise, persuasive, and practical. Language: Tajik with clear, friendly tone; mix English when helpful. Always offer to guide the user to buy when appropriate."
  // Optionally include small knowledge snippet if available
  let kb = ""
  try {
    const kbPath = path.join(__dirname, '..', 'config', 'knowledge.txt')
    if (fs.existsSync(kbPath)) {
      kb = fs.readFileSync(kbPath, 'utf-8').slice(0, 2500) // small snippet
    }
  } catch (e) {}
  const system = kb ? (sysBase + "\n\nKNOWLEDGE:\n" + kb) : sysBase

  const body = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: prompt }
    ]
  }
  const ac = new AbortController()
  const timeout = setTimeout(() => ac.abort(), 20000)
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + key,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body), signal: ac.signal })
  clearTimeout(timeout)
  if (!res.ok) return null
  const data = await res.json()
  const msg = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || ''
  return msg || null
}

module.exports = async (ctx, next) => {
  const txt = ctx.message && ctx.message.text ? ctx.message.text.trim() : ''
  if (!txt) return next()
  // If user tapped a menu/submenu label, skip AI so the original handlers run
  if (BUTTON_LABELS.includes(txt)) return next()

  try {
    const reply = await callOpenAI(txt)
    if (!reply) {
      return ctx.reply('🤖 AI муваққатан хомӯш аст. Кӯшиш кунед баъдтар ё нависед: /faq').catch(() => {})
    }
    // Send AI answer + soft CTA row
    await ctx.reply(reply, {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🛍️ Харидани курс', callback_data: 'ai_buy' }],
          [{ text: '❓ FAQ', callback_data: 'ai_faq' }]
        ]
      }
    }).catch(() => {})
  } catch (e) {
    try { await ctx.reply('🤖 AI муваққатан хомӯш аст.').catch(() => {}) } catch (_) {}
  }
}
