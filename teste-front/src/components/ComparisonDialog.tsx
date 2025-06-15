import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Country } from "../types/Country";
import type { ComparisonFormData, ComparisonDetails } from "../types/Comparison";
import { getCountries } from "../services/ComparisonService"; 
import { createComparison } from "../services/ComparisonService";
import { formatDateBR } from "../utils/dateUtils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { naming } from "../traducao/Naming";
import { CustomTooltip } from "./CustomTooltip";

interface Props {
  open: boolean;
  onClose: () => void;
  comparison?: ComparisonDetails;
}

export function ComparisonDialog({ open, onClose, comparison }: Props) {
  const isEdit = !!comparison;
  const [countries, setCountries] = useState<Country[]>([]);
  const [form, setForm] = useState<ComparisonFormData>({
    name: "",
    country1_iso: "",
    country2_iso: "",
    start_date: "",
    end_date: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [createdComparison, setCreatedComparison] = useState<ComparisonDetails | null>(null);
  const isViewMode = isEdit || !!createdComparison;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  useEffect(() => {
    if (!open) return;

    if (comparison) {
      setForm({
        name: comparison.name,
        country1_iso: comparison.country1_iso,
        country2_iso: comparison.country2_iso,
        start_date: comparison.start_date,
        end_date: comparison.end_date,
      });
      setCreatedComparison(comparison);
    } else {
      setForm({
        name: "",
        country1_iso: "",
        country2_iso: "",
        start_date: "",
        end_date: "",
      });
      setCreatedComparison(null);
    }
  }, [open, comparison]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (name: "country1_iso" | "country2_iso", iso: string | null) => {
    setForm({ ...form, [name]: iso || "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = naming.getMessage("obrigatorio");
    if (!form.country1_iso) newErrors.country1_iso = naming.getMessage("obrigatorio");
    if (!form.country2_iso) newErrors.country2_iso = naming.getMessage("obrigatorio");
    if (form.country1_iso && form.country1_iso === form.country2_iso) {
      newErrors.country2_iso = naming.getMessage("paises_devem_ser_diferentes");
    }
    if (!form.start_date) newErrors.start_date = naming.getMessage("obrigatorio");
    if (!form.end_date) newErrors.end_date = naming.getMessage("obrigatorio");
    if (form.start_date && form.end_date && form.start_date >= form.end_date) {
      newErrors.end_date = naming.getMessage("data_final_maior_inicial");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      const response = await createComparison(form);
      setCreatedComparison(response); // ativa modo visualização com gráficos
      setForm({
        name: response.name,
        country1_iso: response.country1_iso,
        country2_iso: response.country2_iso,
        start_date: response.start_date,
        end_date: response.end_date,
      });
    } catch (err) {
      alert(naming.getMessage("erro_criar_benchmark") + (err instanceof Error ? `: ${err.message}` : ""));
    } finally {
      setIsLoading(false); // desativa botão
    }
  };

  const dataByDate =
    createdComparison?.results
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((r) => ({
        date: formatDateBR(r.date),
        [`${r.iso}_confirmed`]: r.confirmed,
        [`${r.iso}_deaths`]: r.deaths,
        [`${r.iso}_fatality_rate`]: parseFloat(r.fatality_rate),
      })) || [];

  const handleCloseInternally = () => {
    setForm({
      name: "",
      country1_iso: "",
      country2_iso: "",
      start_date: "",
      end_date: "",
    });
    setErrors({});
    setCreatedComparison(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          handleCloseInternally();
        }
      }}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{isViewMode ? naming.getField("detalhes_benchmark") : naming.getField("novo_benchmark")}</DialogTitle>
      <DialogContent className="space-y-4 mt-2">
        <TextField
          label={naming.getField("nome")}
          name="name"
          fullWidth
          variant="outlined"
          margin="dense"
          value={form.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          disabled={isViewMode}
        />
        <div className="flex gap-4">
          <Autocomplete
            fullWidth
            options={countries}
            getOptionLabel={(c) => c.name}
            value={countries.find((c) => c.iso === form.country1_iso) || null}
            onChange={(_, newValue) => handleCountryChange("country1_iso", newValue?.iso || null)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={naming.getField("pais1")}
                error={!!errors.country1_iso}
                helperText={errors.country1_iso}
                fullWidth
              />
            )}
            disabled={isViewMode}
          />
          <Autocomplete
            fullWidth
            options={countries}
            getOptionLabel={(c) => c.name}
            value={countries.find((c) => c.iso === form.country2_iso) || null}
            onChange={(_, newValue) => handleCountryChange("country2_iso", newValue?.iso || null)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={naming.getField("pais2")}
                error={!!errors.country2_iso}
                helperText={errors.country2_iso}
                fullWidth
              />
            )}
            disabled={isViewMode}
          />
        </div>

        <div className="flex gap-4">
          <TextField
            label={naming.getField("data_inicial")}
            name="start_date"
            type="date"
            fullWidth
            value={form.start_date}
            onChange={handleChange}
            error={!!errors.start_date}
            helperText={errors.start_date}
            InputLabelProps={{ shrink: true }}
            disabled={isViewMode}
          />
          <TextField
            label={naming.getField("data_final")}
            name="end_date"
            type="date"
            fullWidth
            value={form.end_date}
            onChange={handleChange}
            error={!!errors.end_date}
            helperText={errors.end_date}
            InputLabelProps={{ shrink: true }}
            disabled={isViewMode}
          />
        </div>

        {createdComparison && (
          <>
            <div className="pt-6 space-y-6">
              <h3 className="text-lg font-semibold">{naming.getField("casos_confirmados")}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis width={100} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey={`${form.country1_iso}_confirmed`} stroke="blue" />
                  <Line type="monotone" dataKey={`${form.country2_iso}_confirmed`} stroke="red" />
                </LineChart>
              </ResponsiveContainer>

              <h3 className="text-lg font-semibold">{naming.getField("obitos")}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis width={100} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey={`${form.country1_iso}_deaths`} stroke="blue" />
                  <Line type="monotone" dataKey={`${form.country2_iso}_deaths`} stroke="red" />
                </LineChart>
              </ResponsiveContainer>

              <h3 className="text-lg font-semibold">{naming.getField("taxa_letalidade")} (%)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataByDate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis width={100} tick={{ fontSize: 12 }} domain={[0, "dataMax"]} tickFormatter={(v: number) => `${(v * 100).toFixed(2)}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey={`${form.country1_iso}_fatality_rate`} stroke="blue" />
                  <Line type="monotone" dataKey={`${form.country2_iso}_fatality_rate`} stroke="red" />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">{naming.getField("indice_tendencia")}</h3>
                <p
                  className={`mt-2 font-semibold ${
                    createdComparison.trend_index === 1
                      ? "text-blue-600"
                      : createdComparison.trend_index === -1
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {
                    createdComparison.trend_index === 1
                      ? naming.getMessage("tendencia_crescimento")
                      : createdComparison.trend_index === -1
                      ? naming.getMessage("tendencia_queda")
                      : naming.getMessage("estavel")
                  }
                </p>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p><strong>{naming.getField("legenda")}</strong></p>
                <ul className="list-disc ml-6">
                  <li><span className="text-blue-600 font-semibold">{naming.getField("azul")}</span>: {form.country1_iso}</li>
                  <li><span className="text-red-600 font-semibold">{naming.getField("vermelho")}</span>: {form.country2_iso}</li>
                  <li>{naming.getMessage("legenda3")}</li>
                  <li>{naming.getMessage("legenda4")}</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {!isViewMode && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? naming.getField("processando") : naming.getField("criar_benchmark")}
          </Button>
        )}
        <Button onClick={onClose}>{naming.getField("fechar")}</Button>
      </DialogActions>
    </Dialog>
  );
}
