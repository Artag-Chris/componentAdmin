"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

import { DateSelector } from "./date-selector"
import { LocationSelector } from "./location-selector"

interface FormularioRegistroProps {
  cambiarPagina: () => void
}

export default function FormularioRegistro({ cambiarPagina }: FormularioRegistroProps) {
  const [formData, setFormData] = useState({
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    correoElectronico: "",
    direccionActual: "",
    telefonoFijo: "",
    numeroCelular: "",
    fax: "",
    paisActual: "",
    departamentoActual: "",
    ciudadActual: "",
    fechaExpedicion: "",
    paisNacimiento: "",
    regionNacimiento: "",
    ciudadNacimiento: "",
    fechaNacimiento: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleLocationChange = (type: string, value: string) => {
    setFormData({
      ...formData,
      [type]: value,
    })
  }

  const handleDateChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validar campos requeridos
    if (!formData.nombres) newErrors.nombres = "Este campo es requerido"
    if (!formData.primerApellido) newErrors.primerApellido = "Este campo es requerido"
    if (!formData.correoElectronico) newErrors.correoElectronico = "Este campo es requerido"
    else if (!/\S+@\S+\.\S+/.test(formData.correoElectronico))
      newErrors.correoElectronico = "Correo electrónico inválido"
    if (!formData.direccionActual) newErrors.direccionActual = "Este campo es requerido"
    if (!formData.numeroCelular) newErrors.numeroCelular = "Este campo es requerido"
    if (!formData.paisActual) newErrors.paisActual = "Este campo es requerido"
    if (!formData.departamentoActual) newErrors.departamentoActual = "Este campo es requerido"
    if (!formData.ciudadActual) newErrors.ciudadActual = "Este campo es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Datos del formulario:", formData)
      cambiarPagina()
    }
  }

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-4 relative z-10"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute -bottom-6 -right-6 w-full h-full bg-gray-200 rounded-lg -z-10"></div>

      <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Información Personal</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Nombres y Apellidos */}
          <div>
            <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-1">
              Nombres*
            </label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              className={`w-full px-3 py-1.5 border ${errors.nombres ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50`}
            />
            {errors.nombres && <p className="text-red-500 text-xs mt-1">{errors.nombres}</p>}
          </div>

          <div>
            <label htmlFor="primerApellido" className="block text-sm font-medium text-gray-700 mb-1">
              Primer Apellido*
            </label>
            <input
              type="text"
              id="primerApellido"
              name="primerApellido"
              value={formData.primerApellido}
              onChange={handleChange}
              className={`w-full px-3 py-1.5 border ${errors.primerApellido ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50`}
            />
            {errors.primerApellido && <p className="text-red-500 text-xs mt-1">{errors.primerApellido}</p>}
          </div>

          <div>
            <label htmlFor="segundoApellido" className="block text-sm font-medium text-gray-700 mb-1">
              Segundo Apellido
            </label>
            <input
              type="text"
              id="segundoApellido"
              name="segundoApellido"
              value={formData.segundoApellido}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="correoElectronico" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico*
            </label>
            <input
              type="email"
              id="correoElectronico"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleChange}
              className={`w-full px-3 py-1.5 border ${errors.correoElectronico ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50`}
            />
            {errors.correoElectronico && <p className="text-red-500 text-xs mt-1">{errors.correoElectronico}</p>}
          </div>
        </div>

        {/* Dirección y Teléfonos */}
        <div>
          <label htmlFor="direccionActual" className="block text-sm font-medium text-gray-700 mb-1">
            Dirección Actual*
          </label>
          <input
            type="text"
            id="direccionActual"
            name="direccionActual"
            value={formData.direccionActual}
            onChange={handleChange}
            className={`w-full px-3 py-1.5 border ${errors.direccionActual ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50`}
          />
          {errors.direccionActual && <p className="text-red-500 text-xs mt-1">{errors.direccionActual}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label htmlFor="telefonoFijo" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono Fijo
            </label>
            <input
              type="tel"
              id="telefonoFijo"
              name="telefonoFijo"
              value={formData.telefonoFijo}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="numeroCelular" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Celular*
            </label>
            <input
              type="tel"
              id="numeroCelular"
              name="numeroCelular"
              value={formData.numeroCelular}
              onChange={handleChange}
              className={`w-full px-3 py-1.5 border ${errors.numeroCelular ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50`}
            />
            {errors.numeroCelular && <p className="text-red-500 text-xs mt-1">{errors.numeroCelular}</p>}
          </div>

          <div>
            <label htmlFor="fax" className="block text-sm font-medium text-gray-700 mb-1">
              Fax
            </label>
            <input
              type="text"
              id="fax"
              name="fax"
              value={formData.fax}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 bg-gray-50"
            />
          </div>
        </div>

        {/* Ubicación Actual */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Domicilio Actual</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <LocationSelector
              label="País Actual*"
              type="paisActual"
              value={formData.paisActual}
              onChange={handleLocationChange}
              error={errors.paisActual}
            />

            <LocationSelector
              label="Departamento Actual*"
              type="departamentoActual"
              value={formData.departamentoActual}
              onChange={handleLocationChange}
              error={errors.departamentoActual}
              dependsOn={formData.paisActual}
            />

            <LocationSelector
              label="Ciudad Actual*"
              type="ciudadActual"
              value={formData.ciudadActual}
              onChange={handleLocationChange}
              error={errors.ciudadActual}
              dependsOn={formData.departamentoActual}
            />
          </div>
        </div>

        {/* Fecha de Expedición */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Fecha de Expedición del Documento</h3>
          <div className="max-w-xs">
            <DateSelector name="fechaExpedicion" value={formData.fechaExpedicion} onChange={handleDateChange} />
          </div>
        </div>

        {/* Lugar y Fecha de Nacimiento */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Lugar y Fecha de Nacimiento</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <LocationSelector
              label="País de Nacimiento"
              type="paisNacimiento"
              value={formData.paisNacimiento}
              onChange={handleLocationChange}
            />

            <LocationSelector
              label="Región de Nacimiento"
              type="regionNacimiento"
              value={formData.regionNacimiento}
              onChange={handleLocationChange}
              dependsOn={formData.paisNacimiento}
            />

            <LocationSelector
              label="Ciudad de Nacimiento"
              type="ciudadNacimiento"
              value={formData.ciudadNacimiento}
              onChange={handleLocationChange}
              dependsOn={formData.regionNacimiento}
            />
          </div>

          <div className="max-w-xs">
            <DateSelector
              name="fechaNacimiento"
              label="Fecha de Nacimiento"
              value={formData.fechaNacimiento}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            className="px-5 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Continuar al Pagaré
          </button>
        </div>
      </form>
    </motion.div>
  )
}

