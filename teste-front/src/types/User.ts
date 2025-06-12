export interface User {
  id: number;
  nome: string;
  usuario: string;
  role: "admin" | "user";
}

export interface UserFormData {
  nome: string;
  usuario: string;
  password?: string;
  password_confirmation?: string;
  role: "admin" | "user";
}
