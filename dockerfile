ARG PORT=3333
FROM node:16-alpine AS builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package.lock files to the working directory
COPY package*.json ./

# Cleanup the working directory
RUN rm -rf node_modules package-lock.json

# Install all dependencies
RUN npm install && npm rebuild

# Copy the rest of the code to the working directory
COPY . .

# Invoke the build script to transpile ts code to js
RUN npx nx build rogor

# Open the desired port
EXPOSE ${PORT}

# Run the development server
ENTRYPOINT [ "npm", "start" ]

# Final stage
FROM node:16-alpine AS final

# Set the node environment to production
ENV NODE_ENV production

# Switch to the user node
USER node

# Prepare the destination directory and ensure the user node owns it
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

# Set the working directory to /home/node/app
WORKDIR /home/node/app

# Copy the package.json and npm.lock files to the working directory
COPY --chown=node:node package*.json ./

# Install libraries as the user node
RUN npm install --only-production

# Copy the js files from the builder stage and change the ownership to the user node
COPY --chown=node:node --from=builder /app/dist ./dist

# Open the desired port
EXPOSE ${PORT}

# Use PM2 - Node process manager to run the application as stated in the config file
ENTRYPOINT ["node", "./dist/apps/api/rogor/main.js"]
