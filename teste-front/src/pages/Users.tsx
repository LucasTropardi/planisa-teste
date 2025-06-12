import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { getUsers, deleteUser } from "../services/UserService";
import { Button, Table, TableRow, TableHead, TableCell, TableBody } from "@mui/material";
import { UserForm } from "../components/UserForm";

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>
      <Button
        variant="contained"
        color="primary"
        className="mb-4"
        onClick={() => {
          setUserToEdit(undefined);
          setFormOpen(true);
        }}
      >
        Novo Usuário
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Usuário</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.nome}</TableCell>
              <TableCell>{u.usuario}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setUserToEdit(u);
                    setFormOpen(true);
                  }}
                >
                  Editar
                </Button>
                <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(u.id)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UserForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={fetch}
        userToEdit={userToEdit}
      />
    </div>
  );
}
