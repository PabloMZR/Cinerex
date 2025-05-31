"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Film, Calendar, Users, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { logout } = useAuth()

  return (
    <div className="hidden md:flex w-64 flex-col bg-[#164187] text-white">
      <div className="p-4 flex items-center gap-2 border-b border-white/10">
        <Film className="h-6 w-6" />
        <span className="font-bold text-xl">CINEREX</span>
      </div>
      <div className="flex-1 py-6">
        <nav className="px-2 space-y-1">
          <Button
            variant="ghost"
            className={`w-full justify-start text-white hover:bg-white/10 ${
              activeTab === "peliculas" ? "bg-white/10" : ""
            }`}
            onClick={() => onTabChange("peliculas")}
          >
            <Film className="mr-2 h-4 w-4" />
            Películas
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-white hover:bg-white/10 ${
              activeTab === "funciones" ? "bg-white/10" : ""
            }`}
            onClick={() => onTabChange("funciones")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Funciones
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-white hover:bg-white/10 ${
              activeTab === "salas" ? "bg-white/10" : ""
            }`}
            onClick={() => onTabChange("salas")}
          >
            <Users className="mr-2 h-4 w-4" />
            Salas
          </Button>
        </nav>
      </div>
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </Button>
      </div>
    </div>
  )
} 