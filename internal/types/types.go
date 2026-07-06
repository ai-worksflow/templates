package types

type RegisterUserRequest struct {
	Email       string `json:"email"`
	DisplayName string `json:"display_name"`
}

type RegisterUserResponse struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
}

type HealthResponse struct {
	Status string `json:"status"`
}
