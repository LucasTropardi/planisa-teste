import type { TooltipProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { naming } from "../traducao/Naming";

export function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length > 0) {
    return (
      <div style={{ background: "#fff", border: "1px solid #ccc", padding: "8px" }}>
        <p><strong>{label}</strong></p>
        {payload.map((entry, index) => {
          const [iso, type] = typeof entry.name === "string" ? entry.name.split("_") : ["", ""];
          const fieldLabel = naming.getField(
            type === "confirmed"
              ? "confirmados"
              : type === "deaths"
              ? "obitos"
              : "taxa_letalidade"
          );

          const formattedValue =
            type === "fatality_rate"
              ? `${(Number(entry.value) * 100).toFixed(2)}%`
              : Number(entry.value).toLocaleString();

          return (
            <p key={index} style={{ color: entry.color }}>
              {iso} {fieldLabel}: {formattedValue}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
}
