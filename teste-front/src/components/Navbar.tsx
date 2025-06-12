import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Esconde a navbar na rota de login
  if (location.pathname === "/login") return null;

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex justify-between">
        <Box className="flex items-center gap-4">
          <Typography variant="h6" component="div">
            Bem-vindo, {user?.nome}
          </Typography>

          {user?.role === "admin" && (
            <Button
              component={Link}
              to="/users"
              variant="outlined"
              color="inherit"
              size="small"
            >
              Usuários
            </Button>
          )}

          <Button
            component={Link}
            to="/benchmark"
            variant="outlined"
            color="inherit"
            size="small"
          >
            Benchmark
          </Button>
        </Box>

        <Button
          color="inherit"
          onClick={logout}
          variant="outlined"
          size="small"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
