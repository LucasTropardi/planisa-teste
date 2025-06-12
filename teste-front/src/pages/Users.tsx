import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { getUsers, deleteUser } from "../services/UserService";
import { UserForm } from "../components/UserForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | undefined>();

  const fetch = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Deseja excluir este usuário?")) {
      await deleteUser(id);
      fetch();
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="pt-6 pb-6">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
        onClick={() => {
          setUserToEdit(undefined);
          setFormOpen(true);
        }}
      >
        NOVO USUÁRIO
      </button>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Usuário</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-right">Ações</th>
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
                    title="Editar"
                    onClick={() => {
                      setUserToEdit(u);
                      setFormOpen(true);
                    }}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    <EditIcon fontSize="small" />
                  </button>
                  <button
                    title="Excluir"
                    onClick={() => handleDelete(u.id)}
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
    </div>
  );
}
