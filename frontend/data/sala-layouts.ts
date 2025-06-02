// data/sala-layouts.ts

export interface SalaLayout {
  filas: string[];
  asientosPorFila: number;
  espacios?: number[]; // Índices donde insertar espacios entre asientos
}

export const salaLayouts: Record<string, SalaLayout> = {
  "Estándar": {
    filas: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    asientosPorFila: 15,
    espacios: [4, 10] // Espacio después del asiento 4 y 10
  },
  "VIP": {
    filas: ["A", "B", "C", "D", "E", "F"],
    asientosPorFila: 10,
    espacios: [3, 7] // Espacio después del asiento 3 y 7
  },
  "3D": {
    filas: ["A", "B", "C", "D", "E", "F", "G", "H"],
    asientosPorFila: 12,
    espacios: [4, 8] // Espacio después del asiento 4 y 8
  },
  "IMAX": {
    filas: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
    asientosPorFila: 20,
    espacios: [5, 10, 15] // Espacio después del asiento 5, 10 y 15
  }
} 