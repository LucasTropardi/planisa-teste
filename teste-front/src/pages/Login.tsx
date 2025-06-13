import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useAuth } from "../auth/useAuth";
import { login as loginRequest } from "../auth/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [errorDialog, setErrorDialog] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await loginRequest(usuario, password);
      login(token);
      navigate("/");
    } catch {
      setErrorDialog({
        open: true,
        message: "Credenciais inválidas, verifique as informações e tente novamente.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-50 shadow-md rounded-lg p-6 w-full max-w-sm border border-gray-200">
        <Typography variant="h4" className="text-center font-semibold">
          Login
        </Typography>
        <div className="mb-6"></div> {/* Separação visual */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Usuário"
            fullWidth
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <TextField
            label="Senha"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" fullWidth type="submit">
            Entrar
          </Button>
        </form>
      </div>

      <Dialog
        open={errorDialog.open}
        onClose={() => setErrorDialog({ open: false, message: "" })}
      >
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          <Typography>{errorDialog.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setErrorDialog({ open: false, message: "" })}
            variant="contained"
            color="primary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
