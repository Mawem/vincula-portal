"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import apiPayouts from "@/app/api-service/apiPayouts"
import { DollarSign } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  commerce: any
}

export function StatCard({ title, value, change, commerce }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Gs. {value}</div>
        <p className="text-xs text-muted-foreground my-3">{change}</p>
        <div className="flex justify-end">
          <Button
            className="mt-2 w-full"
            onClick={async () => {
              try {
                const respuesta = await apiPayouts.requestPayout(commerce);
                console.log('Retiro exitoso:', respuesta);
                // Aquí puedes agregar lógica adicional después de un retiro exitoso
              } catch (error) {
                console.error('Error al realizar el retiro:', error);
                // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
              }
            }}
          >
            Retirar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}