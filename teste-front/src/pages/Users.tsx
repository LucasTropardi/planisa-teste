import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { getUsers, deleteUser } from "../services/UserService";
import { UserForm } from "../components/UserForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { naming } from "../traducao/Naming";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | undefined>();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    document.title = `CovidAnalytics - ${naming.getField("usuarios")}`;
  }, []);

  const fetch = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async () => {
    if (userIdToDelete === null) return;
    await deleteUser(userIdToDelete);
    setConfirmDialogOpen(false);
    setUserIdToDelete(null);
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="pt-6 pb-6">
      <h1 className="text-2xl font-bold mb-4">{naming.getField("usuarios")}</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
        onClick={() => {
          setUserToEdit(undefined);
          setFormOpen(true);
        }}
      >
        {naming.getField("novo_usuario")}
      </button>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">{naming.getField("nome")}</th>
              <th className="px-6 py-3">{naming.getField("usuario")}</th>
              <th className="px-6 py-3">{naming.getField("role")}</th>
              <th className="px-6 py-3 text-right">{naming.getField("acoes")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr
                key={u.id}
                className={`border-b ${
                  index % 2 === 0
                    ? "bg-white"
                    : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {u.nome}
                </td>
                <td className="px-6 py-4">{u.usuario}</td>
                <td className="px-6 py-4">{u.role}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    title={naming.getField("editar")}
                    onClick={() => {
                      setUserToEdit(u);
                      setFormOpen(true);
                    }}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    <EditIcon fontSize="small" />
                  </button>
                  <button
                    title={naming.getField("excluir")}
                    onClick={() => {
                      setUserIdToDelete(u.id);
                      setConfirmDialogOpen(true);
                    }}
                    className="text-red-600 hover:underline"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={fetch}
        userToEdit={userToEdit}
      />

      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>{naming.getMessage("confirmar_exclusao")}</DialogTitle>
        <DialogContent>
          <p>{naming.getMessage("excluir_usuario")}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>{naming.getField("cancelar")}</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            {naming.getField("excluir")}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
