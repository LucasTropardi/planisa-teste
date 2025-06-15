require 'rails_helper'

describe 'Users API', type: :request do
  let(:admin) { User.create!(nome: 'Admin', usuario: 'admin_test', password: '123456', role: 'admin') }
  let(:user)  { User.create!(nome: 'User', usuario: 'user', password: '123456', role: 'user') }
  let(:admin_headers) { { 'Authorization' => "Bearer #{JwtService.encode(user_id: admin.id, role: admin.role)}" } }
  let(:user_headers)  { { 'Authorization' => "Bearer #{JwtService.encode(user_id: user.id, role: user.role)}" } }

  describe 'GET /users' do
    it 'permite que admin veja todos os usuários' do
      get '/users', headers: admin_headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to be_an(Array)
    end

    it 'impede que user veja todos os usuários' do
      get '/users', headers: user_headers
      expect(response).to have_http_status(:forbidden)
    end
  end

  describe 'GET /users/:id' do
    it 'permite que o próprio user veja seus dados' do
      get "/users/#{user.id}", headers: user_headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['usuario']).to eq('user')
    end

    it 'permite que o admin veja qualquer usuário' do
      get "/users/#{user.id}", headers: admin_headers
      expect(response).to have_http_status(:ok)
    end

    it 'impede que um user veja outro user' do
      another_user = User.create!(nome: 'Another', usuario: 'another', password: '123456', role: 'user')
      token = JwtService.encode(user_id: another_user.id, role: 'user')
      headers = { 'Authorization' => "Bearer #{token}" }

      get "/users/#{user.id}", headers: headers
      expect(response).to have_http_status(:forbidden)
    end
  end

  describe 'POST /users' do
    it 'permite que o admin crie um novo usuário' do
      payload = {
        user: {
          nome: 'Novo Usuário',
          usuario: 'novo_usuario',
          password: '123456',
          password_confirmation: '123456',
          role: 'user'
        }
      }
      post '/users', params: payload, headers: admin_headers
      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)['usuario']).to eq('novo_usuario')
    end

    it 'impede que um user comum crie outro usuário' do
      post '/users', params: { user: { nome: 'X', usuario: 'x', password: '123', password_confirmation: '123', role: 'user' } }, headers: user_headers
      expect(response).to have_http_status(:forbidden)
    end
  end

  describe 'PUT /users/:id' do
    it 'permite que o próprio user atualize seu nome' do
      patch "/users/#{user.id}", params: { user: { nome: 'Novo Nome' } }, headers: user_headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['nome']).to eq('Novo Nome')
    end

    it 'impede que um user altere sua role' do
      patch "/users/#{user.id}", params: { user: { role: 'admin' } }, headers: user_headers
      expect(JSON.parse(response.body)['role']).not_to eq('admin')
    end
  end

  describe 'DELETE /users/:id' do
    it 'permite que admin exclua um usuário' do
      delete "/users/#{user.id}", headers: admin_headers
      expect(response).to have_http_status(:no_content)
    end

    it 'impede que user exclua alguém' do
      delete "/users/#{admin.id}", headers: user_headers
      expect(response).to have_http_status(:forbidden)
    end
  end

  describe 'GET /me' do
    it 'retorna os dados do usuário logado' do
      get '/me', headers: user_headers
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['usuario']).to eq('user')
    end
  end
end
