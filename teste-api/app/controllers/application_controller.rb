class ApplicationController < ActionController::API
  before_action :authorize_request

  attr_reader :current_user

  private

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    decoded = JwtService.decode(header)

    if decoded
      @current_user = User.find_by(id: decoded[:user_id])
      render json: { error: 'Usuário não autorizado' }, status: :unauthorized unless @current_user
    else
      render json: { error: 'Token inválido' }, status: :unauthorized
    end
  end

  def require_admin!
    render json: { error: 'Acesso restrito' }, status: :forbidden unless current_user&.role == 'admin'
  end
end
