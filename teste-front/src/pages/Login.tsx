import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useAuth } from "../auth/useAuth"; 
import { login as loginRequest } from "../auth/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await loginRequest(usuario, password);
      login(token);
      navigate("/");
    } catch {
      alert("Credenciais inválidas");
    }
  };

  return (
    <Container maxWidth="xs" className="mt-20">
      <Typography variant="h4" className="text-center mb-4">
        Login
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField label="Usuário" fullWidth value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        <TextField label="Senha" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" fullWidth type="submit">Entrar</Button>
      </form>
    </Container>
  );
}
