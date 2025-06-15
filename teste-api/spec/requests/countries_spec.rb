require 'rails_helper'

describe "GET /countries", type: :request do
  let(:user) { User.create!(nome: "Usuário", usuario: "user1", password: "123456", role: "user") }

  it "retorna a lista de países para usuários autenticados" do
    token = JwtService.encode(user_id: user.id, role: user.role)

    get "/countries", headers: { Authorization: "Bearer #{token}" }

    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)).to be_an(Array)
  end

  it "nega acesso sem token" do
    get "/countries"

    expect(response).to have_http_status(:unauthorized)
  end
end