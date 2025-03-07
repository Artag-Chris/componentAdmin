"use client"

interface DateSelectorProps {
  name: string
  label?: string
  value: string
  onChange: (name: string, value: string) => void
}

export function DateSelector({ name, label, value, onChange }: DateSelectorProps) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50"
      />
    </div>
  )
}

