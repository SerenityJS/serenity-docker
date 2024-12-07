FROM debian:stable-slim

LABEL author="ReallyFatYoshi <github.com/ReallyFatYoshi>"
LABEL org.opencontainers.image.source="https://github.com/SerenityJS/docker"
LABEL org.opencontainers.image.description="SerenityJS docker image for debian."
LABEL org.opencontainers.image.licenses="MIT"

# Setting Default Environment Variables
ENV SERENITY_BRANCH="BETA"
ENV SERENITY_TEMPLATE="TYPESCRIPT"

# Install necessary packages and clean up in one layer
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create Serenity user and group
RUN groupadd -r serenity && \
    useradd -r -g serenity -m serenity && \
    mkdir /serenity && \
    chown serenity:serenity /serenity

# Expose UDP port
EXPOSE 19132/udp

# Set working directory to /serenity
WORKDIR /serenity

# Copy all files into /serenity
COPY . .

# Set ownership and permissions for entrypoint.sh
RUN chown serenity:serenity /serenity/entrypoint.sh && \
    chmod +x /serenity/entrypoint.sh

# Run setup script as Serenity user in /serenity directory
RUN chown -R serenity:serenity /serenity && \
    su serenity -c "node setup.js"

# Un-used necessary files
RUN rm -rf /serenity/setup.js /serenity/start.bat

# Switch to the Serenity user
USER serenity

# Set the entrypoint to run your application as Serenity from /serenity directory
ENTRYPOINT ["/bin/bash", "-c", "/serenity/entrypoint.sh"]
