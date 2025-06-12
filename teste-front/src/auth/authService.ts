export const login = async (usuario: string, password: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, password }),
  });

  if (!response.ok) throw new Error('Login inválido');
  return response.json(); // deve conter { token }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};