// app/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, Film, MapPin, Star, Ticket } from 'lucide-react'
import Link from "next/link"
import { moviesApi } from "@/lib/api"
import { MovieCarousel } from "@/components/MovieCarousel"

async function getMovies() {
  try {
    const movies = await moviesApi.getAll();
    return movies;
  } catch (error) {
    console.error('Error al obtener películas:', error);
    return [];
  }
}

// Datos estáticos de próximos estrenos
const proximosEstrenos = [
  {
    id: 5,
    title: "Deadpool & Wolverine",
    posterUrl: "/uploads/movies/deadpool.jpeg",
    fechaEstreno: "26 Jul 2024",
    genres: ["Acción", "Comedia", "Superhéroes"],
  },
  {
    id: 6,
    title: "Furiosa: Una Saga de Mad Max",
    posterUrl: "/uploads/movies/furiosa.jpg",
    fechaEstreno: "24 May 2024",
    genres: ["Acción", "Aventura", "Post-apocalíptico"],
  },
  {
    id: 7,
    title: "Inside Out 2",
    posterUrl: "/uploads/movies/insideout2.jpg",
    fechaEstreno: "14 Jun 2024",
    genres: ["Animación", "Comedia", "Familiar"],
  },
  {
    id: 8,
    title: "Alien: Romulus",
    posterUrl: "/uploads/movies/alien.png",
    fechaEstreno: "16 Ago 2024",
    genres: ["Terror", "Ciencia Ficción", "Suspense"],
  },
]

export default async function Home() {
  const movies = await getMovies();

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

          <MovieCarousel movies={movies} />

          <div className="mt-16 mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Próximos Estrenos</h2>
            <MovieCarousel movies={proximosEstrenos} isUpcoming />
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