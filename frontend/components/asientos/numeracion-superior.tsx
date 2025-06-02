// components/asientos/numeracion-superior.tsx
"use client"

import React from "react"
import { motion } from "framer-motion"

interface NumeracionSuperiorProps {
  asientos: number[]
  espacios?: number[]
}

export function NumeracionSuperior({ asientos, espacios = [] }: NumeracionSuperiorProps) {
  return (
    <div className="flex justify-center mb-8 text-sm text-gray-500">
      {asientos.map((numero) => (
        <>
          <motion.div
            key={numero}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + numero * 0.05 }}
            className="w-8 text-center"
          >
            {numero}
          </motion.div>
          {espacios?.includes(numero) && <div className="w-4" />}
        </>
      ))}
    </div>
  )
}