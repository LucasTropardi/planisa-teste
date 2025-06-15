Dir[Rails.root.join('spec/support/**/*.rb')].sort.each { |f| require f }
RSpec.configure do |config|
  config.include AuthHelpers
end