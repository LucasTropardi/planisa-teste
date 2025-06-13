Rails.application.routes.draw do

  get "up" => "rails/health#show", as: :rails_health_check

  post '/login', to: 'auth#login'

  get '/me', to: 'users#me'

  get "/countries", to: "countries#index"

  resources :users, only: [:index, :show, :create, :update, :destroy]

  resources :comparisons, only: [:create, :index, :show, :destroy]

end
