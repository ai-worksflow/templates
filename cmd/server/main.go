package main

import (
	"context"
	"log"

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
	httpServer := server.NewHTTPServer(":8000", identity)

	app := kratos.New(
		kratos.Name("go-kratos-template"),
		kratos.Server(httpServer),
	)

	if err := app.Run(); err != nil && err != context.Canceled {
		log.Fatal(err)
	}
}
