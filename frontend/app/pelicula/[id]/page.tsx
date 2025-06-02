// app/pelicula/[id]/page.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Film, Clock, Star, ChevronLeft } from 'lucide-react'
import { moviesApi, functionsApi } from "@/lib/api"
import type { Movie, Function, CinemaRoom } from "@/types"

interface PageParams {
  id: string
}

export default function PeliculaDetalle({ params }: { params: PageParams }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("hoy")
  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string | null>(null)
  const [movie, setMovie] = useState<Movie | null>(null)
  const [functions, setFunctions] = useState<Function[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Helper function to organize functions by date
  const getFunctionsByDate = (date: 'today' | 'tomorrow' | 'dayAfter') => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const dayAfter = new Date(today)
    dayAfter.setDate(dayAfter.getDate() + 2)

    return functions.filter(func => {
      const functionDate = new Date(func.startTime)
      functionDate.setHours(0, 0, 0, 0)
      
      switch (date) {
        case 'today':
          return functionDate.getTime() === today.getTime()
        case 'tomorrow':
          return functionDate.getTime() === tomorrow.getTime()
        case 'dayAfter':
          return functionDate.getTime() === dayAfter.getTime()
        default:
          return false
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Ensure params.id is a valid number
        const movieId = parseInt(params.id)
        if (isNaN(movieId)) {
          throw new Error('ID de película inválido')
        }

        // Fetch movie and functions data
        const [movieData, functionsData] = await Promise.all([
          moviesApi.getOne(movieId).catch(err => {
            console.error('Error fetching movie:', err)
            throw new Error('No se pudo encontrar la película')
          }),
          functionsApi.getAll().catch(err => {
            console.error('Error fetching functions:', err)
            return [] as Function[]
          })
        ])

        if (!movieData) {
          throw new Error('No se encontró la película')
        }

        console.log('Movie data:', movieData)
        console.log('Functions data:', functionsData)

        setMovie(movieData)
        // Filter functions for this movie
        const movieFunctions = functionsData.filter(f => f.movie.id === movieId)
        setFunctions(movieFunctions)
      } catch (err) {
        console.error('Error loading data:', err)
        setError(err instanceof Error ? err.message : 'Error al cargar la información de la película')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2911f1] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando información de la película...</p>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {error || 'No se pudo encontrar la película'}
          </h1>
          <p className="text-muted-foreground mb-6">
            Lo sentimos, pero no pudimos encontrar la película que estás buscando.
          </p>
          <Link href="/" className="inline-flex items-center text-[#2911f1] hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a cartelera
          </Link>
        </div>
      </div>
    )
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
                <img
                  src={movie.posterUrl ? `${process.env.NEXT_PUBLIC_API_URL}${movie.posterUrl}` : "/placeholder.svg"}
                  alt={`Poster de ${movie.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                {movie.rating && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{movie.rating}</span>
                </Badge>
                )}
                {movie.duration && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                    <span>{movie.duration} min</span>
                </Badge>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {movie.genres?.map((genre: string) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sección derecha - Horarios */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            {movie.description && <p className="text-muted-foreground mb-6">{movie.description}</p>}

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
                    {getFunctionsByDate('today').map((func) => {
                      const functionTime = new Date(func.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      return (
                        <Card key={func.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <h3 className="font-semibold">Sala {func.cinemaRoom.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {func.cinemaRoom.type} - ${Number(func.price).toFixed(2)}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                  <Button
                                  variant={horarioSeleccionado === `${func.id}` ? "default" : "outline"}
                                    className={
                                    horarioSeleccionado === `${func.id}`
                                        ? "bg-[#2911f1] hover:bg-[#3c1edf]"
                                        : ""
                                    }
                                  onClick={() => setHorarioSeleccionado(`${func.id}`)}
                                  >
                                  {functionTime}
                                  </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                    {getFunctionsByDate('today').length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No hay funciones disponibles para hoy
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="manana" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {getFunctionsByDate('tomorrow').map((func) => {
                      const functionTime = new Date(func.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      return (
                        <Card key={func.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <h3 className="font-semibold">Sala {func.cinemaRoom.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {func.cinemaRoom.type} - ${Number(func.price).toFixed(2)}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  variant={horarioSeleccionado === `${func.id}` ? "default" : "outline"}
                                  className={
                                    horarioSeleccionado === `${func.id}`
                                      ? "bg-[#2911f1] hover:bg-[#3c1edf]"
                                      : ""
                                  }
                                  onClick={() => setHorarioSeleccionado(`${func.id}`)}
                                >
                                  {functionTime}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                    {getFunctionsByDate('tomorrow').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                        No hay funciones disponibles para mañana
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="pasado" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {getFunctionsByDate('dayAfter').map((func) => {
                      const functionTime = new Date(func.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      return (
                        <Card key={func.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <h3 className="font-semibold">Sala {func.cinemaRoom.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {func.cinemaRoom.type} - ${Number(func.price).toFixed(2)}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  variant={horarioSeleccionado === `${func.id}` ? "default" : "outline"}
                                  className={
                                    horarioSeleccionado === `${func.id}`
                                      ? "bg-[#2911f1] hover:bg-[#3c1edf]"
                                      : ""
                                  }
                                  onClick={() => setHorarioSeleccionado(`${func.id}`)}
                                >
                                  {functionTime}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                    {getFunctionsByDate('dayAfter').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                        No hay funciones disponibles para pasado mañana
                      </div>
                    )}
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
                <Link href={horarioSeleccionado ? `/seleccion-asientos/${horarioSeleccionado}` : "#"}>
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