.PHONY: tidy test dev build

tidy:
	go mod tidy

test:
	go test ./...

dev:
	go run . -f etc/backend.yaml

build:
	go build -o bin/backend-api .
