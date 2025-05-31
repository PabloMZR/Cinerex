import axios from 'axios';
import { 
  Movie, 
  CinemaRoom, 
  Seat, 
  Ticket, 
  CreateMovieDto,
  CreateCinemaRoomDto,
  CreateSeatDto,
  CreateTicketDto,
  ApiResponse,
  ApiError,
  Function,
  CreateFunctionDto,
  UpdateFunctionDto
} from '@/types';

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Cliente HTTP personalizado para la API
 * Configura los headers por defecto y maneja los errores
 */
const axiosInstance = axios.create({
  baseURL: API_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  withCredentials: true,
});

/**
 * Interceptor para agregar el token de autenticación a las peticiones
 */
axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers) config.headers = {};
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor para manejar errores de la API
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores específicos
    if (error.response?.status === 401) {
      // Redirigir al login si el token expiró
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    const apiError: ApiError = {
      message: error.response?.data?.message || 'Error en la petición',
      code: error.response?.status?.toString(),
      details: error.response?.data,
    };
    return Promise.reject(apiError);
  }
);

/**
 * Función auxiliar para manejar las respuestas de la API
 * @param response Respuesta de la API
 * @returns Datos de la respuesta
 */
const handleResponse = <T>(response: { data: ApiResponse<T> }): T => {
  return response.data.data;
};

/**
 * Cliente HTTP con métodos para interactuar con la API
 */
export const api = {
  /**
   * Realiza una petición GET
   * @param url URL del endpoint
   * @param params Parámetros de la query
   */
  get: async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    const response = await axiosInstance.get<ApiResponse<T>>(url, { params });
    return handleResponse(response);
  },

  /**
   * Realiza una petición POST
   * @param url URL del endpoint
   * @param data Datos a enviar
   */
  post: async <T>(url: string, data?: any): Promise<T> => {
    // Si data es FormData, no establecer Content-Type para que el navegador lo haga
    const config = data instanceof FormData ? { headers: {} } : undefined;
    const response = await axiosInstance.post<ApiResponse<T>>(url, data, config);
    return handleResponse(response);
  },

  /**
   * Realiza una petición PUT
   * @param url URL del endpoint
   * @param data Datos a enviar
   */
  put: async <T>(url: string, data?: any): Promise<T> => {
    const response = await axiosInstance.put<ApiResponse<T>>(url, data);
    return handleResponse(response);
  },

  /**
   * Realiza una petición PATCH
   * @param url URL del endpoint
   * @param data Datos a enviar
   */
  patch: async <T>(url: string, data?: any): Promise<T> => {
    const response = await axiosInstance.patch<ApiResponse<T>>(url, data);
    return handleResponse(response);
  },

  /**
   * Realiza una petición DELETE
   * @param url URL del endpoint
   */
  delete: async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.delete<ApiResponse<T>>(url);
    return handleResponse(response);
  },
};

export const moviesApi = {
  getAll: async () => {
    const response = await axios.get<Movie[]>(`${API_URL}/movies`);
    return response.data;
  },
  getOne: (id: number) => api.get<Movie>(`/movies/${id}`),
  create: (data: CreateMovieDto | FormData) => api.post<Movie>('/movies', data),
  update: (id: number, data: Partial<Movie> | FormData) => {
    if (data instanceof FormData) {
      return axios.patch(`${API_URL}/movies/${id}`, data).then(r => r.data)
    }
    return api.patch<Movie>(`/movies/${id}`, data)
  },
  delete: (id: number) => api.delete<void>(`/movies/${id}`),
  getUpcoming: () => api.get<Movie[]>('/movies/upcoming'),
};

export const cinemaRoomsApi = {
  getAll: async () => {
    const response = await axios.get<CinemaRoom[]>(`${API_URL}/cinema-room`);
    return response.data;
  },
  getOne: (id: number) => api.get<CinemaRoom>(`/cinema-room/${id}`),
  create: (data: CreateCinemaRoomDto) => api.post<CinemaRoom>('/cinema-room', data),
  update: (id: number, data: Partial<CinemaRoom>) => api.patch<CinemaRoom>(`/cinema-room/${id}`, data),
  delete: (id: number) => api.delete<void>(`/cinema-room/${id}`),
};

export const seatsApi = {
  getAll: () => api.get<Seat[]>('/seats'),
  getOne: (id: number) => api.get<Seat>(`/seats/${id}`),
  create: (data: CreateSeatDto) => api.post<Seat>('/seats', data),
  update: (id: number, data: Partial<Seat>) => api.patch<Seat>(`/seats/${id}`, data),
  delete: (id: number) => api.delete<void>(`/seats/${id}`),
};

export const functionsApi = {
  getAll: async (): Promise<Function[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/function`);
    if (!response.ok) throw new Error('Error al obtener las funciones');
    return response.json();
  },

  getUpcoming: async (): Promise<Function[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/function/upcoming`);
    if (!response.ok) throw new Error('Error al obtener las próximas funciones');
    return response.json();
  },

  getOne: async (id: number): Promise<Function> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/function/${id}`);
    if (!response.ok) throw new Error('Error al obtener la función');
    return response.json();
  },

  create: async (data: CreateFunctionDto): Promise<Function> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/function`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear la función');
    return response.json();
  },

  update: async (id: number, data: UpdateFunctionDto): Promise<Function> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/function/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al actualizar la función');
    return response.json();
  },

  remove: async (id: number): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/function/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar la función');
  },
};

export const ticketsApi = {
  getAll: async (): Promise<Ticket[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`);
    if (!response.ok) throw new Error('Error al obtener los tickets');
    return response.json();
  },

  getOne: async (id: number): Promise<Ticket> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${id}`);
    if (!response.ok) throw new Error('Error al obtener el ticket');
    return response.json();
  },

  create: async (data: CreateTicketDto): Promise<Ticket> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Error al crear el ticket');
    return response.json();
  },

  remove: async (id: number): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar el ticket');
  },
}; 