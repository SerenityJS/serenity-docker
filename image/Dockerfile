FROM node:22.12.0-bookworm-slim

LABEL author="ReallyFatYoshi <github.com/ReallyFatYoshi>"
LABEL org.opencontainers.image.source="https://github.com/SerenityJS/docker"
LABEL org.opencontainers.image.description="SerenityJS docker image for debian."
LABEL org.opencontainers.image.licenses="MIT"

# Setting Default Environment Variables
ENV SERENITY_BRANCH="BETA"
ENV SERENITY_TEMPLATE="TYPESCRIPT"

# Expose UDP port
EXPOSE 19132/udp

# Set working directory to /serenity
WORKDIR /serenity

# Copy all files into /serenity
COPY . .

# Change permissions for entrypoint.sh
RUN chmod +x /serenity/entrypoint.sh

# Run setup script
RUN node setup.js

# Remove unnecessary files
RUN rm -rf /serenity/setup.js /serenity/start.bat

# Set the entrypoint to run your application as Serenity from /serenity directory
ENTRYPOINT ["/bin/sh", "-c", "/serenity/entrypoint.sh"]