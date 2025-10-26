# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Telegram Bot** for selling online English courses, built with Node.js, Telegraf, and MongoDB. The bot handles course selection, payment processing via screenshot verification, admin approval workflows, and FAQ responses. The UI is in Tajik language.

## Development Commands

### Running the Bot

**Development (with auto-reload):**
```bash
npm run dev
```

**Production (direct):**
```bash
node app.js
```

**Docker (recommended for production):**
```bash
# Start service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop service
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

### Environment Variables Required

Create a `.env` file or set environment variables:
```env
BOT_TOKEN=your_telegram_bot_token
DB_URI=mongodb://user:pass@host:port/database?authSource=admin
ADMIN_PASSWORD=your_admin_password
NODE_ENV=production
```

## Architecture Overview

### MVC-like Pattern with Scene-based State Management

**Request Flow:**
```
Telegram User Input → app.js (Main handler) → Controllers → [Optional Scenes] → Models → Response
```

**Directory Structure:**
- `app.js` - Main entry point (174 lines): initializes bot, registers all handlers, connects MongoDB
- `controller/` - 19 handler files for buttons/commands (text-based, action-based, command-based)
- `scene/` - Telegraf wizard scenes for complex multi-step flows (admin authentication, payment processing)
- `model/` - Mongoose schemas (User model with role-based access)
- `menu/` - Keyboard layout definitions
- `image/` - Media assets (~43MB: photos, videos for course promotion)

### Key Architectural Patterns

1. **Command Pattern**: Each button/command has a dedicated handler file in `controller/`
2. **Scene Pattern**: Multi-step flows use Telegraf's wizard scenes (`admin.js`, `buy.js`)
3. **Controller Pattern**: Business logic separated into controller files
4. **Singleton Pattern**: Single bot instance throughout the application

### Handler Types in app.js

- `bot.command()` - Command handlers (e.g., `/start`, `/makeadmin`)
- `bot.hears()` - Text-based handlers (e.g., button text like "🛍️ХАРИДАНИ ЧАЙКА🛍️")
- `bot.action()` - Inline button callback handlers (e.g., `btn1`, `course1`, `allow_*`, `reject_*`)

## Critical Workflows

### Course Purchase Flow
1. User selects course → `button1.js` shows course options
2. User clicks course button → `btn1_action.js`, `btn2_action.js`, or `btn3_action.js` shows details
3. User clicks purchase → Enters `buy` scene (2-step wizard)
4. User uploads payment screenshot → Photo sent to all admins
5. Admin clicks approve/reject → User receives confirmation

### Admin Authentication
1. User sends `/makeadmin` command → Enters `admin` scene
2. Bot prompts for password → User enters password
3. Bot validates password → Updates user role to 'admin' in database

### User Registration
1. User sends `/start` → `startButton.js` triggered
2. Handler checks if user exists in database
3. If new user: creates User document with role='user'
4. Shows main menu keyboard

## Database Schema

### User Model (`model/user.js`)
```javascript
{
  user_id: Number,      // Telegram user ID
  name: String,         // User's name
  username: String,     // Telegram username
  role: String,         // 'user' or 'admin'
  createdAt: Date,
  updatedAt: Date
}
```

**Connection:** External MongoDB (not containerized). Uses Mongoose ODM with `authSource: 'admin'`.

## Adding New Features

### Adding a New Button Handler

1. Create new file in `controller/` (e.g., `button15.js`)
2. Export handler function:
```javascript
module.exports = async (ctx) => {
  try {
    await ctx.replyWithPhoto({ source: './image/your_image.jpg' }, {
      caption: 'Your message text',
      protect_content: true
    });
  } catch (error) {
    console.log(error);
  }
};
```
3. Register in `app.js`:
```javascript
const button15 = require('./controller/button15');
bot.hears('Button Text', button15);
```

### Adding a New Scene

1. Create scene file in `scene/` directory
2. Import Scenes and WizardScene from Telegraf:
```javascript
const { Scenes, Markup } = require('telegraf');

const yourScene = new Scenes.WizardScene(
  'scene_name',
  async (ctx) => { /* Step 1 logic */ },
  async (ctx) => { /* Step 2 logic */ }
);

module.exports = yourScene;
```
3. Register scene in `app.js`:
```javascript
const yourScene = require('./scene/yourScene');
const stage = new Scenes.Stage([adminScene, buyScene, yourScene]);
```
4. Enter scene with: `ctx.scene.enter('scene_name')`

### Adding Media Assets

- Place files in `image/` directory
- Reference in code: `{ source: './image/filename.jpg' }`
- For Docker: ensure volume mount is configured (`./image:/app/image:ro`)

## Code Conventions

- **File naming**: kebab-case (e.g., `button1.js`, `btn1_action.js`)
- **Export style**: `module.exports = async (ctx) => { ... }`
- **Error handling**: Try-catch blocks with `console.log(error)`
- **Database operations**: Always use async/await with Mongoose
- **Media delivery**: Use `fs` module for file reads
- **Session data**: Store temp data in `ctx.session` (available in scenes)
- **Message protection**: Add `protect_content: true` to prevent forwarding
- **Cancellation keywords**: Use `restartString.js` for scene exit triggers

## Common Issues & Solutions

### Bot Not Responding
- Check `BOT_TOKEN` environment variable is set correctly
- Verify MongoDB connection string in `DB_URI`
- Ensure polling mode is active (check `bot.launch()` in app.js)

### Scene Navigation Stuck
- Users can exit scenes by sending keywords from `restartString.js` (e.g., "БЕКОР", "CANCEL")
- Check `ctx.scene.leave()` is called after scene completion

### Admin Approval Not Working
- Verify admin role in database: `db.users.find({ role: 'admin' })`
- Check admin password matches `ADMIN_PASSWORD` environment variable (see `note.txt`)
- Ensure `allow_*` and `reject_*` action handlers are registered in app.js

### Images Not Loading
- Confirm image file exists in `image/` directory (case-sensitive)
- Check file permissions (Docker: must be readable by nodejs user)
- Verify volume mount in docker-compose.yml: `./image:/app/image:ro`

## Docker Deployment Notes

- **Base image**: node:18-alpine (lightweight, secure)
- **Security**: Runs as non-root user (nodejs:1001)
- **Health check**: Optional HTTP check on port 3000 (not currently used by bot)
- **Volume**: Media files mounted read-only to prevent modification
- **Restart policy**: `unless-stopped` ensures bot stays running

## Testing

**Current Status**: No tests implemented.

To add testing:
1. Install test framework: `npm install --save-dev jest` or `npm install --save-dev mocha chai`
2. Create `__tests__/` directory or `*.test.js` files
3. Update `package.json` test script
4. Mock Telegraf bot context for unit tests

## Limitations & Known Issues

- No webhook support (polling mode only)
- No logging framework (console.log only)
- Secrets stored in `note.txt` (should use secure secret management)
- No input validation on payment screenshots
- No automated testing or CI/CD pipeline
- No rate limiting or anti-spam measures
