"use client"

interface LocationSelectorProps {
  label: string
  type: string
  value: string
  onChange: (type: string, value: string) => void
  error?: string
  dependsOn?: string
}

// Datos de ejemplo - Normalmente estos vendrían de una API o base de datos
const paises = ["Colombia", "México", "España", "Argentina", "Chile", "Perú"]
const departamentos = {
  Colombia: ["Antioquia", "Cundinamarca", "Valle del Cauca", "Atlántico", "Santander"],
  México: ["Ciudad de México", "Jalisco", "Nuevo León", "Puebla", "Veracruz"],
  España: ["Madrid", "Cataluña", "Andalucía", "Valencia", "País Vasco"],
  Argentina: ["Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Tucumán"],
  Chile: ["Santiago", "Valparaíso", "Biobío", "Antofagasta", "O'Higgins"],
  Perú: ["Lima", "Arequipa", "Cusco", "La Libertad", "Piura"],
}

const ciudades = {
  Antioquia: ["Medellín", "Envigado", "Bello", "Itagüí", "Rionegro"],
  Cundinamarca: ["Bogotá", "Soacha", "Zipaquirá", "Chía", "Mosquera"],
  "Valle del Cauca": ["Cali", "Buenaventura", "Palmira", "Tuluá", "Yumbo"],
  "Ciudad de México": ["Cuauhtémoc", "Miguel Hidalgo", "Tlalpan", "Coyoacán", "Gustavo A. Madero"],
  Madrid: ["Madrid", "Alcalá de Henares", "Getafe", "Leganés", "Móstoles"],
  "Buenos Aires": ["Buenos Aires", "La Plata", "Mar del Plata", "Quilmes", "Lanús"],
  // Por brevedad, no se incluyen todas las ciudades
}

export function LocationSelector({ label, type, value, onChange, error, dependsOn }: LocationSelectorProps) {
  // Determinar las opciones disponibles según el tipo y dependencia
  const getOptions = () => {
    if (type.includes("pais")) {
      return paises
    } else if (type.includes("departamento") || type.includes("region")) {
      const selectedPais = dependsOn || ""
      return (selectedPais && departamentos[selectedPais as keyof typeof departamentos]) || []
    } else if (type.includes("ciudad")) {
      const selectedDepartamento = dependsOn || ""
      return (selectedDepartamento && ciudades[selectedDepartamento as keyof typeof ciudades]) || []
    }
    return []
  }

  const options = getOptions()
  const isDisabled =
    type.includes("departamento") || type.includes("region") || type.includes("ciudad") ? !dependsOn : false

  return (
    <div>
      <label htmlFor={type} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={type}
        value={value}
        onChange={(e) => onChange(type, e.target.value)}
        disabled={isDisabled}
        className={`w-full px-3 py-1.5 border ${error ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50 ${isDisabled ? "bg-gray-100 text-gray-400" : ""}`}
      >
        <option value="">Seleccionar</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

