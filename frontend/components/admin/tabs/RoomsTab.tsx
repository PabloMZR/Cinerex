"use client"

import { useState } from "react"
import type { CinemaRoom } from "@/types"
import { cinemaRoomsApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useApp } from "@/contexts/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface RoomsTabProps {
  rooms: CinemaRoom[]
}

export function RoomsTab({ rooms }: RoomsTabProps) {
  const [isAddingRoom, setIsAddingRoom] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    capacity: "",
    description: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [localRooms, setLocalRooms] = useState(rooms)
  const router = useRouter()

  const seatPresets: Record<string, number> = {
    '3d': 200,
    'vip': 45,
    'estandar': 150,
    'imax': 325,
  };

  const handleTypeChange = (value: string) => {
    setFormData({
      ...formData,
      type: value,
      capacity: seatPresets[value] ? String(seatPresets[value]) : ""
    })
  }

  const generateSeats = (count: number) => {
    const seats = []
    const rows = Math.ceil(count / 10)
    let seatNumber = 1
    for (let r = 0; r < rows; r++) {
      const rowLetter = String.fromCharCode(65 + r) // A, B, C, ...
      for (let s = 1; s <= 10 && seatNumber <= count; s++) {
        seats.push({ code: `${rowLetter}${s}`, isAvailable: true })
        seatNumber++
      }
    }
    return seats
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const capacityNum = Number(formData.capacity)
      const seats = generateSeats(capacityNum)
      await cinemaRoomsApi.create({
        name: formData.name,
        locationId: 1,
        seats
      })
      setIsAddingRoom(false)
      setFormData({
        name: "",
        type: "",
        capacity: "",
        description: ""
      })
    } catch (error) {
      console.error("Error al agregar sala:", error)
    }
  }

  const handleDelete = (id: number) => {
    setShowDeleteConfirm(id)
  }

  const confirmDelete = async (id: number) => {
    try {
      setIsLoading(true)
      // Consultar si hay películas asociadas a la sala
      const movies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/by-cinema-room/${id}`).then(r => r.json())
      console.log( movies)
      if (movies && movies.length > 0) {
        // Redirigir a la edición de la película asignada
        toast.error(`Esta sala tiene la película "${movies[0].title || movies[0].name}" asignada. Debes reasignar la película a otra sala antes de eliminar.`)
        setShowDeleteConfirm(null)
        setIsLoading(false)
        return
      }
      // Si no hay películas asociadas, eliminar normalmente
      await cinemaRoomsApi.delete(id)
      setLocalRooms(prev => prev.filter(r => r.id !== id))
      setShowDeleteConfirm(null)
      toast.success('Sala eliminada')
    } catch (error) {
      toast.error('Error al eliminar la sala')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Salas de Cine</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => setIsAddingRoom(!isAddingRoom)}
        >
          Nueva Sala
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(localRooms && localRooms.length > 0) ? (
          localRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
            <div className="text-sm text-gray-500 mb-4">
              <p>Ubicación: {room.location?.name}</p>
              <p>Asientos: {room.seats?.length || 0}</p>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDelete(room.id)}
                disabled={isLoading}
              >
                Eliminar
              </button>
            </div>
          </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No hay salas registradas. Aquí aparecerán las salas de cine.
          </div>
        )}
      </div>

      {isAddingRoom && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Agregar Nueva Sala</CardTitle>
            <CardDescription>Completa el formulario para agregar una nueva sala.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la Sala</Label>
                  <Input 
                    id="name" 
                    placeholder="Sala 3D 1"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Sala</Label>
                  <Select 
                    value={formData.type}
                  onValueChange={handleTypeChange}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="estandar">Estándar</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="3d">3D</SelectItem>
                      <SelectItem value="imax">IMAX</SelectItem>
                    </SelectContent>
                  </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidad (asientos)</Label>
                  <Input 
                    id="capacity" 
                    type="number" 
                    placeholder="120"
                    value={formData.capacity}
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea 
                  id="description" 
                  placeholder="Características especiales de la sala" 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              className="bg-[#2911f1] hover:bg-[#3c1edf]"
              onClick={handleSubmit}
            >
              Guardar Sala
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Confirmación de eliminación */}
      <Dialog open={!!showDeleteConfirm} onOpenChange={v => !v && setShowDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar sala?</DialogTitle>
          </DialogHeader>
          <p>¿Estás seguro de que deseas eliminar esta sala? Esta acción no se puede deshacer.</p>
          <DialogFooter>
            <Button variant="destructive" onClick={() => confirmDelete(showDeleteConfirm!)} disabled={isLoading}>Eliminar</Button>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}