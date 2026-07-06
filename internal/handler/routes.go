package handler

import (
	"net/http"

	"example.com/go-gozero-template/internal/svc"
	"github.com/zeromicro/go-zero/rest"
)

func RegisterHandlers(server *rest.Server, serverCtx *svc.ServiceContext) {
	server.AddRoutes([]rest.Route{
		{Method: http.MethodGet, Path: "/healthz", Handler: healthHandler()},
		{Method: http.MethodPost, Path: "/identity/users", Handler: registerUserHandler(serverCtx)},
	})
}
