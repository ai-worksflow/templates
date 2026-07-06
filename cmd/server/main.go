package main

import (
	"context"
	"log"
	"os"

	"github.com/go-kratos/kratos/v3"

	"example.com/go-kratos-template/internal/biz"
	"example.com/go-kratos-template/internal/data"
	"example.com/go-kratos-template/internal/server"
	"example.com/go-kratos-template/internal/service"
)

func main() {
	repo := data.NewMemoryUserRepo()
	usecase := biz.NewUserUsecase(repo)
	identity := service.NewIdentityService(usecase)
	httpServer := server.NewHTTPServer(httpAddr(), identity)

	app := kratos.New(
		kratos.Name("go-kratos-template"),
		kratos.Server(httpServer),
	)

	if err := app.Run(); err != nil && err != context.Canceled {
		log.Fatal(err)
	}
}

func httpAddr() string {
	if addr := os.Getenv("HTTP_ADDR"); addr != "" {
		return addr
	}
	if port := os.Getenv("PORT"); port != "" {
		return ":" + port
	}
	return ":8000"
}
