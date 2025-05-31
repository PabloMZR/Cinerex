// app/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, Film, MapPin, Star, Ticket } from 'lucide-react'
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-[#2911f1]" />
              <span className="font-bold text-xl">CINEREX</span>
            </Link>
          </div>
          <nav className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
            <div className="flex-1 md:flex-none">
              <div className="flex items-center gap-4 md:gap-6 text-sm">
                <Link href="/cartelera" className="transition-colors hover:text-foreground/80 font-medium">
                  Cartelera
                </Link>
                <Link href="/proximos-estrenos" className="transition-colors hover:text-foreground/80 font-medium">
                  Estrenos
                </Link>
                <Link href="/promociones" className="transition-colors hover:text-foreground/80 font-medium">
                  Promociones
                </Link>
              </div>
            </div>
            {/* El enlace de administración está oculto, pero la ruta /admin sigue siendo accesible directamente por URL */}
            <div className="flex items-center">{/* Espacio reservado para mantener la estructura del layout */}</div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#164187]/20 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bienvenido a Cinerex</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Disfruta de las mejores películas en nuestras salas de cine. Compra tus boletos en línea y vive la
                  experiencia Cinerex.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-[#2911f1] hover:bg-[#3c1edf]">
                  <Ticket className="mr-2 h-4 w-4" />
                  Comprar Boletos
                </Button>
                <Button variant="outline">
                  <MapPin className="mr-2 h-4 w-4" />
                  Ubicaciones
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 py-12 md:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">En Cartelera</h2>
            <Link href="/cartelera" className="text-[#2911f1] hover:underline">
              Ver todas
            </Link>
          </div>

          <Tabs defaultValue="hoy" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="hoy">Hoy</TabsTrigger>
              <TabsTrigger value="manana">Mañana</TabsTrigger>
              <TabsTrigger value="semana">Esta Semana</TabsTrigger>
            </TabsList>
            <TabsContent value="hoy" className="space-y-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {peliculas.map((pelicula) => (
                  <Card key={pelicula.id} className="overflow-hidden">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={pelicula.imagen || "/placeholder.svg"}
                        alt={pelicula.titulo}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-xs">{pelicula.calificacion}</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-1">{pelicula.titulo}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{pelicula.duracion}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {pelicula.generos.map((genero) => (
                          <span
                            key={genero}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                          >
                            {genero}
                          </span>
                        ))}
                      </div>
                      <Button className="w-full bg-[#2911f1] hover:bg-[#3c1edf]" asChild>
                        <Link href={`/pelicula/${pelicula.id}`}>Comprar Boletos</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="manana" className="space-y-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Contenido similar para mañana */}
              </div>
            </TabsContent>
            <TabsContent value="semana" className="space-y-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Contenido similar para esta semana */}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Próximos Estrenos</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {proximosEstrenos.map((pelicula) => (
                <Card key={pelicula.id} className="overflow-hidden">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={pelicula.imagen || "/placeholder.svg"}
                      alt={pelicula.titulo}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <div className="flex items-center text-white">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        <span className="text-sm">{pelicula.fechaEstreno}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1">{pelicula.titulo}</h3>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {pelicula.generos.map((genero) => (
                        <span
                          key={genero}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        >
                          {genero}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/pelicula/${pelicula.id}`}>Ver Detalles</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-[#164187]/10">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-[#2911f1]" />
              <span className="font-bold text-xl">CINEREX</span>
            </Link>
            <p className="text-sm text-muted-foreground">© 2025 Cinerex S.A. de C.V. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Empresa</h3>
              <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="#" className="hover:underline">
                  Sobre Nosotros
                </Link>
                <Link href="#" className="hover:underline">
                  Sucursales
                </Link>
                <Link href="#" className="hover:underline">
                  Contacto
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Legal</h3>
              <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link href="#" className="hover:underline">
                  Términos
                </Link>
                <Link href="#" className="hover:underline">
                  Privacidad
                </Link>
                <Link href="#" className="hover:underline">
                  Cookies
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Datos de ejemplo
const peliculas = [
  {
    id: 1,
    titulo: "Dune: Parte Dos",
    imagen: "/placeholder.svg?height=450&width=300",
    calificacion: "8.5",
    duracion: "2h 46m",
    generos: ["Ciencia Ficción", "Aventura"],
  },
  {
    id: 2,
    titulo: "Kung Fu Panda 4",
    imagen: "/placeholder.svg?height=450&width=300",
    calificacion: "7.8",
    duracion: "1h 34m",
    generos: ["Animación", "Comedia"],
  },
  {
    id: 3,
    titulo: "Godzilla x Kong: El Nuevo Imperio",
    imagen: "/placeholder.svg?height=450&width=300",
    calificacion: "7.2",
    duracion: "1h 55m",
    generos: ["Acción", "Ciencia Ficción"],
  },
  {
    id: 4,
    titulo: "Ghostbusters: Imperio Helado",
    imagen: "/placeholder.svg?height=450&width=300",
    calificacion: "7.0",
    duracion: "1h 45m",
    generos: ["Comedia", "Fantasía"],
  },
]

const proximosEstrenos = [
  {
    id: 5,
    titulo: "Deadpool & Wolverine",
    imagen: "/placeholder.svg?height=450&width=300",
    fechaEstreno: "26 Jul 2025",
    generos: ["Acción", "Comedia"],
  },
  {
    id: 6,
    titulo: "Furiosa: Una Saga de Mad Max",
    imagen: "/placeholder.svg?height=450&width=300",
    fechaEstreno: "24 May 2025",
    generos: ["Acción", "Aventura"],
  },
  {
    id: 7,
    titulo: "Inside Out 2",
    imagen: "/placeholder.svg?height=450&width=300",
    fechaEstreno: "14 Jun 2025",
    generos: ["Animación", "Comedia"],
  },
  {
    id: 8,
    titulo: "Alien: Romulus",
    imagen: "/placeholder.svg?height=450&width=300",
    fechaEstreno: "16 Ago 2025",
    generos: ["Terror", "Ciencia Ficción"],
  },
]