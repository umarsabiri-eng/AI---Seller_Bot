# Docker Deployment Guide

This guide explains how to deploy the Telegram Menu Bot using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)
- Your Telegram Bot Token

## Configuration

1. **Update the `.env` file** with your Telegram Bot Token:
   ```env
   BOT_TOKEN=your_actual_telegram_bot_token
   DB_URI=mongodb://mongo:rm5fem8gjys7nlvi@107.172.58.34:27017/menubot
   ```

## Deployment Options

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

### Option 2: Using Docker CLI

```bash
# Build the image
docker build -t telegram-menu-bot .

# Run the container
docker run -d \
  --name telegram-menu-bot \
  --restart unless-stopped \
  -e BOT_TOKEN="your_telegram_bot_token" \
  -e DB_URI="mongodb://mongo:rm5fem8gjys7nlvi@107.172.58.34:27017/menubot" \
  -v $(pwd)/image:/app/image:ro \
  telegram-menu-bot

# View logs
docker logs -f telegram-menu-bot

# Stop the container
docker stop telegram-menu-bot

# Remove the container
docker rm telegram-menu-bot
```

## Useful Commands

```bash
# Check container status
docker ps

# Access container shell
docker exec -it telegram-menu-bot sh

# View real-time logs
docker logs -f telegram-menu-bot

# Restart container
docker restart telegram-menu-bot

# Check container resource usage
docker stats telegram-menu-bot
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BOT_TOKEN` | Your Telegram Bot Token from @BotFather | Yes |
| `DB_URI` | MongoDB connection string | Yes |
| `NODE_ENV` | Node environment (production/development) | No |

## Troubleshooting

### Bot not responding
1. Check if the container is running: `docker ps`
2. View logs: `docker logs telegram-menu-bot`
3. Verify BOT_TOKEN is correct
4. Check MongoDB connection

### Container keeps restarting
1. Check logs: `docker logs telegram-menu-bot`
2. Verify all environment variables are set correctly
3. Ensure MongoDB is accessible

### Image files not found
- Make sure the `image` directory exists and contains all required files
- Volume mount is correct in docker-compose.yml

## Production Deployment

For production deployment on a server:

1. Use a reverse proxy (nginx) if using webhooks
2. Set up proper logging and monitoring
3. Use Docker secrets for sensitive data
4. Enable automatic restarts with `--restart unless-stopped`
5. Set up backup strategies for any persistent data

## Notes

- The bot uses **polling mode** by default (bot.launch())
- MongoDB is hosted externally (not in Docker)
- Images are mounted read-only for security
- Container runs as non-root user for better security

