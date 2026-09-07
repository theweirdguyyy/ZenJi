// Country and State/Province dataset for ZENJI Checkout

export interface CountryData {
  name: string;
  code: string;
  states: string[];
}

export const COUNTRIES_DATA: CountryData[] = [
  {
    name: "United States",
    code: "US",
    states: [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
      "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
      "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
      "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
      "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
      "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
      "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
      "Wisconsin", "Wyoming", "District of Columbia", "Puerto Rico"
    ]
  },
  {
    name: "Canada",
    code: "CA",
    states: [
      "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
      "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island",
      "Quebec", "Saskatchewan", "Yukon"
    ]
  },
  {
    name: "United Kingdom",
    code: "GB",
    states: [
      "England", "Scotland", "Wales", "Northern Ireland", "Greater London", "West Midlands",
      "Greater Manchester", "West Yorkshire", "Merseyside", "South Yorkshire"
    ]
  },
  {
    name: "Australia",
    code: "AU",
    states: [
      "Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland",
      "South Australia", "Tasmania", "Victoria", "Western Australia"
    ]
  },
  {
    name: "Japan",
    code: "JP",
    states: [
      "Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka", "Fukushima", "Gifu",
      "Gunma", "Hiroshima", "Hokkaido", "Hyogo", "Ibaraki", "Ishikawa", "Iwate", "Kagawa",
      "Kagoshima", "Kanagawa", "Kochi", "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki",
      "Nagano", "Nagasaki", "Nara", "Niigata", "Oita", "Okayama", "Okinawa", "Osaka",
      "Saga", "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi", "Tokushima", "Tokyo",
      "Tottori", "Toyama", "Wakayama", "Yamagata", "Yamaguchi", "Yamanashi"
    ]
  },
  {
    name: "Germany",
    code: "DE",
    states: [
      "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse",
      "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate",
      "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
    ]
  },
  {
    name: "France",
    code: "FR",
    states: [
      "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire",
      "Corsica", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine",
      "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"
    ]
  },
  {
    name: "India",
    code: "IN",
    states: [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
      "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
      "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
      "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ]
  },
  {
    name: "Brazil",
    code: "BR",
    states: [
      "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo",
      "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba",
      "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul",
      "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
    ]
  },
  {
    name: "Mexico",
    code: "MX",
    states: [
      "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
      "Ciudad de México", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo",
      "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
      "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas",
      "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
    ]
  },
  {
    name: "Italy",
    code: "IT",
    states: [
      "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli-Venezia Giulia",
      "Lazio", "Liguria", "Lombardy", "Marche", "Molise", "Piedmont", "Puglia", "Sardinia",
      "Sicily", "Trentino-Alto Adige", "Tuscany", "Umbria", "Valle d'Aosta", "Veneto"
    ]
  },
  {
    name: "Spain",
    code: "ES",
    states: [
      "Andalusia", "Aragon", "Asturias", "Balearic Islands", "Basque Country", "Canary Islands",
      "Cantabria", "Castile and León", "Castilla-La Mancha", "Catalonia", "Extremadura", "Galicia",
      "La Rioja", "Madrid", "Murcia", "Navarre", "Valencian Community"
    ]
  },
  {
    name: "Netherlands",
    code: "NL",
    states: [
      "Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "North Brabant",
      "North Holland", "Overijssel", "South Holland", "Utrecht", "Zeeland"
    ]
  },
  {
    name: "New Zealand",
    code: "NZ",
    states: [
      "Auckland", "Bay of Plenty", "Canterbury", "Gisborne", "Hawke's Bay", "Manawatu-Wanganui",
      "Marlborough", "Nelson", "Northland", "Otago", "Southland", "Taranaki", "Tasman", "Waikato",
      "Wellington", "West Coast"
    ]
  },
  {
    name: "Singapore",
    code: "SG",
    states: ["Central Region", "East Region", "North Region", "North-East Region", "West Region"]
  },
  {
    name: "South Korea",
    code: "KR",
    states: [
      "Seoul", "Busan", "Daegu", "Incheon", "Gwangju", "Daejeon", "Ulsan", "Sejong",
      "Gyeonggi-do", "Gangwon-do", "Chungcheongbuk-do", "Chungcheongnam-do", "Jeollabuk-do",
      "Jeollanam-do", "Gyeongsangbuk-do", "Gyeongsangnam-do", "Jeju"
    ]
  },
  {
    name: "Switzerland",
    code: "CH",
    states: [
      "Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft",
      "Basel-Stadt", "Bern", "Fribourg", "Geneva", "Glarus", "Graubünden", "Jura", "Lucerne",
      "Neuchâtel", "Nidwalden", "Obwalden", "Schaffhausen", "Schwyz", "Solothurn", "St. Gallen",
      "Thurgau", "Ticino", "Uri", "Valais", "Vaud", "Zug", "Zurich"
    ]
  },
  {
    name: "Sweden",
    code: "SE",
    states: [
      "Blekinge", "Dalarna", "Gotland", "Gävleborg", "Halland", "Jämtland", "Jönköping",
      "Kalmar", "Kronoberg", "Norrbotten", "Skåne", "Stockholm", "Södermanland", "Uppsala",
      "Värmland", "Västerbotten", "Västernorrland", "Västmanland", "Västra Götaland",
      "Örebro", "Östergötland"
    ]
  },
  {
    name: "Norway",
    code: "NO",
    states: [
      "Agder", "Innlandet", "Møre og Romsdal", "Nordland", "Oslo", "Rogaland",
      "Troms og Finnmark", "Trøndelag", "Vestfold og Telemark", "Vestland", "Viken"
    ]
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    states: ["Abu Dhabi", "Ajman", "Dubai", "Fujairah", "Ras Al Khaimah", "Sharjah", "Umm Al Quwain"]
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    states: [
      "Al Bahah", "Al Jawf", "Al Madinah", "Al Qasim", "Ar Riyad", "Asir", "Eastern Province",
      "Hail", "Jazan", "Makkah", "Najran", "Northern Borders", "Tabuk"
    ]
  },
  {
    name: "Argentina",
    code: "AR",
    states: [
      "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos",
      "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén",
      "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe",
      "Santiago del Estero", "Tierra del Fuego", "Tucumán"
    ]
  },
  {
    name: "Belgium",
    code: "BE",
    states: ["Antwerp", "East Flanders", "Flemish Brabant", "Hainaut", "Liège", "Limburg", "Luxembourg", "Namur", "Walloon Brabant", "Brussels"]
  },
  {
    name: "Denmark",
    code: "DK",
    states: ["Capital Region", "Central Denmark", "North Denmark", "Region Zealand", "Region of Southern Denmark"]
  },
  {
    name: "Finland",
    code: "FI",
    states: ["Åland", "South Ostrobothnia", "Lapland", "Central Finland", "Pirkanmaa", "North Ostrobothnia", "Uusimaa", "Southwest Finland"]
  },
  {
    name: "Ireland",
    code: "IE",
    states: ["Carlow", "Cavan", "Clare", "Cork", "Donegal", "Dublin", "Galway", "Kerry", "Kildare", "Kilkenny", "Limerick", "Mayo", "Meath", "Waterford", "Wicklow"]
  },
  {
    name: "Poland",
    code: "PL",
    states: ["Greater Poland", "Kuyavian-Pomeranian", "Lesser Poland", "Łódź", "Lower Silesian", "Lublin", "Lubusz", "Masovian", "Opole", "Podlaskie", "Pomeranian", "Silesian", "Subcarpathian", "Holy Cross", "Warmian-Masurian", "West Pomeranian"]
  },
  {
    name: "Portugal",
    code: "PT",
    states: ["Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora", "Faro", "Guarda", "Leiria", "Lisbon", "Portalegre", "Porto", "Santarém", "Setúbal", "Viana do Castelo", "Vila Real", "Viseu", "Azores", "Madeira"]
  },
  {
    name: "South Africa",
    code: "ZA",
    states: ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"]
  },
  {
    name: "Austria",
    code: "AT",
    states: ["Burgenland", "Carinthia", "Lower Austria", "Upper Austria", "Salzburg", "Styria", "Tyrol", "Vorarlberg", "Vienna"]
  },
  {
    name: "Turkey",
    code: "TR",
    states: ["Adana", "Ankara", "Antalya", "Bursa", "Gaziantep", "Istanbul", "Izmir", "Konya", "Mersin", "Mugla"]
  },
  {
    name: "Greece",
    code: "GR",
    states: ["Attica", "Central Greece", "Central Macedonia", "Crete", "Eastern Macedonia and Thrace", "Epirus", "Ionian Islands", "North Aegean", "Peloponnese", "South Aegean", "Thessaly", "Western Greece", "Western Macedonia"]
  },
  {
    name: "Indonesia",
    code: "ID",
    states: ["Bali", "Banten", "Central Java", "East Java", "Jakarta", "North Sumatra", "Riau", "South Sulawesi", "West Java", "Yogyakarta"]
  },
  {
    name: "Malaysia",
    code: "MY",
    states: ["Johor", "Kedah", "Kelantan", "Kuala Lumpur", "Malacca", "Negeri Sembilan", "Pahang", "Penang", "Perak", "Sabah", "Sarawak", "Selangor"]
  },
  {
    name: "Philippines",
    code: "PH",
    states: ["Metro Manila", "Cebu", "Davao", "Cavite", "Laguna", "Pampanga", "Rizal", "Bulacan", "Batangas", "Iloilo"]
  },
  {
    name: "Thailand",
    code: "TH",
    states: ["Bangkok", "Chiang Mai", "Chonburi", "Phuket", "Nonthaburi", "Pathum Thani", "Khon Kaen", "Nakhon Ratchasima"]
  },
  {
    name: "Vietnam",
    code: "VN",
    states: ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Can Tho", "Binh Duong", "Dong Nai", "Khanh Hoa"]
  },
  {
    name: "Chile",
    code: "CL",
    states: ["Antofagasta", "Araucanía", "Arica y Parinacota", "Atacama", "Aysén", "Biobío", "Coquimbo", "Los Lagos", "Los Ríos", "Magallanes", "Maule", "Metropolitana de Santiago", "Ñuble", "O'Higgins", "Tarapacá", "Valparaíso"]
  },
  {
    name: "Colombia",
    code: "CO",
    states: ["Antioquia", "Atlántico", "Bogotá D.C.", "Bolívar", "Caldas", "Cundinamarca", "Santander", "Valle del Cauca"]
  },
  {
    name: "Egypt",
    code: "EG",
    states: ["Alexandria", "Aswan", "Asyut", "Cairo", "Dakahlia", "Giza", "Luxor", "Port Said", "Red Sea", "Suez"]
  }
];

export const COUNTRIES_LIST = COUNTRIES_DATA.map(c => c.name);

export function getStatesForCountry(countryName: string): string[] {
  const found = COUNTRIES_DATA.find(c => c.name.toLowerCase() === countryName.toLowerCase());
  return found ? found.states : [];
}
