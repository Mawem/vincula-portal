"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import apiStore from "@/app/api-service/apiStore"
import { setItem } from "@/utils/storageHandler"


export function StoreSelector({ items=[], setParentValue, currentValue }: any) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [storeList, setStoreList] = React.useState([]);


  const handleStoreSelection = (selectedValue: string) => {
    setValue(selectedValue);
    setParentValue(selectedValue);
    setItem('current_commerce', selectedValue);
    setOpen(false);
  };

  
  React.useEffect(() => {
    if (currentValue) {
      setValue(currentValue)
    }
  }, [currentValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] p-2 justify-between"
        >
          {value
            ? items.find((item: any) => { return item.value === value})?.label
            : "Seleccione un comercio"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar Comercio" />
          <CommandEmpty>Sin resultados.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {items.map((item: any) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(item.value === value ? "" : item.value)
                    setParentValue(item.value === value ? "" : item.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
