// components/layout/footer.tsx
"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="border-t bg-gradient-to-r from-[#164187]/10 via-[#2911f1]/5 to-[#164187]/10"
    >
      <div className="container py-6 text-center text-sm text-muted-foreground">
        © 2025 Cinerex S.A. de C.V. Todos los derechos reservados.
      </div>
    </motion.footer>
  )
}