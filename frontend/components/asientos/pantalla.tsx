// components/asientos/pantalla.tsx
"use client"

import { motion } from "framer-motion"

export function Pantalla() {
  return (
    <div className="relative w-full mb-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-12 mx-auto bg-gradient-to-b from-gray-300 to-gray-200 flex items-center justify-center text-sm font-medium text-[#164187] rounded-sm transform perspective-500 rotateX-10 shadow-lg relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-[#2911f1]/0 via-[#3c1edf]/10 to-[#2911f1]/0"
        />
        PANTALLA
      </motion.div>

      {/* Efecto de luz proyectada */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-[90%] h-4 bg-[#3c1edf] blur-xl rounded-full"
      />
    </div>
  )
}