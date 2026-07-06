.PHONY: tidy test dev build

tidy:
	go mod tidy

test:
	go test ./...

dev:
	go run ./cmd/server

build:
	go build -o bin/server ./cmd/server
