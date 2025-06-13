class ComparisonService
  def initialize(params)
    @name = params[:name]
    @country1 = params[:country1_iso]
    @country2 = params[:country2_iso]
    @start_date = params[:start_date]
    @end_date = params[:end_date]
  end

  def perform
    comparison = Comparison.create!(
      name: @name,
      country1_iso: @country1,
      country2_iso: @country2,
      start_date: @start_date,
      end_date: @end_date
    )

    # Obtem resultados para os parâmetros fornecidos
    results = []

    [[@country1, @start_date], [@country1, @end_date],
     [@country2, @start_date], [@country2, @end_date]].each do |iso, date|
      data = CovidApiService.fetch(iso, date)
      raise "Erro ao consultar API para #{iso} - #{date}" unless data

      result = comparison.results.create!(
        iso: iso,
        date: date,
        confirmed: data["confirmed"],
        confirmed_diff: data["confirmed_diff"],
        deaths: data["deaths"],
        deaths_diff: data["deaths_diff"],
        recovered: data["recovered"],
        recovered_diff: data["recovered_diff"],
        active: data["active"],
        active_diff: data["active_diff"],
        fatality_rate: data["fatality_rate"]
      )
      results << result
    end

    calculate_variations(comparison, results)

    comparison
  end

  private

  def calculate_variations(comparison, results)
    # separa os resultados por país
    res = results.group_by(&:iso)
    c1_end = res[@country1].find { |r| r.date.to_s == @end_date.to_s }
    c2_end = res[@country2].find { |r| r.date.to_s == @end_date.to_s }

    # evita divisões por zero
    def variation(p1, p2)
      return 0 if p1 == 0
      ((p2 - p1).to_f / p1).round(4)
    end

    comparison.update!(
      confirmed_variation: variation(c1_end.confirmed, c2_end.confirmed),
      deaths_variation: variation(c1_end.deaths, c2_end.deaths),
      recovered_variation: variation(c1_end.recovered, c2_end.recovered),
      fatality_variation: (c2_end.fatality_rate - c1_end.fatality_rate).round(4),
      trend_index: trend(c1_end, c2_end)
    )
  end

  def trend(c1, c2)
    if c2.confirmed > c1.confirmed && c2.deaths > c1.deaths
      1
    elsif c2.confirmed < c1.confirmed && c2.deaths <= c1.deaths
      -1
    else
      0
    end
  end
end
