package service

import (
	"context"

	"example.com/go-kratos-template/internal/biz"
)

type IdentityService struct {
	users *biz.UserUsecase
}

func NewIdentityService(users *biz.UserUsecase) *IdentityService {
	return &IdentityService{users: users}
}

type RegisterUserRequest struct {
	Email       string `json:"email"`
	DisplayName string `json:"display_name"`
}

type RegisterUserResponse struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
}

func (s *IdentityService) RegisterUser(ctx context.Context, req RegisterUserRequest) (RegisterUserResponse, error) {
	user, err := s.users.Register(ctx, req.Email, req.DisplayName)
	if err != nil {
		return RegisterUserResponse{}, err
	}
	return RegisterUserResponse{UserID: user.ID, Email: user.Email}, nil
}
