"use client"
import { useEffect, useState } from "react"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import apiUser from "../../app/api-service/apiUser";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Profile(props: any) {
  const [nombre, setNombre] = useState(props.nombre || "")
  const [nroCelular, setNroCelular] = useState(props.nroCelular || "")
  const [cedula, setCedula] = useState(props.cedula || "")

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await apiUser.getProfile()
      setNombre(response.full_name)
      setNroCelular(response.phone_number)
      setCedula(response.national_id)
    }
    fetchProfile()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar los datos
    console.log("Datos actualizados:", { nombre, nroCelular, cedula })
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex min-h-screen w-full flex-col items-center">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-w-3xl w-full">
        <h1 className="text-2xl font-bold">Perfil</h1>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Información Personal</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                {/* <Button variant="outline">Editar</Button> */}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Información Personal</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="nroCelular">Nro. de Celular</Label>
                    <Input id="nroCelular" value={nroCelular} onChange={(e) => setNroCelular(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="cedula">Cédula</Label>
                    <Input id="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
                  </div>
                  <Button type="submit">Guardar cambios</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Nombre:</span>
                <span>{nombre}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">Nro. de Celular:</span>
                <span>{nroCelular}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">Cédula:</span>
                <span>{cedula}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <CardTitle className="mb-4">Contacto</CardTitle>
            <Button
              className="w-full"
              onClick={() => window.open(`whatsapp://send?phone=+595992883491&text=Hola! necesito ayuda con el servicio, agradeceria mucho la asistencia.`, '_blank')}
            >
              Chatear por WhatsApp
            </Button>
          </CardContent>
        </Card>
      </main>
      </div>
    </div>
  )
}
