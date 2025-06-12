import { useEffect, useState } from "react";
import type { User, UserFormData } from "../types/User";
import { createUser, updateUser } from "../services/UserService";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  userToEdit?: User;
}

export const UserForm = ({ open, onClose, onSave, userToEdit }: UserFormProps) => {
  const [form, setForm] = useState<UserFormData>({
    nome: "",
    usuario: "",
    role: "user",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setForm({
        nome: userToEdit.nome,
        usuario: userToEdit.usuario,
        role: userToEdit.role,
        password: "",
        password_confirmation: "",
      });
    } else {
      setForm({
        nome: "",
        usuario: "",
        role: "user",
        password: "",
        password_confirmation: "",
      });
    }
  }, [userToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const dataToSend = { ...form };

    const preenchendoSenha = !!form.password || !!form.password_confirmation;

    // Validação: se vai enviar senha, ela precisa bater com a confirmação
    if (preenchendoSenha && form.password !== form.password_confirmation) {
      alert("As senhas não coincidem.");
      return;
    }

    if (userToEdit && !preenchendoSenha) {
      delete dataToSend.password;
      delete dataToSend.password_confirmation;
    }

    try {
      if (userToEdit) {
        await updateUser(userToEdit.id, dataToSend);
      } else {
        await createUser(dataToSend);
      }
      onSave();
      onClose();
    } catch (err) {
      alert("Erro ao salvar usuário" + (err instanceof Error ? `: ${err.message}` : ""));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{userToEdit ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
      <DialogContent className="space-y-4 mt-2">
        <TextField
          label="Nome"
          name="nome"
          fullWidth
          value={form.nome}
          onChange={handleChange}
        />
        <TextField
          label="Usuário"
          name="usuario"
          fullWidth
          value={form.usuario}
          onChange={handleChange}
        />
        <TextField
          label="Senha"
          name="password"
          type="password"
          fullWidth
          value={form.password}
          onChange={handleChange}
        />
        <TextField
          label="Confirmar Senha"
          name="password_confirmation"
          type="password"
          fullWidth
          value={form.password_confirmation}
          onChange={handleChange}
        />
        <TextField
          select
          label="Role"
          name="role"
          fullWidth
          value={form.role}
          onChange={handleChange}
        >
          <MenuItem value="user">Usuário</MenuItem>
          <MenuItem value="admin">Administrador</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
