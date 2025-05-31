"use client"

import { useState, useEffect } from "react"
import type { Movie } from "@/types"
import { moviesApi } from "@/lib/api"
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
import { useSearchParams } from "next/navigation"

interface MoviesTabProps {
  movies: Movie[]
}

export function MoviesTab({ movies }: MoviesTabProps) {
  const { addMovie, updateMovie, deleteMovie } = useApp()
  const [isAddingMovie, setIsAddingMovie] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    startTime: "",
    cinemaRoomId: "",
    image: null as File | null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [editMovie, setEditMovie] = useState<Movie | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    duration: "",
    startTime: "",
    cinemaRoomId: "",
    image: null as File | null
  })

  const searchParams = useSearchParams();

  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId && movies && movies.length > 0) {
      const movieToEdit = movies.find(m => m.id === Number(editId));
      if (movieToEdit) {
        openEditModal(movieToEdit);
      }
    }
    // eslint-disable-next-line
  }, [searchParams, movies]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Validaciones previas
    const durationNum = Number(formData.duration)
    const cinemaRoomIdNum = Number(formData.cinemaRoomId)
    if (isNaN(durationNum) || durationNum <= 0) {
      alert('La duración debe ser un número mayor a cero.')
      return
    }
    if (isNaN(cinemaRoomIdNum) || !Number.isInteger(cinemaRoomIdNum)) {
      alert('El ID de la sala debe ser un número entero válido.')
      return
    }
    if (!formData.startTime) {
      alert('Debes seleccionar la fecha y hora de inicio.')
      return
    }
    try {
      setIsLoading(true)
      // Crear FormData para enviar la imagen
      const movieFormData = new FormData()
      movieFormData.append('title', formData.title)
      movieFormData.append('description', formData.description)
      movieFormData.append('duration', String(durationNum))
      const isoStartTime = formData.startTime ? new Date(formData.startTime).toISOString() : ''
      movieFormData.append('startTime', isoStartTime)
      movieFormData.append('cinemaRoomId', String(cinemaRoomIdNum))
      if (formData.image) {
        movieFormData.append('image', formData.image)
      }
      await addMovie(movieFormData)
      setIsAddingMovie(false)
      setFormData({
        title: "",
        description: "",
        duration: "",
        startTime: "",
        cinemaRoomId: "",
        image: null
      })
      // Actualizar la lista de películas automáticamente
      if (typeof window !== 'undefined') {
        // Espera breve para que el backend procese y luego recarga los datos
        setTimeout(() => window.location.reload(), 500)
      }
    } catch (error) {
      console.error("Error al agregar película:", error)
      alert(JSON.stringify(error, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  const openEditModal = (movie: Movie) => {
    setEditMovie(movie)
    setEditForm({
      title: movie.title,
      description: movie.description || "",
      duration: String(movie.duration),
      startTime: movie.startTime ? new Date(movie.startTime).toISOString().slice(0,16) : "",
      cinemaRoomId: movie.cinemaRoom && movie.cinemaRoom.id ? String(movie.cinemaRoom.id) : "",
      image: null
    })
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editMovie) return
    try {
      setIsLoading(true)
      const form = new FormData()
      form.append('title', editForm.title)
      form.append('description', editForm.description)
      form.append('duration', editForm.duration)
      form.append('startTime', new Date(editForm.startTime).toISOString())
      form.append('cinemaRoomId', editForm.cinemaRoomId)
      if (editForm.image) form.append('image', editForm.image)
      await moviesApi.update(editMovie.id, form)
      setEditMovie(null)
      toast.success('Película actualizada')
      setTimeout(() => window.location.reload(), 500)
    } catch (error) {
      toast.error('Error al actualizar película')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    setShowDeleteConfirm(id)
  }

  const confirmDelete = async (id: number) => {
    try {
      setIsLoading(true)
      await deleteMovie(id)
      setShowDeleteConfirm(null)
      toast.success('Película eliminada')
      setTimeout(() => window.location.reload(), 500)
    } catch (error) {
      toast.error('Error al eliminar película')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Películas</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => setIsAddingMovie(true)}
        >
          Nueva Película
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(movies && movies.length > 0) ? (
          movies.map((movie) => (
            <div key={movie.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center md:items-start">
              <div className="flex-1 w-full md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
            <p className="text-gray-600 mb-4">{movie.description}</p>
                <div className="text-sm text-gray-500 mb-2">
                <p>Duración: {movie.duration} min</p>
                <p>Horario: {new Date(movie.startTime).toLocaleString()}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                    onClick={() => openEditModal(movie)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(movie.id)}
                  disabled={isLoading}
                >
                  Eliminar
                </button>
              </div>
            </div>
              {movie.posterUrl && (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${movie.posterUrl}`}
                  alt={movie.title}
                  className="w-32 md:w-48 h-auto max-h-72 object-contain rounded ml-0 md:ml-6 mt-4 md:mt-0 bg-gray-100"
                  style={{ aspectRatio: '2/3' }}
                />
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No hay películas registradas. Aquí aparecerán las películas.
          </div>
        )}
      </div>

      {isAddingMovie && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Agregar Nueva Película</CardTitle>
            <CardDescription>
              Completa el formulario para agregar una nueva película a la cartelera.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input 
                    id="title" 
                    placeholder="Título de la película"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input 
                    id="description" 
                    placeholder="Descripción de la película"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duración (minutos)</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    placeholder="120"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Fecha y hora de inicio</Label>
                  <Input 
                    id="startTime" 
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cinemaRoomId">ID de la sala</Label>
                <Input 
                  id="cinemaRoomId" 
                  type="number"
                  placeholder="ID de la sala"
                  value={formData.cinemaRoomId}
                  onChange={(e) => setFormData({...formData, cinemaRoomId: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Imagen de portada</Label>
                <Input 
                  id="image" 
                  type="file" 
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files && e.target.files[0];
                    setFormData({ ...formData, image: file || null });
                  }}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              className="bg-[#2911f1] hover:bg-[#3c1edf]"
              onClick={handleSubmit}
            >
              Guardar Película
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Modal de edición */}
      <Dialog open={!!editMovie} onOpenChange={v => !v && setEditMovie(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Película</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Título</Label>
              <Input id="edit-title" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Descripción</Label>
              <Input id="edit-description" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-duration">Duración (minutos)</Label>
              <Input id="edit-duration" type="number" value={editForm.duration} onChange={e => setEditForm({ ...editForm, duration: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-startTime">Fecha y hora de inicio</Label>
              <Input id="edit-startTime" type="datetime-local" value={editForm.startTime} onChange={e => setEditForm({ ...editForm, startTime: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-cinemaRoomId">ID de la sala</Label>
              <Input id="edit-cinemaRoomId" type="number" value={editForm.cinemaRoomId} onChange={e => setEditForm({ ...editForm, cinemaRoomId: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Imagen de portada (opcional)</Label>
              <Input id="edit-image" type="file" accept="image/*" onChange={e => setEditForm({ ...editForm, image: e.target.files?.[0] || null })} />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>Guardar Cambios</Button>
              <Button type="button" variant="outline" onClick={() => setEditMovie(null)}>Cancelar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmación de eliminación */}
      <Dialog open={!!showDeleteConfirm} onOpenChange={v => !v && setShowDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar película?</DialogTitle>
          </DialogHeader>
          <p>¿Estás seguro de que deseas eliminar esta película? Esta acción no se puede deshacer.</p>
          <DialogFooter>
            <Button variant="destructive" onClick={() => confirmDelete(showDeleteConfirm!)} disabled={isLoading}>Eliminar</Button>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>Cancelar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 