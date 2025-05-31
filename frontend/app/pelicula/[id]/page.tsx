// app/pelicula/[id]/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Film, Clock, Star, ChevronLeft } from 'lucide-react'
import { peliculas, salas, funciones } from "@/data/mock-data"
import type { Pelicula, Sala, Funcion } from "@/types"

interface PageParams {
  id: string
}

export default function PeliculaDetalle({ params }: { params: PageParams }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("hoy")
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string | null>(null)

  // Validación y búsqueda de la película con tipos
  const peliculaId = Number(params.id)
  const pelicula: Pelicula | undefined = peliculas.find((p: Pelicula) => p.id === peliculaId)

  if (!pelicula) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Película no encontrada</h1>
          <Link href="/" className="text-[#2911f1] hover:underline">
            Volver a cartelera
          </Link>
        </div>
      </div>
    )
  }

  // Filtrar funciones con tipos
  const funcionesPelicula: Funcion[] = funciones.filter((f: Funcion) => 
    f.pelicula === pelicula.titulo && 
    f.fecha === "13/05/2025"
  )

  // Función tipada para obtener horarios
  const getHorariosPorSala = (salaId: number): string[] => {
    return funcionesPelicula
      .filter((f: Funcion) => f.sala === salaId)
      .map((f: Funcion) => f.hora)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-[#2911f1]" />
              <span className="font-bold text-xl">CINEREX</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 container py-8">
        <Link href="/" className="inline-flex items-center text-[#2911f1] hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a cartelera
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sección izquierda - Info película */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="aspect-[2/3] overflow-hidden rounded-lg mb-4">
                <Image
                  src={pelicula.imagen}
                  alt={`Poster de ${pelicula.titulo}`}
                  width={300}
                  height={450}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{pelicula.calificacion}</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{pelicula.duracion}</span>
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {pelicula.generos.map((genero: string) => (
                  <Badge key={genero} variant="secondary">
                    {genero}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sección derecha - Horarios */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{pelicula.titulo}</h1>
            {pelicula.sinopsis && <p className="text-muted-foreground mb-6">{pelicula.sinopsis}</p>}

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Selecciona una fecha</h2>
              
              <Tabs value={fechaSeleccionada} onValueChange={setFechaSeleccionada} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="hoy">Hoy</TabsTrigger>
                  <TabsTrigger value="manana">Mañana</TabsTrigger>
                  <TabsTrigger value="pasado">Pasado</TabsTrigger>
                </TabsList>

                <TabsContent value="hoy" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {salas.map((sala: Sala) => {
                      const horarios = getHorariosPorSala(sala.id)
                      if (horarios.length === 0) return null
                      
                      return (
                        <Card key={sala.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <h3 className="font-semibold">Sala {sala.numero}</h3>
                                <p className="text-sm text-muted-foreground">{sala.tipo} - ${sala.precio.toFixed(2)}</p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {horarios.map((horario: string) => (
                                  <Button
                                    key={horario}
                                    variant={horarioSeleccionado === `${sala.id}-${horario}` ? "default" : "outline"}
                                    className={
                                      horarioSeleccionado === `${sala.id}-${horario}`
                                        ? "bg-[#2911f1] hover:bg-[#3c1edf]"
                                        : ""
                                    }
                                    onClick={() => setHorarioSeleccionado(`${sala.id}-${horario}`)}
                                  >
                                    {horario}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>

                {/* Contenido para otras fechas */}
                <TabsContent value="manana" className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Próximamente horarios para mañana
                  </div>
                </TabsContent>

                <TabsContent value="pasado" className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Próximamente horarios para pasado mañana
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex justify-end">
              <Button 
                size="lg" 
                className="bg-[#2911f1] hover:bg-[#3c1edf]" 
                disabled={!horarioSeleccionado}
                asChild
              >
                <Link href={horarioSeleccionado ? `/seleccion-asientos/${params.id}/${horarioSeleccionado}` : "#"}>
                  Seleccionar Asientos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-[#164187]/10">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © 2025 Cinerex S.A. de C.V. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}