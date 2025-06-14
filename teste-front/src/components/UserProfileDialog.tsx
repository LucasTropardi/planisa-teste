import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import type { User, UserFormData } from "../types/User";
import { api } from "../api/api";
import { useAuth } from "../auth/useAuth";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UserProfileDialog({ open, onClose }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const { setUser: updateContextUser } = useAuth();

  useEffect(() => {
    if (open) {
      api<User>("/me").then((data) => {
        setUser(data);
        setNome(data.nome);
        setUsuario(data.usuario);
      });
      setPassword("");
      setPasswordConfirmation("");
      setError("");
    }
  }, [open]);

  const handleSubmit = async () => {
    if (password && password !== passwordConfirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    const body: Partial<Pick<UserFormData, "nome" | "usuario" | "password" | "password_confirmation">> = {
      nome,
      usuario,
    };

    if (password) {
      body.password = password;
      body.password_confirmation = passwordConfirmation;
    }

    try {
      await api(`/users/${user?.id}`, {
        method: "PATCH",
        body: { user: body },
      });

      const updatedUser = await api<User>("/me");
      updateContextUser(updatedUser);

      onClose();
    } catch (err) {
      setError(
        "Erro ao atualizar perfil: " +
          (err instanceof Error ? err.message : "Erro desconhecido")
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Perfil</DialogTitle>
      <DialogContent className="space-y-4 mt-2">
        <TextField
          label="Nome"
          fullWidth
          variant="outlined"
          margin="dense"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Usuário"
          fullWidth
          variant="outlined"
          margin="dense"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <TextField
          label="Nova Senha"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirmar Nova Senha"
          type="password"
          fullWidth
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
