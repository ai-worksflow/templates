package server

import (
	"github.com/go-kratos/kratos/v3/middleware/logging"
	"github.com/go-kratos/kratos/v3/middleware/ratelimit"
	"github.com/go-kratos/kratos/v3/middleware/recovery"
	khttp "github.com/go-kratos/kratos/v3/transport/http"

	"example.com/go-kratos-template/internal/service"
)

func NewHTTPServer(addr string, identity *service.IdentityService) *khttp.Server {
	server := khttp.NewServer(
		khttp.Address(addr),
		khttp.Middleware(
			recovery.Recovery(),
			logging.Server(nil),
			ratelimit.Server(),
		),
	)

	route := server.Route("/")
	route.GET("/healthz", func(ctx khttp.Context) error {
		return ctx.JSON(200, map[string]string{"status": "ok"})
	})
	route.POST("/identity/users", func(ctx khttp.Context) error {
		var req service.RegisterUserRequest
		if err := ctx.Bind(&req); err != nil {
			return err
		}
		resp, err := identity.RegisterUser(ctx, req)
		if err != nil {
			return err
		}
		return ctx.JSON(201, resp)
	})

	return server
}
