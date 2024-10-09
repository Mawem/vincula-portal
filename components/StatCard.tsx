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
  display_withdraw: boolean
  payRequestStatus: boolean
  setPayRequested: any
}

export function StatCard({ title, value, change, commerce, display_withdraw, payRequestStatus, setPayRequested }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Gs. {value} </div>
        <p className="text-xs text-muted-foreground my-3">{change}</p>
        <div className="flex justify-end">
          {display_withdraw && (
          <Button
            disabled={payRequestStatus}
            onClick={async () => {
              try {
                if (payRequestStatus) {
                  console.log('Ya hay un retiro en curso');
                  return;
                }
                const respuesta = await apiPayouts.requestPayout(commerce);
                console.log('Retiro exitoso:', respuesta);
                setPayRequested(true);
              } catch (error) {
                console.error('Error al realizar el retiro:', error);
              }
            }}
          >
            Retirar
          </Button>
            )}
        </div>
      </CardContent>
    </Card>
  )
}