const User = require('../model/user')

// Broadcast channel ID
const BROADCAST_CHANNEL_ID = -1003005173505

// Delay between messages (milliseconds) - adjust as needed
const MESSAGE_DELAY = 100 // 100ms delay between each user

// Sleep function for delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

module.exports = async (ctx) => {
    try {
        // Check if message is from the broadcast channel
        if (ctx.chat.id !== BROADCAST_CHANNEL_ID) {
            return // Ignore messages from other channels
        }

        console.log(`[BROADCAST] Received broadcast message from channel ${BROADCAST_CHANNEL_ID}`)

        // Channel posts use ctx.channelPost instead of ctx.message
        const message = ctx.channelPost || ctx.message

        if (!message) {
            console.log(`[BROADCAST] No message content found`)
            return
        }

        console.log(`[BROADCAST] Message type: ${Object.keys(message).filter(k => k !== 'from' && k !== 'chat' && k !== 'date' && k !== 'message_id').join(', ')}`)

        // Get all users from database
        const users = await User.find({})
        console.log(`[BROADCAST] Found ${users.length} users to send message to`)

        if (users.length === 0) {
            console.log(`[BROADCAST] No users found in database`)
            return
        }

        let successCount = 0
        let failedCount = 0
        let blockedCount = 0

        console.log(`[BROADCAST] Starting broadcast to ${users.length} users...`)

        // Send message to each user
        for (let i = 0; i < users.length; i++) {
            const user = users[i]

            try {
                console.log(`[BROADCAST] Sending to user ${i + 1}/${users.length} - ID: ${user.user_id} (${user.username || 'no username'})`)

                // Handle different message types
                if (message.photo) {
                    // Photo message (with optional caption)
                    const photo = message.photo[message.photo.length - 1] // Get highest quality
                    await ctx.telegram.sendPhoto(user.user_id, photo.file_id, {
                        caption: message.caption || '',
                        parse_mode: message.caption_entities ? 'HTML' : undefined,
                        protect_content: true
                    })
                } else if (message.video) {
                    // Video message
                    await ctx.telegram.sendVideo(user.user_id, message.video.file_id, {
                        caption: message.caption || '',
                        parse_mode: message.caption_entities ? 'HTML' : undefined,
                        protect_content: true
                    })
                } else if (message.document) {
                    // Document/file message
                    await ctx.telegram.sendDocument(user.user_id, message.document.file_id, {
                        caption: message.caption || '',
                        parse_mode: message.caption_entities ? 'HTML' : undefined,
                        protect_content: true
                    })
                } else if (message.audio) {
                    // Audio message
                    await ctx.telegram.sendAudio(user.user_id, message.audio.file_id, {
                        caption: message.caption || '',
                        parse_mode: message.caption_entities ? 'HTML' : undefined,
                        protect_content: true
                    })
                } else if (message.voice) {
                    // Voice message
                    await ctx.telegram.sendVoice(user.user_id, message.voice.file_id, {
                        caption: message.caption || '',
                        parse_mode: message.caption_entities ? 'HTML' : undefined,
                        protect_content: true
                    })
                } else if (message.video_note) {
                    // Video note (circle video)
                    await ctx.telegram.sendVideoNote(user.user_id, message.video_note.file_id)
                } else if (message.animation) {
                    // GIF/Animation
                    await ctx.telegram.sendAnimation(user.user_id, message.animation.file_id, {
                        caption: message.caption || '',
                        parse_mode: message.caption_entities ? 'HTML' : undefined,
                        protect_content: true
                    })
                } else if (message.sticker) {
                    // Sticker
                    await ctx.telegram.sendSticker(user.user_id, message.sticker.file_id)
                } else if (message.text) {
                    // Text message
                    await ctx.telegram.sendMessage(user.user_id, message.text, {
                        parse_mode: message.entities ? 'HTML' : undefined,
                        protect_content: true
                    })
                } else if (message.poll) {
                    // Poll
                    await ctx.telegram.sendPoll(
                        user.user_id,
                        message.poll.question,
                        message.poll.options.map(o => o.text),
                        {
                            is_anonymous: message.poll.is_anonymous,
                            allows_multiple_answers: message.poll.allows_multiple_answers
                        }
                    )
                } else {
                    // Try to forward the message if type is not recognized
                    console.log(`[BROADCAST] Unknown message type, attempting to forward...`)
                    await ctx.telegram.forwardMessage(user.user_id, message.chat.id, message.message_id)
                }

                successCount++
                console.log(`[BROADCAST] ✓ Successfully sent to user ${user.user_id}`)

            } catch (error) {
                failedCount++

                // Check if user blocked the bot
                if (error.response && error.response.error_code === 403) {
                    blockedCount++
                    console.log(`[BROADCAST] ✗ User ${user.user_id} has blocked the bot`)
                } else {
                    console.log(`[BROADCAST] ✗ Failed to send to user ${user.user_id}:`, error.message)
                }
            }

            // Add delay between messages to avoid rate limiting
            if (i < users.length - 1) { // Don't delay after the last message
                await sleep(MESSAGE_DELAY)
            }
        }

        // Summary
        console.log(`[BROADCAST] ============ BROADCAST COMPLETE ============`)
        console.log(`[BROADCAST] Total users: ${users.length}`)
        console.log(`[BROADCAST] Successfully sent: ${successCount}`)
        console.log(`[BROADCAST] Failed: ${failedCount}`)
        console.log(`[BROADCAST] Blocked bot: ${blockedCount}`)
        console.log(`[BROADCAST] ==========================================`)

    } catch (error) {
        console.log(`[BROADCAST] CRITICAL ERROR:`, error)
    }
}
