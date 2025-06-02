// components/asientos/fila-asientos.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"
import { Asiento } from "./asiento"
import type { EstadoAsiento } from "@/types"

interface FilaAsientosProps {
  fila: string
  asientos: number[]
  espacios?: number[]
  filaIndex: number
  asientosSeleccionados: string[]
  asientosOcupados: string[]
  onToggleAsiento: (asientoId: string) => void
}

export function FilaAsientos({
  fila,
  asientos,
  espacios = [],
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * filaIndex }}
      className="flex items-center justify-center mb-4"
    >
      {/* Etiqueta de fila */}
      <div className="w-8 text-center text-sm font-medium text-gray-500">
        {fila}
      </div>

      {/* Asientos */}
      <div className="flex">
        {asientos.map((numero) => (
          <>
            <Asiento
              key={`${fila}${numero}`}
              id={`${fila}${numero}`}
              seleccionado={asientosSeleccionados.includes(`${fila}${numero}`)}
              ocupado={asientosOcupados.includes(`${fila}${numero}`)}
              onClick={() => onToggleAsiento(`${fila}${numero}`)}
            />
            {espacios?.includes(numero) && <div className="w-4" />}
          </>
        ))}
      </div>

      {/* Etiqueta de fila (derecha) */}
      <div className="w-8 text-center text-sm font-medium text-gray-500">
        {fila}
      </div>
    </motion.div>
  )
}