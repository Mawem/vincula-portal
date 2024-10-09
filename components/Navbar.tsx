"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package2, CircleUser, Menu, Home, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StoreSelector } from "./StoreSelector"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import apiStore from "@/app/api-service/apiStore"
import { getItem, setItem } from "@/utils/storageHandler"
import { signOut } from "next-auth/react"


const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
/*   { icon: Book, label: "Historial", href: "/historial" },
 */]


const fetchStores: any = async () => {
    try {
      const stores = await apiStore.listStores();
      const formattedStores = stores.data.data.map((store: any) => ({
        label: store.store_side_name,
        value: store.id
      }));
      return formattedStores;
    } catch (error) {
      console.error("Error al obtener la lista de comercios:", error);
    }
};


export function Navbar() {
  const [stores, setStores] = useState<any>([]);
  const [currentStore, setCurrentStoreFromSelector] = useState(getItem('current_commerce'));

  useEffect(() => {
    fetchStores().then((stores: any[]) => {
      if(stores?.length > 0){
        setStores(stores);
        setCurrentStore(stores[0]?.value);
      }
    });
  }, []);



  const setCurrentStore = (store: string) => {
    setItem('current_commerce', store);
    console.log('Tienda actual establecida:', store)
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
            <Image src="/circle.png" alt="Vincula Pagos" width={60} height={60} />
            <span className="sr-only">Vincula Pagos</span>
            </Link>
            {menuItems.map((item) => (
            <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
                <item.icon className="h-4 w-4" />
                {item.label}
            </Link>
            ))}
        </nav>
        <Sheet>
            <SheetTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
            >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
            </Button>
            </SheetTrigger>
            <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
                <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
                >
                <Package2 className="h-6 w-6" />
                <span>Acme Inc</span>
                </Link>
                {menuItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </Link>
                ))}
            </nav>
            </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
                {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                type="search"
                placeholder="Buscar..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                /> */}
            </div>
            </form>
            {(() => {
            return (
                <StoreSelector 
                items={stores}
                setParentValue={setCurrentStore} 
                currentValue={currentStore} 
                />
            );
            })()}
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {/* <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile"><DropdownMenuItem>Perfil</DropdownMenuItem></Link>
                <DropdownMenuItem>Configuración</DropdownMenuItem> */}
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem onClick={() => {signOut()}}>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </>
  )
}