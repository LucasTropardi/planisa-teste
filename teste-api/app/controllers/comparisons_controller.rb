class ComparisonsController < ApplicationController
  def create
    comparison = ComparisonService.new(comparison_params).perform
    render json: comparison.to_json(include: :results), status: :created
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def index
    comparisons = Comparison.includes(:results).all
    render json: comparisons.to_json(include: :results)
  end

  def show
    comparison = Comparison.includes(:results).find_by(id: params[:id])
    if comparison
      render json: comparison.to_json(include: :results)
    else
      render json: { error: "Comparação não encontrada" }, status: :not_found
    end
  end

  def destroy
    unless current_user&.role == 'admin'
      render json: { error: 'Acesso restrito' }, status: :forbidden
      return
    end

    comparison = Comparison.find_by(id: params[:id])
    if comparison
      comparison.destroy
      render json: { message: "Comparação excluída com sucesso." }, status: :ok
    else
      render json: { error: "Comparação não encontrada." }, status: :not_found
    end
  end

  private

  def comparison_params
    params.require(:comparison).permit(:name, :country1_iso, :country2_iso, :start_date, :end_date)
  end
end
