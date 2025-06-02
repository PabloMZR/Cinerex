// types/index.ts
// Tipos para películas
export interface Pelicula {
  id: number
  titulo: string
  imagen: string
  calificacion: string
  duracion: string
  generos: string[]
  sinopsis?: string
}

// Tipos para salas
export interface Sala {
  id: number
  numero: number
  tipo: string
  precio: number
  capacidad?: number
}

// Tipos para funciones
export interface Funcion {
  id: number
  pelicula: string
  sala: number
  fecha: string
  hora: string
}

// Tipos para asientos
export type EstadoAsiento = "disponible" | "seleccionado" | "ocupado"

export interface AsientoProps {
  id: string
  fila: string
  numero: number
  estado: EstadoAsiento
  onClick: (id: string) => void
}

export interface Location {
  id: number;
  name: string;
  address?: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number;
  startTime: string;
  posterUrl?: string;
  cinemaRoomId: number;
  cinemaRoom?: CinemaRoom;
  rating?: string;
  genres?: string[];
  fechaEstreno?: string; // Para próximos estrenos
}

export interface CinemaRoom {
  id: number;
  name: string;
  type: string;
  price: number;
  seats?: Seat[];
  locationId?: number;
  location?: Location;
}

export interface Seat {
  id: number;
  row: string;
  number: string;
  status: boolean;
  cinemaRoomId?: number;
  cinemaRoom?: CinemaRoom;
}

export interface Function {
  id: number;
  movieId: number;
  movie: Movie;
  cinemaRoomId: number;
  cinemaRoom: CinemaRoom;
  startTime: string;
  endTime?: string;
  price: number;
  status: string;
}

export interface Ticket {
  id: number;
  functionId: number;
  function: Function;
  seats: Seat[];
  total: number;
}

// DTOs para creación
export type CreateMovieDto = {
  title: string;
  description?: string;
  duration: number;
  startTime?: Date;
  cinemaRoomId?: number;
  genre?: string;
  rating?: string;
  synopsis?: string;
  image?: File;
} | FormData;

export interface CreateCinemaRoomDto {
  name: string;
  locationId: number;
  seats: CreateSeatDto[];
}

export interface CreateSeatDto {
  code: string;
  isAvailable?: boolean;
}

export interface CreateTicketDto {
  functionId: number;
  seatIds: number[];
  total: number;
}

export interface CreateFunctionDto {
  movieId: number;
  cinemaRoomId: number;
  startTime: string;
  endTime?: string;
  price: number;
  status?: string;
}

export interface UpdateFunctionDto extends Partial<CreateFunctionDto> {}

// Tipos para la API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}