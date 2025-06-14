import { api } from "../api/api";
import type { User, UserFormData } from "../types/User";

// Listar todos os usuários
export const getUsers = () => api<User[]>("/users");

// Criar um novo usuário
export const createUser = (data: UserFormData) =>
  api<User>("/users", {
    method: "POST",
    body: { user: data },
  });

// Atualizar um usuário existente
export const updateUser = (id: number, data: Partial<UserFormData>) =>
  api<User>(`/users/${id}`, {
    method: "PATCH",
    body: { user: data },
  });

// Deletar um usuário
export const deleteUser = (id: number) =>
  api(`/users/${id}`, {
    method: "DELETE",
  });
