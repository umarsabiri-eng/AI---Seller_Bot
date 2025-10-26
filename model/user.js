const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_id: Number,
    name: String,
    username: String,
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
},
{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)