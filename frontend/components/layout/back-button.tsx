// components/layout/back-button.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft } from 'lucide-react'

interface BackButtonProps {
  href: string
  label: string
}

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: -5 }}
    >
      <Link href={href} className="inline-flex items-center text-[#2911f1] hover:underline mb-6 group">
        <motion.div whileHover={{ x: -2 }} whileTap={{ x: -4 }}>
          <ChevronLeft className="h-4 w-4 mr-1 group-hover:text-[#3c1edf]" />
        </motion.div>
        <span>{label}</span>
      </Link>
    </motion.div>
  )
}