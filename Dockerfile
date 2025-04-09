# Use Node.js base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]

