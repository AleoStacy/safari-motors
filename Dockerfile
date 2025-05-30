FROM node:18-alpine

# Installing dependencies for node-gyp and PostgreSQL client
RUN apk add --no-cache python3 make g++ postgresql-client

WORKDIR /app

# Copy only the Strapi backend folder
COPY my-strapi-project ./

# Install dependencies including PostgreSQL driver
RUN npm install pg --save && npm install

# Build the Strapi application
RUN npm run build

# Set environment to production
ENV NODE_ENV=production

# Expose the port Strapi will run on
EXPOSE 1337

# Start script to seed the DB before running Strapi
CMD ["sh", "-c", "npm run seed:example && npm run start"]
