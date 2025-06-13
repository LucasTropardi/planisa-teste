class Comparison < ApplicationRecord
  has_many :results, dependent: :destroy

  validates :name, :country1_iso, :country2_iso, :start_date, :end_date, presence: true
end
