"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { User, AuthState, LoginResponse, LoginRequest } from "@/types/auth"

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  })
  const router = useRouter()

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          // Validar token con el backend
          const response = await api.get<{ user: User }>("/AdminAuth/validate")
          console.log("validate response", response)
          setAuthState({
            user: response.user,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
          console.log("Nuevo estado de auth:", {
            user: response.user,
            token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          // Si el token no es válido, limpiar el estado
          localStorage.removeItem("token")
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }))
      }
    }

    validateToken()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))
      const token = await api.post<string>("/AdminAuth/login", {
        email,
        password,
      } as LoginRequest)

      if (typeof token === 'string' && token.length > 0) {
        localStorage.setItem("token", token)
        setAuthState({
          user: null, // El usuario se obtiene en la validación posterior
          token,
          isAuthenticated: true,
          isLoading: false,
        })
        router.push("/admin")
      } else {
        throw new Error("Token inválido recibido del backend")
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    })
    router.push("/admin/login")
  }

  return {
    ...authState,
    login,
    logout,
  }
} 