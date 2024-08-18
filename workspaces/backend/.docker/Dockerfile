## Development stage
FROM node:20.16.0-alpine AS builder

# Copy package.json and yarn.lock (if available)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the source code
COPY . .

# build
RUN yarn build

FROM node:20.16.0-alpine AS node_modules

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

# Production Stage
FROM node:20.16.0-alpine

# Set the working directory inside the container
WORKDIR /app

ENV NODE_ENV=production

# Copy bundle build
COPY --from=node_modules node_modules ./node_modules
COPY --from=builder package.json ./
COPY --from=builder dist ./dist
