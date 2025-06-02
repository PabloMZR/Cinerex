// components/asientos/sala-cine.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { NumeracionSuperior } from "./numeracion-superior"
import { FilaAsientos } from "./fila-asientos"
import { Pantalla } from "./pantalla"
import { salaLayouts } from "@/data/sala-layouts"
import type { Seat } from "@/types"

interface SalaCineProps {
  tipoSala: string
  asientos: Seat[]
  asientosOcupados: string[]
  onAsientosSeleccionadosChange: (asientos: string[]) => void
}

export function SalaCine({ tipoSala, asientos, asientosOcupados, onAsientosSeleccionadosChange }: SalaCineProps) {
  const [asientosSeleccionados, setAsientosSeleccionados] = useState<string[]>([])
  
  // Obtener el layout según el tipo de sala
  const layout = salaLayouts[tipoSala] || salaLayouts["Estándar"]
  
  // Generar array de números de asientos
  const numerosAsientos = Array.from({ length: layout.asientosPorFila }, (_, i) => i + 1)

  // Maneja la selección/deselección de asientos
  const toggleAsiento = (asientoId: string) => {
    let nuevosAsientos: string[]

    if (asientosSeleccionados.includes(asientoId)) {
      nuevosAsientos = asientosSeleccionados.filter((a) => a !== asientoId)
    } else {
      nuevosAsientos = [...asientosSeleccionados, asientoId]
    }

    setAsientosSeleccionados(nuevosAsientos)
    onAsientosSeleccionadosChange(nuevosAsientos)
  }

  // Variantes para la animación de las filas
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 relative">
      {/* Pantalla del cine */}
      <Pantalla />

      {/* Contenedor de asientos con efecto de perspectiva */}
      <motion.div
        className="w-full flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Numeración de asientos en la parte superior */}
        <NumeracionSuperior asientos={numerosAsientos} espacios={layout.espacios} />

        {/* Filas de asientos */}
        {layout.filas.map((fila, filaIndex) => (
          <FilaAsientos
            key={fila}
            fila={fila}
            asientos={numerosAsientos}
            espacios={layout.espacios}
            filaIndex={filaIndex}
            asientosSeleccionados={asientosSeleccionados}
            asientosOcupados={asientosOcupados}
            onToggleAsiento={toggleAsiento}
          />
        ))}

        {/* Leyenda de ubicación */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-center mt-8 text-sm text-gray-500 bg-gradient-to-r from-transparent via-[#164187]/5 to-transparent py-2 rounded-md"
        >
          La parte superior de la sala es la más cercana a la pantalla
        </motion.div>
      </motion.div>
    </div>
  )
}