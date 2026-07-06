package biz_test

import (
	"context"
	"testing"

	"example.com/go-kratos-template/internal/biz"
	"example.com/go-kratos-template/internal/data"
)

func TestRegisterUser(t *testing.T) {
	uc := biz.NewUserUsecase(data.NewMemoryUserRepo())
	user, err := uc.Register(context.Background(), "Demo@Example.com", "Demo")
	if err != nil {
		t.Fatal(err)
	}
	if user.Email != "demo@example.com" || user.ID == "" {
		t.Fatalf("unexpected user: %#v", user)
	}
}
