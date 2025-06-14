import { api } from "../api/api";
import type {
  Comparison,
  ComparisonDetails,
  ComparisonFormData,
} from "../types/Comparison";
import type { Country } from "../types/Country";

// Listar todos os benchmarks
export const getComparisons = () =>
  api<Comparison[]>("/comparisons");

// Obter um benchmark por ID (com resultados e análise)
export const getComparison = (id: number) =>
  api<ComparisonDetails>(`/comparisons/${id}`);

// Criar um novo benchmark
export const createComparison = (data: ComparisonFormData) =>
  api<ComparisonDetails>("/comparisons", {
    method: "POST",
    body: { comparison: data },
  });

// Deletar benchmark (admin)
export const deleteComparison = (id: number) =>
  api(`/comparisons/${id}`, {
    method: "DELETE",
  });

// Listar todos os países (para combo)
export const getCountries = () =>
  api<Country[]>("/countries");
