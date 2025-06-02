"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Movie, CinemaRoom } from "@/types"

interface ResumenCompraProps {
  pelicula: Movie
  sala: CinemaRoom
  horario: string
  asientosSeleccionados: string[]
  onCompra: () => void
}

export function ResumenCompra({
  pelicula,
  sala,
  horario,
  asientosSeleccionados,
  onCompra,
}: ResumenCompraProps) {
  // Calcular el subtotal
  const subtotal = sala.price * asientosSeleccionados.length

  // Calcular el IVA (16%)
  const iva = subtotal * 0.16

  // Calcular el total
  const total = subtotal + iva

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle>Resumen de Compra</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{pelicula.title}</h3>
            <p className="text-sm text-muted-foreground">
              Sala {sala.name} ({sala.type}) - {horario}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Asientos Seleccionados</h4>
            {asientosSeleccionados.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {asientosSeleccionados.map((asiento) => (
                  <span
                    key={asiento}
                    className="px-2 py-1 bg-[#2911f1]/10 text-[#2911f1] rounded text-sm font-medium"
                  >
                    {asiento}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No has seleccionado asientos
              </p>
            )}
          </div>

          <div className="pt-4 space-y-2 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IVA (16%)</span>
              <span>${iva.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-[#2911f1] hover:bg-[#3c1edf]"
            size="lg"
            disabled={asientosSeleccionados.length === 0}
            onClick={onCompra}
          >
            Comprar Boletos
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}