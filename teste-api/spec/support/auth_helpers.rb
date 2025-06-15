module AuthHelpers
  def auth_header_for(user)
    token = JwtService.encode(user_id: user.id, role: user.role)
    { 'Authorization' => "Bearer #{token}" }
  end
end