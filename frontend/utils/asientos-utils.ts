// utils/asientos-utils.ts
import type { EstadoAsiento } from "@/types"

/**
 * Determina el estado de un asiento basado en si está seleccionado u ocupado
 * @param asientoId - Identificador único del asiento (ej: "A1")
 * @param asientosSeleccionados - Array de IDs de asientos seleccionados
 * @param asientosOcupados - Array de IDs de asientos ocupados
 * @returns El estado del asiento: "disponible", "seleccionado" u "ocupado"
 */
export function getEstadoAsiento(
  asientoId: string,
  asientosSeleccionados: string[],
  asientosOcupados: string[],
): EstadoAsiento {
  if (asientosSeleccionados.includes(asientoId)) return "seleccionado"
  if (asientosOcupados.includes(asientoId)) return "ocupado"
  return "disponible"
}

/**
 * Calcula el precio total de los asientos seleccionados
 * @param cantidadAsientos - Número de asientos seleccionados
 * @param precioPorAsiento - Precio por asiento
 * @returns El precio total formateado con dos decimales
 */
export function calcularPrecioTotal(cantidadAsientos: number, precioPorAsiento: number): string {
  return (cantidadAsientos * precioPorAsiento).toFixed(2)
}

/**
 * Formatea una lista de asientos para mostrarla al usuario
 * @param asientos - Array de IDs de asientos
 * @returns String con los asientos ordenados y separados por coma
 */
export function formatearAsientos(asientos: string[]): string {
  return asientos.length > 0 ? asientos.sort().join(", ") : "-"
}