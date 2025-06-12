Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # permite qualquer origem (somente porque o projeto é um teste em ambiente de desenvolvimento)

    resource '*',
      headers: :any,
      methods: %i[get post put patch delete options head],
      expose: ['Authorization']
  end
end
