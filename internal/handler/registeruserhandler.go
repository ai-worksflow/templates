package handler

import (
	"net/http"

	"example.com/go-gozero-template/internal/logic"
	"example.com/go-gozero-template/internal/svc"
	"example.com/go-gozero-template/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func registerUserHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.RegisterUserRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := logic.NewRegisterUserLogic(r.Context(), svcCtx)
		resp, err := l.RegisterUser(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}
		httpx.OkJsonCtx(r.Context(), w, resp)
	}
}
