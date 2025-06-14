export interface Comparison {
  id: number;
  name: string;
  country1_iso: string;
  country2_iso: string;
  start_date: string;
  end_date: string;
}

export interface ComparisonFormData {
  name: string;
  country1_iso: string;
  country2_iso: string;
  start_date: string;
  end_date: string;
}

export interface ComparisonResult {
  id: number;
  comparison_id: number;
  iso: string;
  date: string;
  confirmed: number;
  confirmed_diff: number;
  deaths: number;
  deaths_diff: number;
  recovered: number;
  recovered_diff: number;
  active: number;
  active_diff: number;
  fatality_rate: string;
  created_at: string;
  updated_at: string;
}

export interface ComparisonDetails extends Comparison {
  confirmed_variation: string;
  deaths_variation: string;
  recovered_variation: string;
  fatality_variation: string;
  trend_index: number;
  results: ComparisonResult[];
}