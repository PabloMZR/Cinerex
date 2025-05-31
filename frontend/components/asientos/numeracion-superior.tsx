// components/asientos/numeracion-superior.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"

interface NumeracionSuperiorProps {
  asientos: number[]
}

export function NumeracionSuperior({ asientos }: NumeracionSuperiorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex justify-center w-full mb-4 px-8"
    >
      <div className="w-6"></div> {/* Espacio para alinear con etiqueta de fila */}
      <div className="flex justify-center w-full">
        {asientos.map((asiento, index) => {
          // Pasillo central
          const isPasilloCentral = index === 4 || index === 5

          return (
            <React.Fragment key={`num-${asiento}`}>
              {isPasilloCentral && <div className="w-4"></div>}
              <motion.div
                whileHover={{ y: -2, color: "#2911f1" }}
                className="w-7 text-center text-xs text-gray-500 mx-0.5 font-medium"
              >
                {asiento}
              </motion.div>
            </React.Fragment>
          )
        })}
      </div>
      <div className="w-6"></div> {/* Espacio para alinear con etiqueta de fila */}
    </motion.div>
  )
}