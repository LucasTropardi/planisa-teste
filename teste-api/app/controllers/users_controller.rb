class UsersController < ApplicationController
  before_action :require_admin!, except: [:show]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    users = User.all
    render json: users
  end

  # GET /users/:id
  def show
    if @user == current_user || current_user.role == 'admin'
      render json: @user
    else
      render json: { error: 'Acesso negado' }, status: :forbidden
    end
  end

  # GET /me
  def me
    render json: current_user
  end

  # POST /users
  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /users/:id
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /users/:id
  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find_by(id: params[:id])
    return render json: { error: 'Usuário não encontrado' }, status: :not_found unless @user
  end

  def user_params
    params.require(:user).permit(:nome, :usuario, :password, :password_confirmation, :role)
  end
end
