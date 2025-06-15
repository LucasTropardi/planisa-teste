FROM ruby:3.4.4-bullseye

# Instala dependências do sistema
RUN apt-get update -qq && apt-get install -y --no-install-recommends \
  build-essential \
  libpq-dev \
  nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Define diretório da aplicação
WORKDIR /app

# Copia os arquivos da aplicação
COPY . .

# Instala gems
RUN bundle install

# Expõe a porta do Rails
EXPOSE 3000

# Comando de inicialização
CMD ["bash", "-c", "bundle exec rails db:migrate && bundle exec rails server -b 0.0.0.0"]
