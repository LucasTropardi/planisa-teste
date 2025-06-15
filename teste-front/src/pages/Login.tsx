import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { naming } from "../traducao/Naming";
import type { LanguageKey } from "../traducao/Naming";
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

  const [language, setLanguage] = useState<LanguageKey>(
    (localStorage.getItem("language") as LanguageKey) || "pt"
  );

  useEffect(() => {
    naming.setLanguage(language);
    document.title = `CovidAnalytics - ${naming.getField("login")}`;
  }, [language]);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const lang = event.target.value as LanguageKey;
    setLanguage(lang);
    naming.setLanguage(lang);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await loginRequest(usuario, password);
      login(token);
      navigate("/");
    } catch {
      setErrorDialog({
        open: true,
        message: naming.getMessage("erro_login"),
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-50 shadow-md rounded-lg p-6 w-full max-w-sm border border-gray-200">
        <Typography variant="h4" className="text-center font-semibold">
          {naming.getField("login")}
        </Typography>
        <div className="mb-6"></div> {/* Separação visual */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label={naming.getField("usuario")}
            fullWidth
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <TextField
            label={naming.getField("senha")}
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Select
            value={language}
            onChange={handleLanguageChange}
            fullWidth
            style={{ marginTop: "1.5rem", height: "3.4rem" }}
          >
            <MenuItem value="pt">
              <ListItemText primary="Português" />
            </MenuItem>
            <MenuItem value="en">
              <ListItemText primary="English" />
            </MenuItem>
            <MenuItem value="es">
              <ListItemText primary="Español" />
            </MenuItem>
          </Select>

          <Button variant="contained" fullWidth type="submit">
            {naming.getField("entrar")}
          </Button>
        </form>
      </div>

      <Dialog
        open={errorDialog.open}
        onClose={() => setErrorDialog({ open: false, message: "" })}
      >
        <DialogTitle>{naming.getField("atencao")}</DialogTitle>
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
            {naming.getField("ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
