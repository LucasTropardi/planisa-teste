import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import {
  getComparisons  ,
  deleteComparison,
} from "../services/ComparisonService";
import type { Comparison } from "../types/Comparison";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { formatDateBR } from "../utils/dateUtils";
import { ComparisonDialog } from "../components/ComparisonDialog";
import { getComparison } from "../services/ComparisonService";
import type { ComparisonDetails } from "../types/Comparison";

export function Benchmark() {
  const { user } = useAuth();
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [comparisonIdToDelete, setComparisonIdToDelete] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [comparisonToView, setComparisonToView] = useState<ComparisonDetails | undefined>();


  const fetch = async () => {
    const data = await getComparisons();
    setComparisons(data);
  };

  const handleNew = () => {
    setComparisonToView(undefined);
    setFormOpen(false);
    setTimeout(() => setFormOpen(true), 0); // força reabertura limpa
  };

  const handleView = async (id: number) => {
    const result = await getComparison(id);
    setComparisonToView(result);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (comparisonIdToDelete === null) return;
    await deleteComparison(comparisonIdToDelete);
    setDialogOpen(false);
    setComparisonIdToDelete(null);
    fetch();
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setComparisonToView(undefined); // limpa ao fechar
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="pt-6 pb-6">
      <h1 className="text-2xl font-bold mb-4">Benchmarks</h1>

      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
        onClick={handleNew}
      >
        Novo Benchmark
      </button>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">País 1</th>
              <th className="px-6 py-3">País 2</th>
              <th className="px-6 py-3">Data Inicial</th>
              <th className="px-6 py-3">Data Final</th>
              <th className="px-6 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((c, index) => (
              <tr
                key={c.id}
                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                <td className="px-6 py-4">{c.country1_iso}</td>
                <td className="px-6 py-4">{c.country2_iso}</td>
                <td className="px-6 py-4">{formatDateBR(c.start_date)}</td>
                <td className="px-6 py-4">{formatDateBR(c.end_date)}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    title="Visualizar"
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => handleView(c.id)}
                  >
                    <VisibilityIcon fontSize="small" />
                  </button>
                  {user?.role === "admin" && (
                    <button
                      title="Excluir"
                      onClick={() => {
                        setComparisonIdToDelete(c.id);
                        setDialogOpen(true);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Diálogo de confirmação */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <p>Tem certeza que deseja excluir este benchmark?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo do benchmark */}
      <ComparisonDialog
        key={comparisonToView?.id || "new"} // key para forçar re-renderização
        open={formOpen}
        onClose={handleCloseForm}
        comparison={comparisonToView}
      />
    </div>
  );
}
