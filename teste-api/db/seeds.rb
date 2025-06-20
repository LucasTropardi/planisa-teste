# Usuário admin inicial
User.find_or_create_by!(usuario: "admin") do |user|
  user.nome = "Administrador"
  user.password = "admin123"
  user.password_confirmation = "admin123"
  user.role = "admin"
end

# Países
countries = [
  { name: "China", iso: "CHN" },
  { name: "Taipé e arredores", iso: "TWN" },
  { name: "Estados Unidos", iso: "USA" },
  { name: "Japão", iso: "JPN" },
  { name: "Tailândia", iso: "THA" },
  { name: "Coreia do Sul", iso: "KOR" },
  { name: "Singapura", iso: "SGP" },
  { name: "Filipinas", iso: "PHL" },
  { name: "Malásia", iso: "MYS" },
  { name: "Vietnã", iso: "VNM" },
  { name: "Austrália", iso: "AUS" },
  { name: "México", iso: "MEX" },
  { name: "Brasil", iso: "BRA" },
  { name: "Colômbia", iso: "COL" },
  { name: "França", iso: "FRA" },
  { name: "Nepal", iso: "NPL" },
  { name: "Canadá", iso: "CAN" },
  { name: "Camboja", iso: "KHM" },
  { name: "Sri Lanka", iso: "LKA" },
  { name: "Costa do Marfim", iso: "CIV" },
  { name: "Alemanha", iso: "DEU" },
  { name: "Finlândia", iso: "FIN" },
  { name: "Emirados Árabes Unidos", iso: "ARE" },
  { name: "Índia", iso: "IND" },
  { name: "Itália", iso: "ITA" },
  { name: "Reino Unido", iso: "GBR" },
  { name: "Rússia", iso: "RUS" },
  { name: "Suécia", iso: "SWE" },
  { name: "Espanha", iso: "ESP" },
  { name: "Bélgica", iso: "BEL" },
  { name: "Outros", iso: "Others" },
  { name: "Egito", iso: "EGY" },
  { name: "Irã", iso: "IRN" },
  { name: "Israel", iso: "ISR" },
  { name: "Líbano", iso: "LBN" },
  { name: "Iraque", iso: "IRQ" },
  { name: "Omã", iso: "OMN" },
  { name: "Afeganistão", iso: "AFG" },
  { name: "Bahrein", iso: "BHR" },
  { name: "Kuwait", iso: "KWT" },
  { name: "Áustria", iso: "AUT" },
  { name: "Argélia", iso: "DZA" },
  { name: "Croácia", iso: "HRV" },
  { name: "Suíça", iso: "CHE" },
  { name: "Paquistão", iso: "PAK" },
  { name: "Geórgia", iso: "GEO" },
  { name: "Grécia", iso: "GRC" },
  { name: "Macedônia do Norte", iso: "MKD" },
  { name: "Noruega", iso: "NOR" },
  { name: "Romênia", iso: "ROU" },
  { name: "Dinamarca", iso: "DNK" },
  { name: "Estônia", iso: "EST" },
  { name: "Países Baixos", iso: "NLD" },
  { name: "San Marino", iso: "SMR" },
  { name: "Azerbaijão", iso: "AZE" },
  { name: "Bielorrússia", iso: "BLR" },
  { name: "Islândia", iso: "ISL" },
  { name: "Lituânia", iso: "LTU" },
  { name: "Nova Zelândia", iso: "NZL" },
  { name: "Nigéria", iso: "NGA" },
  { name: "Irlanda", iso: "IRL" },
  { name: "Luxemburgo", iso: "LUX" },
  { name: "Mônaco", iso: "MCO" },
  { name: "Catar", iso: "QAT" },
  { name: "Equador", iso: "ECU" },
  { name: "Chéquia", iso: "CZE" },
  { name: "Armênia", iso: "ARM" },
  { name: "República Dominicana", iso: "DOM" },
  { name: "Indonésia", iso: "IDN" },
  { name: "Portugal", iso: "PRT" },
  { name: "Andorra", iso: "AND" },
  { name: "Letônia", iso: "LVA" },
  { name: "Marrocos", iso: "MAR" },
  { name: "Arábia Saudita", iso: "SAU" },
  { name: "Senegal", iso: "SEN" },
  { name: "Argentina", iso: "ARG" },
  { name: "Chile", iso: "CHL" },
  { name: "Jordânia", iso: "JOR" },
  { name: "Ucrânia", iso: "UKR" },
  { name: "São Bartolomeu", iso: "BLM" },
  { name: "Hungria", iso: "HUN" },
  { name: "Ilhas Faroe", iso: "FRO" },
  { name: "Gibraltar", iso: "GIB" },
  { name: "Liechtenstein", iso: "LIE" },
  { name: "Polônia", iso: "POL" },
  { name: "Tunísia", iso: "TUN" },
  { name: "Cisjordânia e Gaza", iso: "PSE" },
  { name: "Bósnia e Herzegovina", iso: "BIH" },
  { name: "Eslovênia", iso: "SVN" },
  { name: "África do Sul", iso: "ZAF" },
  { name: "Butão", iso: "BTN" },
  { name: "Camarões", iso: "CMR" },
  { name: "Costa Rica", iso: "CRI" },
  { name: "Peru", iso: "PER" },
  { name: "Sérvia", iso: "SRB" },
  { name: "Eslováquia", iso: "SVK" },
  { name: "Togo", iso: "TGO" },
  { name: "Santa Sé", iso: "VAT" },
  { name: "Guiana Francesa", iso: "GUF" },
  { name: "Malta", iso: "MLT" },
  { name: "Martinica", iso: "MTQ" },
  { name: "Bulgária", iso: "BGR" },
  { name: "Maldivas", iso: "MDV" },
  { name: "Bangladesh", iso: "BGD" },
  { name: "Moldávia", iso: "MDA" },
  { name: "Paraguai", iso: "PRY" },
  { name: "Albânia", iso: "ALB" },
  { name: "Chipre", iso: "CYP" },
  { name: "Brunei", iso: "BRN" },
  { name: "Macau SAR", iso: "MAC" },
  { name: "Saint Martin", iso: "MAF" },
  { name: "Burkina Faso", iso: "BFA" },
  { name: "Ilhas do Canal", iso: "GGY-JEY" },
  { name: "Mongólia", iso: "MNG" },
  { name: "Panamá", iso: "PAN" },
  { name: "Navio de Cruzeiro", iso: "cruise" },
  { name: "Taiwan*", iso: "TWN" },
  { name: "Bolívia", iso: "BOL" },
  { name: "Honduras", iso: "HND" },
  { name: "Congo (Kinshasa)", iso: "COD" },
  { name: "Jamaica", iso: "JAM" },
  { name: "Reunião", iso: "REU" },
  { name: "Turquia", iso: "TUR" },
  { name: "Cuba", iso: "CUB" },
  { name: "Guiana", iso: "GUY" },
  { name: "Cazaquistão", iso: "KAZ" },
  { name: "Ilhas Cayman", iso: "CYM" },
  { name: "Guadalupe", iso: "GLP" },
  { name: "Etiópia", iso: "ETH" },
  { name: "Sudão", iso: "SDN" },
  { name: "Guiné", iso: "GIN" },
  { name: "Mauritânia", iso: "MRT" },
  { name: "Sudão do Sul", iso: "SSD" },
  { name: "Maurício", iso: "MUS" },
  { name: "Libéria", iso: "LBR" },
  { name: "Seicheles", iso: "SYC" },
  { name: "Ilhas Turcas e Caicos", iso: "TCA" },
  { name: "Uganda", iso: "UGA" },
  { name: "Barbados", iso: "BRB" },
  { name: "Ilhas Cook", iso: "COK" },
  { name: "Nauru", iso: "NRU" },
  { name: "Samoa", iso: "WSM" },
  { name: "Ilhas Virgens Britânicas", iso: "VGB" },
  { name: "Fiji", iso: "FJI" },
  { name: "Montserrat", iso: "MSR" },
  { name: "Quiribati", iso: "KIR" },
  { name: "São Martinho", iso: "SXM" },
  { name: "São Vicente e Granadinas", iso: "VCT" },
  { name: "Dominica", iso: "DMA" },
  { name: "Comores", iso: "COM" },
  { name: "Ilhas Marshall", iso: "MHL" },
  { name: "Santa Lúcia", iso: "LCA" },
  { name: "Vanuatu", iso: "VUT" },
  { name: "Palau", iso: "PLW" },
  { name: "São Tomé e Príncipe", iso: "STP" },
  { name: "Estados Federados da Micronésia", iso: "FSM" },
  { name: "Nova Caledônia", iso: "NCL" },
  { name: "Antártica", iso: "ATA" },
  { name: "Tuvalu", iso: "TUV" }

]

countries.each do |country|
  Country.find_or_create_by!(iso: country[:iso]) do |c|
    c.name = country[:name]
  end
end