FROM debian:stable-slim

LABEL author="ReallyFatYoshi <github.com/ReallyFatYoshi>"
LABEL org.opencontainers.image.source="https://github.com/SerenityJS/docker"
LABEL org.opencontainers.image.description="SerenityJS docker image for debian."
LABEL org.opencontainers.image.licenses="MIT"

# Install necessary packages and clean up in one layer
RUN apt-get update && \
    apt-get install -y wget nodejs npm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 19132/udp

WORKDIR /root

COPY entrypoint.sh .

# Download SerenityJS executable and make it executable
RUN wget -O serenityjs-linux "https://github.com/SerenityJS/executable/releases/latest/download/serenityjs-linux" && \
    chmod +x serenityjs-linux

# Create /data directory and symbolic links
RUN mkdir /data && \
    ln -s /data/server.properties /root/server.properties && \
    ln -s /data/permissions.json /root/permissions.json

ENTRYPOINT ["/bin/bash", "-c", "/root/entrypoint.sh"]
