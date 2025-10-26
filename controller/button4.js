const path = require('path')
const fs = require('fs')

module.exports = async(ctx)=>{
    try {
        await ctx.replyWithVideo({source: path.join(__dirname , '..', "image", "button4.mp4")},{
            caption: `Бисёр осон аст! \n\n● 🛍️ ХАРИДАН 🛍️ - ро пахш кун. \n\n● Картаро интихоб кун. \n\n● Чеки пардохтро равон кун  \n\n● Аз тарафи мо ХОЛИД чеки шуморо ТАФТИШ мекунад.  \n\n● Баъд аз ҳамин БОТ дар лаҳза ба ЧАЙКА меравем.`
        })
    } catch (error) {
        console.log(error)
    }
}