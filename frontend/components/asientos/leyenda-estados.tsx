// components/asientos/leyenda-estados.tsx
"use client"

import { motion } from "framer-motion"

export function LeyendaEstados() {
  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="flex items-center gap-4">
      <motion.div
        className="flex items-center gap-2"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <div className="w-4 h-4 rounded-sm border border-gray-300 shadow-sm"></div>
        <span className="text-xs">Disponible</span>
      </motion.div>
      <motion.div
        className="flex items-center gap-2"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-[#2911f1] to-[#3c1edf] shadow-sm"></div>
        <span className="text-xs">Seleccionado</span>
      </motion.div>
      <motion.div
        className="flex items-center gap-2"
        custom={2}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <div className="w-4 h-4 rounded-sm bg-gray-300 opacity-70 shadow-sm"></div>
        <span className="text-xs">Ocupado</span>
      </motion.div>
    </div>
  )
}