"use client"

import { motion } from "framer-motion"

interface PaginaPagareProps {
  cambiarPagina: () => void
}

export default function PaginaPagare({ cambiarPagina }: PaginaPagareProps) {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-4 relative z-10"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute -bottom-8 -right-8 w-full h-full bg-gray-200 rounded-lg -z-10"></div>

      <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Pagaré</h2>

      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500 text-lg">Aquí va un PDF</p>
      </div>

      <div className="pt-4 flex justify-start">
        <button
          onClick={cambiarPagina}
          className="px-5 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Volver al Formulario
        </button>
      </div>
    </motion.div>
  )
}

