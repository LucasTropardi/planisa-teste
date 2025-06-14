import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserProfileDialog } from "../components/UserProfileDialog";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  if (location.pathname === "/login") return null;

  const handleLogout = () => {
    setDialogOpen(false);
    logout();
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-2xl font-semibold">
            <button
              onClick={() => setProfileDialogOpen(true)}
              className="text-xl font-semibold hover:text-blue-800"
              title="Editar perfil"
            >
              {user?.nome}
            </button>
          </div>

          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-900 hover:text-blue-700"
            >
              Home
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/users"
                className="text-gray-900 hover:text-blue-700"
              >
                Usuários
              </Link>
            )}
            <Link
              to="/benchmark"
              className="text-gray-900 hover:text-blue-700"
            >
              Benchmarks
            </Link>
          </div>

          <button
            onClick={() => setDialogOpen(true)}
            className="flex items-center gap-2 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2"
            title="Sair"
          >
            <LogoutIcon fontSize="small" />
            
          </button>
        </div>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Confirmar Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza de que deseja sair do sistema?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleLogout} color="error" variant="contained">
              Sair
            </Button>
          </DialogActions>
        </Dialog>
      </nav>
      <UserProfileDialog
        open={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
      />
    </>
  );
};

export default Navbar;
