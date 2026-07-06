package logic

import (
	"context"
	"errors"
	"fmt"
	"time"

	"example.com/go-gozero-template/internal/domain/identity"
	"example.com/go-gozero-template/internal/svc"
	"example.com/go-gozero-template/internal/types"
	"github.com/zeromicro/go-zero/core/logx"
)

var ErrUserAlreadyExists = errors.New("user already exists")

type RegisterUserLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewRegisterUserLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RegisterUserLogic {
	return &RegisterUserLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RegisterUserLogic) RegisterUser(req *types.RegisterUserRequest) (*types.RegisterUserResponse, error) {
	if _, exists, err := l.svcCtx.Users.FindByEmail(l.ctx, req.Email); err != nil {
		return nil, err
	} else if exists {
		return nil, ErrUserAlreadyExists
	}

	user, err := identity.NewUser(fmt.Sprintf("usr_%d", time.Now().UnixNano()), req.Email, req.DisplayName, time.Now())
	if err != nil {
		return nil, err
	}
	if err := l.svcCtx.Users.Save(l.ctx, user); err != nil {
		return nil, err
	}
	return &types.RegisterUserResponse{UserID: user.ID, Email: user.Email}, nil
}
