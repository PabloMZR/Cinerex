// components/asientos/asiento.tsx
"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AsientoProps {
  id: string
  seleccionado: boolean
  ocupado: boolean
  onClick: () => void
}

export function Asiento({ id, seleccionado, ocupado, onClick }: AsientoProps) {
  return (
    <motion.button
      whileHover={!ocupado ? { scale: 1.1 } : undefined}
      whileTap={!ocupado ? { scale: 0.95 } : undefined}
      onClick={!ocupado ? onClick : undefined}
      className={cn(
        "w-8 h-8 rounded-t-lg border-2 transition-colors duration-200",
        ocupado
          ? "bg-gray-200 border-gray-300 cursor-not-allowed"
          : seleccionado
          ? "bg-[#2911f1] border-[#2911f1] hover:bg-[#3c1edf] hover:border-[#3c1edf]"
          : "bg-white border-gray-300 hover:border-[#2911f1]"
      )}
      aria-label={`Asiento ${id}`}
      disabled={ocupado}
    />
  )
}
