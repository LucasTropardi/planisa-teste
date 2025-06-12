class CountriesController < ApplicationController
  before_action :authorize_request

  def index
    countries = Country.all.order(:name)
    render json: countries
  end
end
