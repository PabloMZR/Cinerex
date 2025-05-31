// app/admin/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/admin/Sidebar"
import { Header } from "@/components/admin/Header"
import { MoviesTab } from "@/components/admin/tabs/MoviesTab"
import { FunctionsTab } from "@/components/admin/tabs/FunctionsTab"
import { RoomsTab } from "@/components/admin/tabs/RoomsTab"
import { moviesApi, cinemaRoomsApi } from "@/lib/api"
import type { Movie, CinemaRoom } from "@/types"

console.log("Renderizando AdminDashboard");

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("peliculas")
  const [movies, setMovies] = useState<Movie[]>([])
  const [rooms, setRooms] = useState<CinemaRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [moviesData, roomsData] = await Promise.all([
          moviesApi.getAll(),
          cinemaRoomsApi.getAll()
        ])
        setMovies(moviesData)
        setRooms(roomsData)
      } catch (err) {
        setError("Error al cargar los datos")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
  return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
        </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="container py-8">
          {activeTab === "peliculas" && <MoviesTab movies={movies} />}
          {activeTab === "funciones" && <FunctionsTab movies={movies} rooms={rooms} />}
          {activeTab === "salas" && <RoomsTab rooms={rooms} />}
        </main>
      </div>
    </div>
  )
}

// Datos de ejemplo
const peliculas = [
  {
    id: 1,
    titulo: "Dune: Parte Dos",
    duracion: "2h 46m",
    calificacion: "8.5",
  },
  {
    id: 2,
    titulo: "Kung Fu Panda 4",
    duracion: "1h 34m",
    calificacion: "7.8",
  },
  {
    id: 3,
    titulo: "Godzilla x Kong: El Nuevo Imperio",
    duracion: "1h 55m",
    calificacion: "7.2",
  },
  {
    id: 4,
    titulo: "Ghostbusters: Imperio Helado",
    duracion: "1h 45m",
    calificacion: "7.0",
  },
]

const salas = [
  {
    id: 1,
    numero: 1,
    tipo: "Estándar",
    capacidad: 120,
  },
  {
    id: 2,
    numero: 2,
    tipo: "VIP",
    capacidad: 80,
  },
  {
    id: 3,
    numero: 3,
    tipo: "3D",
    capacidad: 100,
  },
]

const funciones = [
  {
    id: 1,
    pelicula: "Dune: Parte Dos",
    sala: 1,
    fecha: "13/05/2025",
    hora: "13:30",
  },
  {
    id: 2,
    pelicula: "Dune: Parte Dos",
    sala: 1,
    fecha: "13/05/2025",
    hora: "16:15",
  },
  {
    id: 3,
    pelicula: "Kung Fu Panda 4",
    sala: 2,
    fecha: "13/05/2025",
    hora: "14:00",
  },
  {
    id: 4,
    pelicula: "Godzilla x Kong: El Nuevo Imperio",
    sala: 3,
    fecha: "13/05/2025",
    hora: "15:30",
  },
]