## Development stage
FROM node:20.16.0-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock (if available)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the source code
COPY . .

# build
RUN yarn build

RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile

# Production Stage
FROM node:20.16.0-alpine

RUN apk add --no-cache tini

# Set the working directory inside the container
WORKDIR /app

ENV NODE_ENV=production

# Copy bundle build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
