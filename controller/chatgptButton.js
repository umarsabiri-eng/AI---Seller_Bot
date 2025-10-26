module.exports = async (ctx)=>{
  try{
    await ctx.reply("Курс дар ChatGPT:", {
      reply_markup: {
        inline_keyboard: [[
          { text: "Кушодан", url: "https://chatgpt.com/g/g-68fb4e5a88ec81918b97eb7ec58d5165-khizmat-ba-mushtarien" }
        ]]
      }
    })
  }catch(e){}
}
