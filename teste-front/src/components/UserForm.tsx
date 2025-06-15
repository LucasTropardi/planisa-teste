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
import { naming } from "../traducao/Naming";

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
  const [errorDialog, setErrorDialog] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
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
      setErrorDialog({ open: true, message: "As senhas não coincidem." });
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
      setErrorDialog({ open: true, message: naming.getMessage("erro_salvar_usuario") + (err instanceof Error ? `: ${err.message}` : "") });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{userToEdit ? naming.getField("editar_usuario") : naming.getField("novo_usuario_menor")}</DialogTitle>
        <DialogContent className="space-y-4 mt-2">
          <TextField
            label={naming.getField("nome")}
            name="nome"
            fullWidth
            variant="outlined"
            margin="dense"
            value={form.nome}
            onChange={handleChange}
          />
          <TextField
            label={naming.getField("usuario")}
            name="usuario"
            fullWidth
            value={form.usuario}
            onChange={handleChange}
          />
          <TextField
            label={naming.getField("senha")}
            name="password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            label={naming.getField("confirmar_senha")}
            name="password_confirmation"
            type="password"
            fullWidth
            value={form.password_confirmation}
            onChange={handleChange}
          />
          <TextField
            select
            label={naming.getField("role")}
            name="role"
            fullWidth
            value={form.role}
            onChange={handleChange}
          >
            <MenuItem value="user">{naming.getField("usuario")}</MenuItem>
            <MenuItem value="admin">{naming.getField("administrador")}</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{naming.getField("cancelar")}</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {naming.getField("salvar")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para exibir erros */}
      <Dialog open={errorDialog.open} onClose={() => setErrorDialog({ open: false, message: "" })}>
        <DialogTitle>{naming.getField("atencao")}</DialogTitle>
        <DialogContent>
          <p>{errorDialog.message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorDialog({ open: false, message: "" })} variant="contained" color="primary" autoFocus>
            {naming.getField("ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
