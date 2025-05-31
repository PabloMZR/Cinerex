"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { 
  Movie, 
  CinemaRoom, 
  Seat, 
  Ticket, 
  CreateMovieDto,
  CreateCinemaRoomDto,
  CreateSeatDto,
  CreateTicketDto,
  ApiError
} from "@/types"
import { moviesApi, cinemaRoomsApi, seatsApi, ticketsApi } from "@/lib/api"

/**
 * Tipo para el contexto de la aplicación
 * Define todas las propiedades y métodos disponibles en el contexto
 */
interface AppContextType {
  // Estado
  movies: Movie[]
  cinemaRooms: CinemaRoom[]
  seats: Seat[]
  tickets: Ticket[]
  loading: boolean
  error: string | null

  // Métodos para películas
  addMovie: (movie: CreateMovieDto) => Promise<void>
  updateMovie: (id: number, movie: Partial<Movie> | FormData) => Promise<void>
  deleteMovie: (id: number) => Promise<void>

  // Métodos para salas
  addCinemaRoom: (room: CreateCinemaRoomDto) => Promise<void>
  updateCinemaRoom: (id: number, room: Partial<CinemaRoom>) => Promise<void>
  deleteCinemaRoom: (id: number) => Promise<void>

  // Métodos para asientos
  addSeat: (seat: CreateSeatDto) => Promise<void>
  updateSeat: (id: number, seat: Partial<Seat>) => Promise<void>
  deleteSeat: (id: number) => Promise<void>

  // Métodos para tickets
  addTicket: (ticket: CreateTicketDto) => Promise<void>
  updateTicket: (id: number, ticket: Partial<Ticket>) => Promise<void>
  deleteTicket: (id: number) => Promise<void>
}

// Crear el contexto
const AppContext = createContext<AppContextType | undefined>(undefined)

/**
 * Proveedor del contexto de la aplicación
 * Maneja todo el estado global y los métodos para interactuar con él
 */
export function AppProvider({ children }: { children: ReactNode }) {
  // Estado inicial
  const [movies, setMovies] = useState<Movie[]>([])
  const [cinemaRooms, setCinemaRooms] = useState<CinemaRoom[]>([])
  const [seats, setSeats] = useState<Seat[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        const [moviesRes, roomsRes] = await Promise.all([
          moviesApi.getAll(),
          cinemaRoomsApi.getAll()
        ])
        setMovies(moviesRes)
        setCinemaRooms(roomsRes)
      } catch (error) {
        const apiError = error as ApiError
        setError(apiError.message)
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  // Métodos para películas
  const addMovie = async (movie: CreateMovieDto) => {
    try {
      setLoading(true)
      const response = await moviesApi.create(movie)
      if (!response) return; // No actualices el estado si la respuesta es inválida
      setMovies(prevMovies => Array.isArray(prevMovies) ? [...prevMovies, response] : [response])
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateMovie = async (id: number, movie: Partial<Movie> | FormData) => {
    try {
      setLoading(true)
      const response = await moviesApi.update(id, movie)
      setMovies(prevMovies => prevMovies.map(m => m.id === id ? response : m))
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteMovie = async (id: number) => {
    try {
      setLoading(true)
      await moviesApi.delete(id)
      setMovies(movies.filter(m => m.id !== id))
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Métodos para salas
  const addCinemaRoom = async (room: CreateCinemaRoomDto) => {
    try {
      setLoading(true)
      const response = await cinemaRoomsApi.create(room)
      if (!response) return; // No actualices el estado si la respuesta es inválida
      setCinemaRooms(prevRooms => Array.isArray(prevRooms) ? [...prevRooms, response] : [response])
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateCinemaRoom = async (id: number, room: Partial<CinemaRoom>) => {
    try {
      setLoading(true)
      const response = await cinemaRoomsApi.update(id, room)
      setCinemaRooms(prevRooms => prevRooms.map(r => r.id === id ? response : r))
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteCinemaRoom = async (id: number) => {
    try {
      setLoading(true)
      await cinemaRoomsApi.delete(id)
      setCinemaRooms(cinemaRooms.filter(r => r.id !== id))
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Métodos para asientos
  const addSeat = async (seat: CreateSeatDto) => {
    try {
      setLoading(true)
      const response = await seatsApi.create(seat)
      setSeats(prevSeats => [...prevSeats, response])
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateSeat = async (id: number, seat: Partial<Seat>) => {
    try {
      setLoading(true)
      const response = await seatsApi.update(id, seat)
      setSeats(prevSeats => prevSeats.map(s => s.id === id ? response : s))
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteSeat = async (id: number) => {
    try {
      setLoading(true)
      await seatsApi.delete(id)
      setSeats(seats.filter(s => s.id !== id))
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Métodos para tickets
  const addTicket = async (ticket: CreateTicketDto) => {
    try {
      setLoading(true)
      const response = await ticketsApi.create(ticket)
      setTickets(prevTickets => [...prevTickets, response])
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateTicket = async (id: number, ticket: Partial<Ticket>) => {
    try {
      setLoading(true)
      const response = await ticketsApi.update(id, ticket)
      setTickets(prevTickets => prevTickets.map(t => t.id === id ? response : t))
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteTicket = async (id: number) => {
    try {
      setLoading(true)
      await ticketsApi.delete(id)
      setTickets(tickets.filter(t => t.id !== id))
    } catch (error) {
      const apiError = error as ApiError
      setError(apiError.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Métodos para salas
  const addRoom = addCinemaRoom;
  const updateRoom = updateCinemaRoom;
  const deleteRoom = deleteCinemaRoom;

  return (
    <AppContext.Provider
      value={{
        movies,
        cinemaRooms,
        seats,
        tickets,
        loading,
        error,
        addMovie,
        updateMovie,
        deleteMovie,
        addCinemaRoom,
        updateCinemaRoom,
        deleteCinemaRoom,
        addRoom,
        updateRoom,
        deleteRoom,
        addSeat,
        updateSeat,
        deleteSeat,
        addTicket,
        updateTicket,
        deleteTicket
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

/**
 * Hook personalizado para usar el contexto de la aplicación
 * @throws Error si se usa fuera de un AppProvider
 */
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp debe ser usado dentro de un AppProvider")
  }
  return context
} 