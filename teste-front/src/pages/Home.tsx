import { Typography, Box, Paper, Link, Divider } from "@mui/material";
import { useEffect } from "react";

export function Home() {
  
  useEffect(() => {
    document.title = "CovidAnalytics - Home";
  }, []);

  return (
    <Box className="p-6">
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao CovidAnalytics - Comparações COVID-19
      </Typography>

      <Typography variant="body1" paragraph>
        Esta aplicação permite comparar dados de COVID-19 entre dois países, utilizando os dados da API pública disponível em:
        <Link
          href="https://covid-api.com/api"
          target="_blank"
          rel="noopener"
          underline="hover"
        > https://covid-api.com/api
        </Link>.
      </Typography>

      <Divider className="my-4" />

      <Typography variant="h5" gutterBottom>
        Endpoints da API (Ruby on Rails)
      </Typography>

      <Typography variant="body1">
        A autenticação é feita via JWT. Para obter um token, envie uma requisição para:
      </Typography>

      <Paper className="p-4 my-2" variant="outlined">
        <Typography variant="subtitle2">POST /login</Typography>
        <pre>
          {`
{
  "usuario": "seu_usuario",
  "password": "sua_senha"
}`
          }
        </pre>
      </Paper>

      <Typography variant="body1" paragraph>
        Após o login, utilize o token retornado no cabeçalho <code>Authorization: Bearer &lt;token&gt;</code>.
      </Typography>

      <Typography variant="body2" paragraph>
        Endpoints disponíveis após login:
      </Typography>

      <Paper className="p-4 my-2" variant="outlined">
        <Typography variant="subtitle2">GET /me</Typography>
        <Typography variant="body2">Obtém dados do usuário autenticado.</Typography>

        <Typography variant="subtitle2" className="mt-2">GET /countries</Typography>
        <Typography variant="body2">Retorna lista de países disponíveis para comparação.</Typography>

        <Typography variant="subtitle2" className="mt-2">GET /comparisons</Typography>
        <Typography variant="body2">Lista todas as comparações criadas pelo usuário.</Typography>

        <Typography variant="subtitle2" className="mt-2">GET /comparisons/:id</Typography>
        <Typography variant="body2">Exibe detalhes e resultados de uma comparação.</Typography>

        <Typography variant="subtitle2" className="mt-2">POST /comparisons</Typography>
        <Typography variant="body2">Cria uma nova comparação entre dois países, precisa de um body como no exemplo abaixo.</Typography>
        <pre>
          {`
{
  "comparison": {
    "name": "BRA vs USA - Fev 2022 [01/02/2022 - 28/02/2022]",
    "country1_iso": "BRA",
    "country2_iso": "USA",
    "start_date": "2022-02-01",
    "end_date": "2022-02-28"
  }
}`
          }
        </pre>
      </Paper>

      <Typography variant="body2" paragraph>
        Endpoints disponíveis apenas para administradores:
      </Typography>

      <Paper className="p-4 my-2" variant="outlined">
        <Typography variant="subtitle2">GET /users</Typography>
        <Typography variant="subtitle2">POST /users</Typography>
        <Typography variant="subtitle2">PUT /users/:id</Typography>
        <Typography variant="subtitle2">DELETE /users/:id</Typography>
        <Typography variant="subtitle2">DELETE /comparisons/:id</Typography>
      </Paper>

      <Divider className="my-4 pt-4" />

      <Typography variant="h5" gutterBottom>
        Funcionalidades do Site
      </Typography>

      <Typography variant="body1" paragraph>
        Após autenticação, o usuário será direcionado à página inicial. As principais páginas do site são:
      </Typography>

      <ul className="list-disc ml-6">
        <li>
          <strong>Usuários:</strong> disponível apenas para administradores. Permite listar, editar e excluir usuários.
        </li>
        <li>
          <strong>Perfil:</strong> qualquer usuário pode editar seu nome, senha e login clicando no nome exibido na Navbar.
        </li>
        <li>
          <strong>Benchmark:</strong> acessível para todos os logados. Permite cadastrar comparações entre países e visualizar gráficos com os dados extraídos da API pública.
        </li>
      </ul>

    </Box>
  );
}
