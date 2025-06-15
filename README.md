# Planisa Teste – Execução com Docker

Este projeto possui dois diretórios principais:

- `teste-api`: API desenvolvida em Ruby on Rails.
- `teste-front`: Front-end em React com Vite.

Este `README.md` é focado na execução da **API com banco de dados PostgreSQL em Docker**, para facilitar testes locais sem necessidade de configurar Ruby, PostgreSQL ou Rails manualmente.

---

## Pré-requisitos

- Docker e Docker Compose instalados

---

## Subindo a aplicação com Docker

1. Clone o repositório:
```bash
git clone https://github.com/LucasTropardi/planisa-teste.git
cd planisa-teste
```

2. Suba os containers:
```bash
docker-compose up --build
```

Isso irá:
- Criar e iniciar um container com PostgreSQL (`postgres`)
- Criar e iniciar um container com a API Rails (`rails_api`)
- Rodar automaticamente as migrações (`db:prepare`)

A API estará acessível em: [http://localhost:3000](http://localhost:3000)

---

## Populando o banco (Seed)

Para inserir dados iniciais no banco (usuário admin e países), execute:

```bash
docker exec -it rails_api bundle exec rails db:seed
```

---

## Front-end (React)

O front-end **não está containerizado**.

Para rodar o front:

Assegure-se de possuir o Node instalado.
- [NodeJS](https://nodejs.org/pt)

1. Acesse a pasta `teste-front`
2. Caso não venha o .env no projeto clonado, copie o `.env.example` e configure o endpoint da API:
```bash
cp .env.example .env
```

Exemplo de conteúdo:
```
VITE_API_BASE_URL=http://localhost:3000
```

3. Instale as dependências e inicie o front:
```bash
npm install
npm run dev
```

---

## Testes locais manuais

Se quiser rodar a API Rails localmente (fora do Docker), basta garantir:

- Ruby 3.4.4 instalado
- Rails 8.0.2 instalado
- PostgreSQL local na porta 5432 (Ajustar dados para conexão no arquivo teste-api/config/database.yml)
- E rodar os comandos padrão em `teste-api`

---

## Considerações

- O usuário administrador inicial é "admin" com a senha "admin123", criado automaticamente via seeder.

- Um próximo passo importante seria adaptar melhor a interface para dispositivos móveis. A escolha por utilizar tabelas foi intencional, pois elas oferecem uma visualização clara, organizada e rica em informações no desktop — o que é ideal para comparações rápidas entre os dados. No entanto, em telas menores, o layout tabular pode comprometer a usabilidade. Por isso, uma adaptação para mobile seria bem-vinda, utilizando cards ou resumos compactos dos dados, mantendo a clareza sem comprometer a experiência. A navbar também poderia ser ajustada com um menu tipo hamburger, o que é uma mudança simples, mas que contribui muito para a navegabilidade em dispositivos móveis.

- Também considerei a possibilidade de implementar um tema escuro (dark mode), já que muitos usuários preferem essa opção. No entanto, diante da escolha entre tema visual e suporte à tradução, optei por priorizar a tradução, pois considero a comunicação mais essencial do que a aparência.

- A API pública utilizada fornece dados apenas para datas específicas. Por isso, implementei uma transação atômica no back-end, garantindo que, caso algum dos retornos da API seja nulo, nenhum dado parcial seja salvo no banco. Isso evita inconsistências, mas pode ser melhorado no futuro com tratamentos mais robustos ou tentativas alternativas.

Gravei um pequeno vídeo demonstrando o funcionamento básico do sistema. Ele está como "não listado" no YouTube, e pode ser acessado aqui:
https://www.youtube.com/watch?v=BJYVOf6X6C8
---
