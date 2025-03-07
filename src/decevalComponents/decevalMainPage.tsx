"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import "./App.css"
import FormularioRegistro from "./formulario-registro"
import PaginaPagare from "./pagina-pagare"

function DecevalMainPage() {
  const [pagina, setPagina] = useState("formulario") // 'formulario' o 'pagare'

  const cambiarPagina = () => {
    setPagina(pagina === "formulario" ? "pagare" : "formulario")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Registro de Deudor/Girador</h1>

        <div className="relative w-full h-full perspective-1000">
          <AnimatePresence mode="wait">
            {pagina === "formulario" ? (
              <motion.div
                key="formulario"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <FormularioRegistro cambiarPagina={cambiarPagina} />
              </motion.div>
            ) : (
              <motion.div
                key="pagare"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
                style={{ marginTop: "40px" }} // Mayor separación
              >
                <PaginaPagare cambiarPagina={cambiarPagina} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default DecevalMainPage

