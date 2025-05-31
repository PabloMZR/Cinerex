export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  genre: string;
  director: string;
  cast: string[];
  posterUrl: string;
  trailerUrl: string;
  rating: number;
}

export interface Showtime {
  id: number;
  movieId: number;
  theaterId: number;
  startTime: string;
  endTime: string;
  price: number;
  availableSeats: number;
}

export interface Theater {
  id: number;
  name: string;
  location: string;
  capacity: number;
  rows: number;
  columns: number;
}

export interface Booking {
  id: number;
  userId: number;
  showtimeId: number;
  seats: string[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
} 