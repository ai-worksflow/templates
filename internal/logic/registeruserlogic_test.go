package logic

import (
	"context"
	"testing"

	"example.com/go-gozero-template/internal/config"
	"example.com/go-gozero-template/internal/svc"
	"example.com/go-gozero-template/internal/types"
)

func TestRegisterUser(t *testing.T) {
	ctx := svc.NewServiceContext(config.Config{})
	logic := NewRegisterUserLogic(context.Background(), ctx)

	resp, err := logic.RegisterUser(&types.RegisterUserRequest{Email: "Demo@Example.com", DisplayName: "Demo"})
	if err != nil {
		t.Fatal(err)
	}
	if resp.Email != "demo@example.com" || resp.UserID == "" {
		t.Fatalf("unexpected response: %#v", resp)
	}
}
