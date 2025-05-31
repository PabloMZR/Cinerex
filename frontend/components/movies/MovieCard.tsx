'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, Star } from 'lucide-react';
import Link from "next/link";
import { Movie } from "@/lib/api";

interface MovieCardProps {
  movie: Movie;
  variant?: 'default' | 'upcoming';
}

export function MovieCard({ movie, variant = 'default' }: MovieCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src="/placeholder.svg"
          alt={movie.title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
        {variant === 'default' ? (
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-xs">4.5</span>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center text-white">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span className="text-sm">{new Date(movie.startTime).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-1">{movie.title}</h3>
        {variant === 'default' && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Clock className="h-3 w-3 mr-1" />
            <span>{movie.duration} min</span>
          </div>
        )}
        <div className="flex flex-wrap gap-1 mb-4">
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
            {movie.cinemaRoom?.name || 'Sala por definir'}
          </span>
        </div>
        <Button 
          className={variant === 'default' ? "w-full bg-[#2911f1] hover:bg-[#3c1edf]" : "w-full"} 
          variant={variant === 'default' ? 'default' : 'outline'} 
          asChild
        >
          <Link href={`/pelicula/${movie.id}`}>
            {variant === 'default' ? 'Comprar Boletos' : 'Ver Detalles'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
} 