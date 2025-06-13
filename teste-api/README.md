
# API de Comparações COVID-19 (Rails + PostgreSQL)

Este projeto é uma API RESTful desenvolvida com **Ruby on Rails** e **PostgreSQL** que permite realizar comparações entre países utilizando dados de COVID-19 de uma API pública. É possível autenticar usuários, cadastrar comparações e obter variações de casos, mortes, recuperações e taxa de letalidade entre dois países em um intervalo de datas.

---

## Como configurar o ambiente local

### 1. Pré-requisitos

- [Ruby 3.2+](https://www.ruby-lang.org/pt/documentation/installation/)
- [Rails 8+](https://rubyonrails.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Bundler](https://bundler.io/)

### 2. Clonar o projeto

```bash
git clone <repositorio_no_github>
cd teste-api
```

### 3. Instalar as dependências

```bash
bundle install
```

### 4. Configurar o banco de dados

Crie o banco e rode as migrations:

```bash
rails db:create db:migrate db:seed
```

### 5. Iniciar o servidor

```bash
rails server
```

A API estará disponível em `http://localhost:3000`.

---

## Autenticação

- A autenticação é feita via **JWT**.
- Faça login para obter um token usando o endpoint `/login`.
- Use o token no header das requisições protegidas:

```
Authorization: Bearer <seu_token>
```

---

## Endpoints disponíveis

### Público (sem autenticação)

| Método | Rota     | Ação                       |
|--------|----------|----------------------------|
| POST   | /login   | Retorna token JWT          |

---

### Acesso: usuário logado (user ou admin)

| Método | Rota         | Ação                                 |
|--------|--------------|--------------------------------------|
| GET    | /me          | Dados do usuário autenticado         |
| GET    | /countries   | Lista de países                      |
| GET    | /comparisons | Lista de comparações existentes      |
| GET    | /comparisons/:id | Detalhes de uma comparação     |
| POST   | /comparisons | Cria nova comparação e calcula dados |

---

### Acesso: apenas admin

| Método | Rota             | Ação                       |
|--------|------------------|----------------------------|
| GET    | /users           | Lista todos os usuários    |
| GET    | /users/:id       | Detalhes de um usuário     |
| POST   | /users           | Cria novo usuário          |
| PUT    | /users/:id       | Atualiza usuário           |
| DELETE | /users/:id       | Remove usuário             |
| DELETE | /comparisons/:id | Remove uma comparação      |

---

## Lógica de comparação

Ao criar uma comparação via `POST /comparisons`, o sistema:

1. Recebe os parâmetros: `nome`, `país 1`, `país 2`, `data inicial` e `data final`.
2. Consulta a API pública [`covid-api.com`](https://covid-api.com/api/reports/total) para cada país nas duas datas.
3. Salva os 4 registros no banco (`results`) com os dados brutos retornados.
4. Calcula as seguintes **variações percentuais** entre os países (sempre na **data final**):

- `confirmed_variation`: variação de casos confirmados
- `deaths_variation`: variação de mortes
- `recovered_variation`: variação de recuperados
- `fatality_variation`: diferença da taxa de letalidade

Também calcula um campo **`trend_index`** com valor:

- `1`: tendência de piora
- `0`: estável
- `-1`: tendência de melhora

---

## Exemplo de requisição para criar uma comparação

```http
POST /comparisons
Authorization: Bearer <token>

{
  "comparison": {
    "name": "BRA vs USA - Jan 2022",
    "country1_iso": "BRA",
    "country2_iso": "USA",
    "start_date": "2022-01-01",
    "end_date": "2022-01-30"
  }
}
```

---

## Organização do projeto

- `app/controllers`: lógica dos endpoints
- `app/models`: entidades Comparison, Result, User, Country
- `app/services`: lógica de integração com a API e cálculo
- `db/seeds.rb`: cria países e admin inicial

---
