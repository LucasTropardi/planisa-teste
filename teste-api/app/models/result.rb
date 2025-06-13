class Result < ApplicationRecord
  belongs_to :comparison

  validates :iso, :date, presence: true
end
