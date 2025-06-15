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
import { naming } from "../traducao/Naming";

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
              title={naming.getField("editar_perfil")}
            >
              {user?.nome}
            </button>
          </div>

          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-900 hover:text-blue-700"
            >
              {naming.getField("home")}
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/users"
                className="text-gray-900 hover:text-blue-700"
              >
                {naming.getField("usuarios")}
              </Link>
            )}
            <Link
              to="/benchmark"
              className="text-gray-900 hover:text-blue-700"
            >
              {naming.getField("benchmarks")}
            </Link>
          </div>

          <button
            onClick={() => setDialogOpen(true)}
            className="flex items-center gap-2 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2"
            title={naming.getField("sair")}
          >
            <LogoutIcon fontSize="small" />
            
          </button>
        </div>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>{naming.getMessage("confirmar_logout")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {naming.getMessage("confirmar_sair")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>{naming.getField("cancelar")}</Button>
            <Button onClick={handleLogout} color="error" variant="contained">
              {naming.getField("sair")}
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
