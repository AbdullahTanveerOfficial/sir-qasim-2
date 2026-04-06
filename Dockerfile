FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port (change if your app uses different port)
EXPOSE 5000

# Run app
CMD ["node", "index.js"]