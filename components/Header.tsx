import Link from "next/link"
import { Package2, CircleUser, Menu, Home, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StoreSelector } from "./StoreSelector"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Navbar } from "./Navbar"
import apiStore from "@/app/api-service/apiStore"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Book, label: "Historial", href: "/historial" },
  /* { icon: BarChart2, label: "Reportes", href: "/reportes" },
  { icon: Settings, label: "Configuración", href: "/configuracion" }, */
]

let storeList: any = [];

const fetchStores: any = async () => {
  try {
    const stores = await apiStore.listStores();
    console.log('stores: ', stores);
    const formattedStores = stores.data.map((store: any) => ({
      label: store.name,
      value: store.id
    }));
    storeList = formattedStores;
  } catch (error) {
    console.error("Error al obtener la lista de comercios:", error);
  }
};

console.log('storeList: ', storeList);

export function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Navbar />
    </header>
  )
}