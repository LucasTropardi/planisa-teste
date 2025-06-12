import { api } from "../api/api";
import type { Country } from "../types/Country";

export const getCountries = () => api<Country[]>("/countries");