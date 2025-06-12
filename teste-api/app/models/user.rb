class User < ApplicationRecord
  has_secure_password

  validates :nome, presence: true
  validates :usuario, presence: true, uniqueness: true
  validates :role, presence: true, inclusion: { in: %w[admin user] }
end
