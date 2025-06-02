"use client"

import useEmblaCarousel from 'embla-carousel-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from "next/link"
import { useCallback, useEffect, useState } from 'react'
import type { Movie } from '@/types'

interface MovieCarouselProps {
  movies: Movie[]
  isUpcoming?: boolean
}

export function MovieCarousel({ movies, isUpcoming = false }: MovieCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="flex-[0_0_280px]">
              <Card className="overflow-hidden h-full">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.posterUrl ? `${process.env.NEXT_PUBLIC_API_URL}${movie.posterUrl}` : "/placeholder.svg"}
                    alt={movie.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                  {!isUpcoming && movie.rating && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-xs">{movie.rating}</span>
                    </div>
                  )}
                  {isUpcoming && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <div className="flex items-center text-white">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        <span className="text-sm">{movie.fechaEstreno || (movie.startTime ? new Date(movie.startTime).toLocaleDateString() : '')}</span>
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{movie.title}</h3>
                  {!isUpcoming && (
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{movie.duration} min</span>
                    </div>
                  )}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {movie.genres.map((genero) => (
                        <span
                          key={genero}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        >
                          {genero}
                        </span>
                      ))}
                    </div>
                  )}
                  <Button 
                    variant={isUpcoming ? "outline" : "default"}
                    className={`w-full ${!isUpcoming ? 'bg-[#2911f1] hover:bg-[#3c1edf]' : ''}`} 
                    asChild
                  >
                    <Link href={`/pelicula/${movie.id}`}>
                      {isUpcoming ? 'Ver Detalles' : 'Comprar Boletos'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {(prevBtnEnabled || nextBtnEnabled) && (
        <>
          <Button
            variant="outline"
            size="icon"
            className={`absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-white/90 hover:bg-white ${
              !prevBtnEnabled && 'opacity-50 cursor-not-allowed'
            }`}
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-white/90 hover:bg-white ${
              !nextBtnEnabled && 'opacity-50 cursor-not-allowed'
            }`}
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
} 