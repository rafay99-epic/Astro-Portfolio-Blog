# 
# Dockerfile for Astro Blog Website
#
# This Dockerfile is used to build the Astro blog website.
#   
# Author: Abdul Rafay
# Date: 2025-09-23
# Version: 1.0.0
#
# Info:
# This script is still under development and might not work as expected.
# Please report any issues to the author.
# And feel free to contribute to the project.

FROM oven/bun:1 AS base
WORKDIR /app

# Install system dependencies needed for native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first for better caching
COPY package.json bun.lock ./

FROM base AS build-deps
RUN bun install

FROM build-deps AS build
COPY . .
# Set build environment variables (you may need to add your specific env vars here)
ENV NODE_ENV=production
RUN bun run production_build

FROM base AS runtime
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Set runtime environment variables
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

# Expose the port
EXPOSE 4321

# Start the server
CMD ["bun", "./dist/server/entry.mjs"]

