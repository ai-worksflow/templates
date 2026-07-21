ARG GO_IMAGE=golang@sha256:ea341baa9bd5ba6784f6d7161ace70544349a6242d54d34a0fbfd2c4d51c9d58
ARG RUNTIME_IMAGE=alpine@sha256:d9e853e87e55526f6b2917df91a2115c36dd7c696a35be12163d44e6e2a4b6bc

FROM ${GO_IMAGE} AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags='-s -w' -o /out/server ./cmd/server

FROM ${RUNTIME_IMAGE}
RUN apk add --no-cache ca-certificates \
  && addgroup -S -g 10001 worksflow \
  && adduser -S -D -H -u 10001 -G worksflow worksflow
COPY --from=build /out/server /usr/local/bin/server
USER 10001:10001
EXPOSE 8000
ENV PORT=8000
ENTRYPOINT ["/usr/local/bin/server"]
