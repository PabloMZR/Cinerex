// components/layout/header.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Film } from 'lucide-react'

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center">
        <motion.div className="mr-4 flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Film className="h-6 w-6 text-[#2911f1]" />
            </motion.div>
            <motion.span
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-bold text-xl bg-gradient-to-r from-[#2911f1] to-[#3c1edf] bg-clip-text text-transparent"
            >
              CINEREX
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  )
}