"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BackButton } from "@/components/layout/back-button"
import { SalaCine } from "@/components/asientos/sala-cine"
import { ResumenCompra } from "@/components/asientos/resumen-compra"
import { LeyendaEstados } from "@/components/asientos/leyenda-estados"
import { functionsApi, ticketsApi } from "@/lib/api"
import type { Function } from "@/types"
import { toast } from "sonner"

export default function SeleccionAsientos({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [asientosSeleccionados, setAsientosSeleccionados] = useState<string[]>([])
  const [funcion, setFuncion] = useState<Function | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        setLoading(true)
        const data = await functionsApi.getOne(Number(params.id))
        setFuncion(data)
      } catch (err) {
        setError("Error al cargar la función")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFunction()
  }, [params.id])

  const handleCompra = async () => {
    if (!funcion || asientosSeleccionados.length === 0) return

    try {
      const ticket = await ticketsApi.create({
        functionId: funcion.id,
        seatIds: asientosSeleccionados.map(id => Number(id)),
        total: funcion.price * asientosSeleccionados.length
      })

      toast.success("¡Compra realizada con éxito!")
      router.push(`/ticket/${ticket.id}`)
    } catch (err) {
      toast.error("Error al procesar la compra")
      console.error(err)
    }
  }

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

  if (error || !funcion) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error || "No se encontró la función"}</p>
          <BackButton href="/cartelera" label="Volver a cartelera" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-[#164187]/5">
      <Header />

      <main className="flex-1 container py-8">
        <BackButton href={`/pelicula/${funcion.movie.id}`} label="Volver a selección de horarios" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#2911f1] to-[#3c1edf] bg-clip-text text-transparent inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Selección de Asientos
            </motion.h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="font-semibold">{funcion.movie.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Sala {funcion.cinemaRoom.name} ({funcion.cinemaRoom.type}) - {new Date(funcion.startTime).toLocaleTimeString()}
                </p>
              </motion.div>
              <LeyendaEstados />
            </div>

            <motion.div
              className="w-full overflow-auto rounded-lg shadow-md bg-white p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="min-w-[600px]">
                <SalaCine
                  tipoSala={funcion.cinemaRoom.type}
                  asientos={funcion.cinemaRoom.seats ?? []}
                  asientosOcupados={[]} // TODO: Obtener asientos ocupados de los tickets
                  onAsientosSeleccionadosChange={setAsientosSeleccionados}
                />
              </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-1">
            <ResumenCompra
              pelicula={funcion.movie}
              sala={funcion.cinemaRoom}
              horario={new Date(funcion.startTime).toLocaleTimeString()}
              asientosSeleccionados={asientosSeleccionados}
              onCompra={handleCompra}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 