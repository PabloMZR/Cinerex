// components/asientos/fila-asientos.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"
import { Asiento } from "./asiento"
import type { EstadoAsiento } from "@/types"

interface FilaAsientosProps {
  fila: string
  asientos: number[]
  filaIndex: number
  asientosSeleccionados: string[]
  asientosOcupados: string[]
  onToggleAsiento: (asientoId: string) => void
}

export function FilaAsientos({
  fila,
  asientos,
  filaIndex,
  asientosSeleccionados,
  asientosOcupados,
  onToggleAsiento,
}: FilaAsientosProps) {
  // Determina el estado de un asiento
  const getEstadoAsiento = (asientoId: string): EstadoAsiento => {
    if (asientosSeleccionados.includes(asientoId)) return "seleccionado"
    if (asientosOcupados.includes(asientoId)) return "ocupado"
    return "disponible"
  }

  // Calcula la escala según la posición de la fila
  const getEscala = () => {
    if (filaIndex < 2) return "scale(0.85)"
    if (filaIndex < 4) return "scale(0.9)"
    if (filaIndex < 6) return "scale(0.95)"
    return "scale(1)"
  }

  // Variantes para la animación de la fila
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <motion.div
      variants={rowVariants}
      className={`flex items-center mb-3 justify-center w-full`}
      style={{
        transform: getEscala(),
        transformOrigin: "center bottom",
      }}
    >
      {/* Etiqueta de fila izquierda */}
      <motion.div
        whileHover={{ scale: 1.2, color: "#2911f1" }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="w-6 h-6 flex items-center justify-center text-xs font-medium text-gray-500"
      >
        {fila}
      </motion.div>

      {/* Asientos */}
      <div className="flex gap-1 justify-center">
        {asientos.map((asiento, index) => {
          const asientoId = `${fila}${asiento}`
          const estado = getEstadoAsiento(asientoId)

          // Pasillo central
          const isPasilloCentral = index === 4 || index === 5

          return (
            <React.Fragment key={`asiento-${asientoId}`}>
              {isPasilloCentral && <div className="w-4"></div>}
              <Asiento id={asientoId} fila={fila} numero={asiento} estado={estado} onClick={onToggleAsiento} />
            </React.Fragment>
          )
        })}
      </div>

      {/* Etiqueta de fila derecha */}
      <motion.div
        whileHover={{ scale: 1.2, color: "#2911f1" }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="w-6 h-6 flex items-center justify-center text-xs font-medium text-gray-500"
      >
        {fila}
      </motion.div>
    </motion.div>
  )
}