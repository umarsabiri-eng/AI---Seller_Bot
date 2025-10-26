# Use official Node.js LTS (Long Term Support) image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set environment variables
ENV BOT_TOKEN=6891176898:AAFrOpOr92HAk8yRVJkWxmbllSwpEs2IazE
ENV DB_URI=mongodb://mongo:rm5fem8gjys7nlvi@107.172.58.34:27017/menubot?authSource=admin
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port (if using webhooks instead of polling)
EXPOSE 3000

# Health check (optional - checks if the process is running)
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start the application
CMD ["node", "app.js"]

