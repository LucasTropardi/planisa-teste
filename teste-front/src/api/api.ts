/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem("token");

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: Method;
  body?: any;
  token?: boolean; // true = usa Authorization header
  headers?: Record<string, string>;
}

export const api = async <T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { method = "GET", body, token = true, headers = {} } = options;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers, // headers é Record<string, string>
  };

  if (token) {
    const authToken = getToken();
    if (authToken) {
      finalHeaders["Authorization"] = `Bearer ${authToken}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Erro na requisição");
  }

  return response.json();
};
