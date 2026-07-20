FROM node:22-bookworm-slim@sha256:6c74791e557ce11fc957704f6d4fe134a7bc8d6f5ca4403205b2966bd488f6b3 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM busybox:1.37.0-musl@sha256:222ad6d973c0d198014546a65cd02c5fdedcc172123c5b4c2bf0af636550bd94

COPY --from=build --chown=65534:65534 /app/dist /www
USER 65534:65534
EXPOSE 4173
CMD ["httpd", "-f", "-p", "4173", "-h", "/www"]
