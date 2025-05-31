"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Info, CreditCard, Mail, Check, Loader2 } from 'lucide-react'
import type { Movie, CinemaRoom } from "@/types"
import { Separator } from "@/components/ui/separator"

interface ResumenCompraProps {
  pelicula: Movie;
  sala: CinemaRoom;
  horario: string;
  asientosSeleccionados: string[];
  onCompra: () => void;
}

export function ResumenCompra({
  pelicula,
  sala,
  horario,
  asientosSeleccionados,
  onCompra
}: ResumenCompraProps) {
  const subtotal = sala.price * asientosSeleccionados.length;
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Resumen de Compra</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">{pelicula.title}</h3>
          <p className="text-sm text-muted-foreground">
            Sala {sala.name} ({sala.type}) - {horario}
          </p>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Asientos Seleccionados</h4>
          <div className="space-y-1">
            {asientosSeleccionados.map((asiento) => (
              <div key={asiento} className="flex justify-between text-sm">
                <span>Asiento {asiento}</span>
                <span>${sala.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>IVA (16%)</span>
            <span>${iva.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-[#2911f1] hover:bg-[#3c1edf]"
          disabled={asientosSeleccionados.length === 0}
          onClick={onCompra}
        >
          Comprar Boletos
        </Button>
      </CardFooter>
    </Card>
  )
}