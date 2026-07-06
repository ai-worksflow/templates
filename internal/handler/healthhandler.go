package handler

import (
	"net/http"

	"example.com/go-gozero-template/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func healthHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		httpx.OkJsonCtx(r.Context(), w, types.HealthResponse{Status: "ok"})
	}
}
