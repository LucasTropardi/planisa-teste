import { Typography, Box, Paper, Link, Divider } from "@mui/material";
import { useEffect } from "react";
import { naming } from "../traducao/Naming";

export function Home() {
  
  useEffect(() => {
    document.title = `CovidAnalytics - ${naming.getField("home")}`;
  }, []);

  return (
    <Box className="p-6">
      <Typography variant="h4" gutterBottom>
        {naming.getMessage("titulo_inicial_home")}
      </Typography>

      <Typography variant="body1" paragraph>
        {naming.getMessage("subtitulo_inicial_home")}
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
        {naming.getMessage("segundo_titulo_home")}
      </Typography>

      <Typography variant="body1">
        {naming.getMessage("segundo_subtitulo_home")}
      </Typography>

      <Paper className="p-4 my-2" variant="outlined">
        <Typography variant="subtitle2">POST /login</Typography>
        <pre>
          {`
{
  "usuario": "${naming.getField("seu_usuario")}",
  "password": "${naming.getField("sua_senha")}"
}`
          }
        </pre>
      </Paper>

      <Typography variant="body1" paragraph>
        {naming.getMessage("final_autenticacao1")}<code>Authorization: Bearer &lt;token&gt;</code>.
      </Typography>

      <Typography variant="body2" paragraph>
        {naming.getMessage("endpoints_disponiveis_login")}
      </Typography>

      <Paper className="p-4 my-2" variant="outlined">
        <Typography variant="subtitle2">GET /me</Typography>
        <Typography variant="body2">{naming.getMessage("obtem_usuario_autenticado")}</Typography>

        <Typography variant="subtitle2" className="mt-2">GET /countries</Typography>
        <Typography variant="body2">{naming.getMessage("retorna_lista_paises")}</Typography>

        <Typography variant="subtitle2" className="mt-2">GET /comparisons</Typography>
        <Typography variant="body2">{naming.getMessage("lista_todas_comparacoes")}</Typography>

        <Typography variant="subtitle2" className="mt-2">GET /comparisons/:id</Typography>
        <Typography variant="body2">{naming.getMessage("exibe_detalhes_comparacao")}</Typography>

        <Typography variant="subtitle2" className="mt-2">POST /comparisons</Typography>
        <Typography variant="body2">{naming.getMessage("cria_nova_comparacao")}</Typography>
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
        {naming.getMessage("endpoints_disponiveis_administrador")}
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
        {naming.getMessage("funcionalidades_site")}
      </Typography>

      <Typography variant="body1" paragraph>
        {naming.getMessage("ultimo_subtitulo_home")}
      </Typography>

      <ul className="list-disc ml-6">
        <li>
          <strong>{naming.getField("usuarios")}:</strong> {naming.getMessage("usuarios_descricao")}
        </li>
        <li>
          <strong>{naming.getField("perfil")}:</strong> {naming.getMessage("perfil_descricao")}
        </li>
        <li>
          <strong>{naming.getField("benchmark")}:</strong> {naming.getMessage("benchmark_descricao")}
        </li>
      </ul>

    </Box>
  );
}
