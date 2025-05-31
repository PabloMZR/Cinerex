// data/mock-data.ts
import type { Pelicula, Sala, Funcion } from "@/types"

// Datos de ejemplo para películas
export const peliculas: Pelicula[] = [
  {
    id: 1,
    titulo: "Dune: Parte Dos",
    imagen: "/placeholder.svg?height=450&width=300",
    calificacion: "8.5",
    duracion: "2h 46m",
    generos: ["Ciencia Ficción", "Aventura"],
    sinopsis:
      "Paul Atreides se une a los Fremen y comienza un viaje espiritual y político para vengar la traición contra su familia, mientras intenta prevenir un terrible futuro que solo él puede predecir.",
  },
  {
    id: 2,
    titulo: "Kung Fu Panda 4",
    imagen: "/placeholder.svg?height=450&width=300",
    calificacion: "7.8",
    duracion: "1h 34m",
    generos: ["Animación", "Comedia"],
    sinopsis:
      "Po es elegido para convertirse en el Líder Espiritual del Valle de la Paz, pero necesita encontrar y entrenar a un nuevo Guerrero Dragón antes de poder asumir su nueva posición.",
  },
  {
    id: 3,
    titulo: "Godzilla x Kong: El Nuevo Imperio",
    imagen: "/placeholder.svg?height=450&width=300",
    calificacion: "7.2",
    duracion: "1h 55m",
    generos: ["Acción", "Ciencia Ficción"],
    sinopsis:
      "Godzilla y Kong deben unir fuerzas contra una colosal amenaza no descubierta escondida dentro de nuestro mundo, desafiando su existencia y la nuestra.",
  },
  {
    id: 4,
    titulo: "Ghostbusters: Imperio Helado",
    imagen: "/placeholder.svg?height=450&width=300",
    calificacion: "7.0",
    duracion: "1h 45m",
    generos: ["Comedia", "Fantasía"],
    sinopsis:
      "Cuando el descubrimiento de un antiguo artefacto desata una fuerza maligna, los nuevos Ghostbusters junto con los originales deben unir fuerzas para proteger su hogar.",
  },
]

// Datos de ejemplo para salas
export const salas: Sala[] = [
  {
    id: 1,
    numero: 1,
    tipo: "Estándar",
    precio: 120.0,
    capacidad: 120,
  },
  {
    id: 2,
    numero: 2,
    tipo: "VIP",
    precio: 180.0,
    capacidad: 80,
  },
  {
    id: 3,
    numero: 3,
    tipo: "3D",
    precio: 150.0,
    capacidad: 100,
  },
]

// Datos de ejemplo para funciones
export const funciones: Funcion[] = [
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

// Datos para la selección de asientos
export const filas = ["A", "B", "C", "D", "E", "F", "G", "H"]
export const asientos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Simulamos algunos asientos ocupados
export const asientosOcupados = [
  "A1", "A2", "B5", "B6", "C3", "C4", "D7", "D8", 
  "E1", "E2", "F9", "F10", "G5", "G6", "H3", "H4",
]