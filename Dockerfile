# --- Stage 1: fetch the latest SerenityJS release asset ---
FROM debian:stable-slim AS fetch

ARG GH_REPO="SerenityJS/serenity"
ARG ASSET_NAME="serenityjs-ubuntu-latest.zip"

# Tools just for download/extract (not kept in final image)
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl unzip ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /tmp

# Download the latest release asset and extract the binary
# Note: the asset contains an executable named "serenityjs-latest"
RUN curl -fsSL -o serenityjs.zip "https://github.com/${GH_REPO}/releases/latest/download/${ASSET_NAME}" \
 && unzip serenityjs.zip \
 && install -m 0755 serenityjs-latest /serenityjs

# --- Stage 2: minimal runtime image ---
FROM debian:stable-slim

LABEL author="SerenityJS <github.com/SerenityJS>"
LABEL org.opencontainers.image.source="https://github.com/SerenityJS/docker"
LABEL org.opencontainers.image.description="SerenityJS docker image for debian."
LABEL org.opencontainers.image.licenses="MIT"

EXPOSE 19132/udp

# Put the binary in PATH
COPY --from=fetch /serenityjs /usr/local/bin/serenityjs

# Optional: workspace for server data
WORKDIR /data
VOLUME ["/data"]

ENTRYPOINT ["/usr/local/bin/serenityjs"]
