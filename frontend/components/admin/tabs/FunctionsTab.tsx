"use client"

import { useState, useEffect } from "react"
import type { Movie, CinemaRoom, Function, CreateFunctionDto } from "@/types"
import { functionsApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface FunctionsTabProps {
  movies: Movie[]
  rooms: CinemaRoom[]
}

export function FunctionsTab({ movies, rooms }: FunctionsTabProps) {
  const [functions, setFunctions] = useState<Function[]>([])
  const [isAddingFunction, setIsAddingFunction] = useState(false)
  const [formData, setFormData] = useState({
    movieId: "",
    cinemaRoomId: "",
    date: "",
    time: "",
    price: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  // Obtener funciones reales
  useEffect(() => {
    fetchFunctions()
  }, [])

  const fetchFunctions = async () => {
    try {
      setIsLoading(true)
      const data = await functionsApi.getAll()
      setFunctions(data)
    } catch (error) {
      toast.error("Error al cargar funciones")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.movieId || !formData.cinemaRoomId || !formData.date || !formData.time || !formData.price) {
      toast.error("Completa todos los campos")
      return
    }
    try {
      setIsLoading(true)
      const startTime = new Date(`${formData.date}T${formData.time}`)
      const movie = movies.find(m => m.id === Number(formData.movieId));
      const duration = movie?.duration || 120; // duración en minutos por defecto
      const endTime = new Date(startTime.getTime() + duration * 60000).toISOString();
      const dto: CreateFunctionDto = {
        movieId: Number(formData.movieId),
        cinemaRoomId: Number(formData.cinemaRoomId),
        startTime: startTime.toISOString(),
        endTime,
        price: Number(formData.price),
        status: "active"
      }
      await functionsApi.create(dto)
      toast.success("Función creada correctamente")
      setIsAddingFunction(false)
      setFormData({ movieId: "", cinemaRoomId: "", date: "", time: "", price: "" })
      fetchFunctions()
    } catch (error: any) {
      toast.error(error?.message || "Error al crear función")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Funciones</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => setIsAddingFunction(!isAddingFunction)}
        >
          Nueva Función
        </button>
      </div>

      {/* Listado de funciones reales */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2">Película</th>
              <th className="px-4 py-2">Sala</th>
              <th className="px-4 py-2">Horario</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {functions.length > 0 ? (
              functions.map((funcion) => (
                <tr key={funcion.id} className="border-b">
                  <td className="px-4 py-2">{funcion.movie?.title}</td>
                  <td className="px-4 py-2">{funcion.cinemaRoom?.name}</td>
                  <td className="px-4 py-2">{new Date(funcion.startTime).toLocaleString()}</td>
                  <td className="px-4 py-2">${Number(funcion.price).toFixed(2)}</td>
                  <td className="px-4 py-2">{funcion.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-8">
                  No hay funciones programadas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Formulario para crear función */}
      {isAddingFunction && (
        (!Array.isArray(movies) || movies.length === 0 || !Array.isArray(rooms) || rooms.length === 0) ? (
          <div className="mt-8 p-4 bg-yellow-100 text-yellow-800 rounded">
            Debes tener al menos una película y una sala registradas para programar una función.
          </div>
        ) : (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Programar Nueva Función</CardTitle>
              <CardDescription>Completa el formulario para programar una nueva función.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="movieId">Película</Label>
                    <Select 
                      value={formData.movieId}
                      onValueChange={(value) => setFormData({...formData, movieId: value})}
                    >
                      <SelectTrigger id="movieId">
                        <SelectValue placeholder="Selecciona una película" />
                      </SelectTrigger>
                      <SelectContent>
                        {movies.map((movie) => (
                          <SelectItem key={movie.id} value={movie.id.toString()}>
                            {movie.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cinemaRoomId">Sala</Label>
                    <Select 
                      value={formData.cinemaRoomId}
                      onValueChange={(value) => setFormData({...formData, cinemaRoomId: value})}
                    >
                      <SelectTrigger id="cinemaRoomId">
                        <SelectValue placeholder="Selecciona una sala" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map((room) => (
                          <SelectItem key={room.id} value={room.id.toString()}>
                            {room.name} ({room.type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora</Label>
                    <Input 
                      id="time" 
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div className="flex justify-end">
                  <Button 
                    className="bg-[#2911f1] hover:bg-[#3c1edf]"
                    type="submit"
                    disabled={isLoading}
                  >
                    Guardar Función
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )
      )}
    </div>
  )
} 