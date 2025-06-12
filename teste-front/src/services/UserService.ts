import { api } from "../api/api";
import type { User, UserFormData } from "../types/User";

export const getUsers = () => api<User[]>("/users");

export const createUser = (data: UserFormData) =>
  api<User>("/users", {
    method: "POST",
    body: { user: data },
  });

export const updateUser = (id: number, data: Partial<UserFormData>) =>
  api<User>(`/users/${id}`, {
    method: "PATCH",
    body: { user: data },
  });

export const deleteUser = (id: number) =>
  api(`/users/${id}`, {
    method: "DELETE",
  });
