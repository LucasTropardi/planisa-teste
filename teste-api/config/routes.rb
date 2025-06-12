Rails.application.routes.draw do

  get "up" => "rails/health#show", as: :rails_health_check

  post '/login', to: 'auth#login'

  get '/me', to: 'users#me'

  resources :users, only: [:index, :show, :create, :update, :destroy]

  get "/countries", to: "countries#index"

end
