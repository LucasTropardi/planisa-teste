require 'rails_helper'

RSpec.describe "Auth API", type: :request do
  let!(:user) { User.create!(nome: "Test", usuario: "testuser", password: "123456", password_confirmation: "123456", role: "user") }

  describe "POST /login" do
    it "retorna token com credenciais válidas" do
      post "/login", params: { usuario: "testuser", password: "123456" }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to include("token")
    end

    it "retorna erro com credenciais inválidas" do
      post "/login", params: { usuario: "testuser", password: "wrong" }
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
