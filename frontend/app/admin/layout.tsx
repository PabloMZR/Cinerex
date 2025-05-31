"use client"

import { usePathname } from "next/navigation"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"

console.log("Renderizando AdminLayout");

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  if (isLoginPage) {
    return <>{children}</>
  }

  return <ProtectedRoute>{children}</ProtectedRoute>
} 