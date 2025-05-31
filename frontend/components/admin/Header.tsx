"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface HeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <h1 className="text-xl font-bold">Panel de Administración</h1>
        <div className="md:hidden">
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList>
              <TabsTrigger value="peliculas">Películas</TabsTrigger>
              <TabsTrigger value="funciones">Funciones</TabsTrigger>
              <TabsTrigger value="salas">Salas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </header>
  )
} 