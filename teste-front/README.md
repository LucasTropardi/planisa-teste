# Front-end do Sistema CovidAnalytics

Este é o front-end da aplicação **CovidAnalytics**, um sistema web para comparação de dados da pandemia de COVID-19 entre países. O projeto foi desenvolvido com **React + TypeScript** e utiliza gráficos interativos, autenticação JWT e comunicação com uma API Rails para gerenciamento de benchmarks.

## Funcionalidades

- Tela de login protegida com autenticação JWT e escolha do idioma da aplicação
- Página inicial com explicação do sistema
- Listagem e criação de comparações entre países
- Visualização de gráficos comparativos (casos, mortes e taxa de letalidade)
- Página de usuários com gestão de roles (apenas para administradores)
- Navbar dinâmica com nome do usuário e opções conforme perfil
- Atualização de dados do próprio usuário (nome, usuário e senha)
- Estilização com Tailwind CSS e Material UI (MUI)

## Tecnologias utilizadas

- **React 19** com **TypeScript**
- **Vite** para build e dev server
- **Tailwind CSS** para estilização
- **Material UI (MUI)** para componentes
- **React Router DOM** para rotas
- **Recharts** para gráficos
- **JWT** para autenticação
- **Fetch** encapsulado no arquivo `api.ts`

## Estrutura de Pastas

- `src/`
  - `auth/`: contexto e serviços de autenticação
  - `components/`: componentes reutilizáveis (Navbar, Diálogos)
  - `pages/`: páginas principais da aplicação (Login, Home, Comparisons, Users)
  - `routes/`: proteções para rotas autenticadas e rotas para administrador
  - `services/`: serviços de comunicação com a API
  - `types/`: tipos e interfaces TypeScript
  - `utils/`: utilitários, como formatadores de data

## Instalação e execução

1. Clonar o projeto:

```bash
git clone <repositorio_frontend>
cd teste-front
```

2. Instalar dependências:

```bash
npm install
```

3. Executar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`.

## Configuração de ambiente

O projeto está configurado para se comunicar com a API backend em `http://localhost:3000`. Essa URL está definida no arquivo `.env`. Caso a API esteja hospedada em outro endereço, altere essa URL conforme necessário.

## Observações

- Para acessar qualquer rota protegida, é necessário fazer login previamente.
- O token JWT é armazenado no `localStorage` e enviado automaticamente nas requisições através do `api.ts`.
- Usuários com perfil `admin` têm acesso à gestão de usuários e exclusão de benchmarks.
