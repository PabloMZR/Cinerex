// components/asientos/asiento.tsx
"use client"

import { motion } from "framer-motion"
import type { AsientoProps } from "@/types"

export function Asiento({ id, numero, estado, onClick }: AsientoProps) {
  return (
    <motion.button
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{
        scale: estado !== "ocupado" ? 1.1 : 1,
        y: estado !== "ocupado" ? -2 : 0,
      }}
      whileTap={{ scale: estado !== "ocupado" ? 0.95 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`
        w-7 h-7 rounded-t-lg flex items-center justify-center text-xs font-medium relative
        ${estado === "disponible" ? "border border-gray-300 hover:bg-[#3c1edf]/20 hover:border-[#3c1edf] shadow-sm" : ""}
        ${estado === "seleccionado" ? "bg-gradient-to-br from-[#2911f1] to-[#3c1edf] text-white border-none shadow-md" : ""}
        ${estado === "ocupado" ? "bg-gray-300 border border-gray-400 cursor-not-allowed opacity-70" : ""}
        transition-all duration-300
        before:content-[''] before:absolute before:bottom-0 before:left-1 before:right-1 before:h-[2px] 
        before:bg-gray-200 before:rounded-b
      `}
      onClick={() => estado !== "ocupado" && onClick(id)}
      disabled={estado === "ocupado"}
    >
      {numero}
    </motion.button>
  )
}
