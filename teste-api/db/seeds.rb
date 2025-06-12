User.find_or_create_by!(usuario: "admin") do |user|
  user.nome = "Administrador"
  user.password = "admin123"
  user.password_confirmation = "admin123"
  user.role = "admin"
end