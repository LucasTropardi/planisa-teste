require 'rails_helper'

RSpec.describe "Comparisons API", type: :request do
  let!(:admin) { User.create!(nome: "Admin", usuario: "admin_teste", password: "123456", password_confirmation: "123456", role: "admin") }
  let!(:user) { User.create!(nome: "User", usuario: "user_teste", password: "123456", password_confirmation: "123456", role: "user") }
  let!(:headers_admin) { { 'Authorization' => "Bearer #{JwtService.encode(user_id: admin.id, role: admin.role)}" } }
  let!(:headers_user) { { 'Authorization' => "Bearer #{JwtService.encode(user_id: user.id, role: user.role)}" } }

  let!(:country1) { Country.find_or_create_by!(iso: "BRA") { |c| c.name = "Brasil" } }
  let!(:country2) { Country.find_or_create_by!(iso: "USA") { |c| c.name = "Estados Unidos" } }

  describe "POST /comparisons" do
    it "cria uma comparação com sucesso" do
      post "/comparisons", params: {
        comparison: {
          name: "BRA vs USA",
          country1_iso: "BRA",
          country2_iso: "USA",
          start_date: "2022-01-01",
          end_date: "2022-01-10"
        }
      }, headers: headers_user

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["name"]).to eq("BRA vs USA")
      expect(json["results"].length).to eq(4)
    end

    it "retorna erro se dados forem inválidos" do
      post "/comparisons", params: {
        comparison: {
          name: "",
          country1_iso: "",
          country2_iso: "",
          start_date: "",
          end_date: ""
        }
      }, headers: headers_user

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "GET /comparisons" do
    it "retorna todas as comparações" do
      get "/comparisons", headers: headers_user
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /comparisons/:id" do
    let!(:comparison) do
      Comparison.create!(
        name: "Teste",
        country1_iso: "BRA",
        country2_iso: "USA",
        start_date: "2022-01-01",
        end_date: "2022-01-10"
      )
    end

    it "retorna uma comparação existente" do
      get "/comparisons/#{comparison.id}", headers: headers_user
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["name"]).to eq("Teste")
    end

    it "retorna erro se não existir" do
      get "/comparisons/99999", headers: headers_user
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "DELETE /comparisons/:id" do
    let!(:comparison) {
      Comparison.create!(
        name: "To Delete",
        country1_iso: "BRA",
        country2_iso: "USA",
        start_date: "2022-01-01",
        end_date: "2022-01-10"
      )
    }

    it "permite admin excluir comparação" do
      delete "/comparisons/#{comparison.id}", headers: headers_admin
      expect(response).to have_http_status(:ok)
    end

    it "impede user comum de excluir" do
      delete "/comparisons/#{comparison.id}", headers: headers_user
      expect(response).to have_http_status(:forbidden)
    end

    it "retorna erro se comparação não existir" do
      delete "/comparisons/99999", headers: headers_admin
      expect(response).to have_http_status(:not_found)
    end
  end
end
