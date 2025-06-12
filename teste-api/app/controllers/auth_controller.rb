class AuthController < ApplicationController
  skip_before_action :authorize_request

  def login
    user = User.find_by(usuario: params[:usuario])
    if user&.authenticate(params[:password])
      token = JwtService.encode(user_id: user.id, role: user.role)
      render json: { token: token }, status: :ok
    else
      render json: { error: 'Usuário ou senha inválidos' }, status: :unauthorized
    end
  end
end
