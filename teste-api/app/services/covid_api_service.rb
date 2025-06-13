require 'net/http'
require 'json'

class CovidApiService
  BASE_URL = "https://covid-api.com/api/reports/total"

  def self.fetch(iso, date)
    url = URI("#{BASE_URL}?date=#{date}&iso=#{iso}")
    response = Net::HTTP.get(url)
    json = JSON.parse(response)

    json["data"]
  rescue => e
    Rails.logger.error("Erro ao consultar API para #{iso} em #{date}: #{e.message}")
    nil
  end
end
