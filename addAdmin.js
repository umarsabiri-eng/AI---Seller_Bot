const mongoose = require('mongoose')
const User = require('./model/user')
require('dotenv').config()

// Admin user ID to add
const ADMIN_USER_ID = 5232900857

async function addAdmin() {
    try {
        // Connect to database
        await mongoose.connect(process.env.DB_URI || 'mongodb://mongo:rm5fem8gjys7nlvi@107.172.58.34:27017/menubot?authSource=admin', {
            authSource: 'admin'
        })
        console.log('[ADD ADMIN] Connected to database')

        // Check if user already exists
        let user = await User.findOne({ user_id: ADMIN_USER_ID })

        if (user) {
            console.log(`[ADD ADMIN] User ${ADMIN_USER_ID} already exists`)
            if (user.role === 'admin') {
                console.log(`[ADD ADMIN] User ${ADMIN_USER_ID} is already an admin`)
            } else {
                user.role = 'admin'
                await user.save()
                console.log(`[ADD ADMIN] Updated user ${ADMIN_USER_ID} to admin role`)
            }
        } else {
            // Create new admin user
            user = new User({
                user_id: ADMIN_USER_ID,
                name: 'Admin',
                username: 'admin',
                role: 'admin'
            })
            await user.save()
            console.log(`[ADD ADMIN] Created new admin user ${ADMIN_USER_ID}`)
        }

        // Verify
        const admins = await User.find({ role: 'admin' })
        console.log(`[ADD ADMIN] Total admins in database: ${admins.length}`)
        console.log('[ADD ADMIN] Admin list:')
        admins.forEach(admin => {
            console.log(`  - ID: ${admin.user_id}, Username: ${admin.username}, Name: ${admin.name}`)
        })

        await mongoose.connection.close()
        console.log('[ADD ADMIN] Database connection closed')
        process.exit(0)

    } catch (error) {
        console.error('[ADD ADMIN] ERROR:', error)
        process.exit(1)
    }
}

addAdmin()
