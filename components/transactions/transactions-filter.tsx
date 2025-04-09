"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter, Search, X } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface TransactionsFilterProps {
  onApplyFilters?: (filters: {
    searchTerm: string
    category: string
    startDate?: Date
    endDate?: Date
  }) => void
}

export function TransactionsFilter({ onApplyFilters }: TransactionsFilterProps) {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas as Categorias")

  // Em uma aplicação real, essas categorias viriam de uma API ou banco de dados
  const categories = ["Alimentação", "Moradia", "Transporte", "Lazer", "Serviços", "Receita"]

 

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters({
        searchTerm,
        category: selectedCategory,
        startDate,
        endDate,
      })
    }
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("Todas as Categorias")
    setStartDate(undefined)
    setEndDate(undefined)

    if (onApplyFilters) {
      onApplyFilters({
        searchTerm: "",
        category: "Todas as Categorias",
        startDate: undefined,
        endDate: undefined,
      })
    }
  }

  useEffect(() => {
    if (searchTerm && onApplyFilters) {
      onApplyFilters({
        searchTerm,
        category: selectedCategory,
        startDate,
        endDate,
      })
    }
  }, [searchTerm, onApplyFilters])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar transações..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex gap-2" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
          {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
        </Button>
      </div>

      {showFilters && (
        <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Data Inicial</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus locale={ptBR} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Data Final</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus locale={ptBR} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-end md:col-span-3">
            <Button className="mr-2" onClick={handleApplyFilters}>
              Aplicar Filtros
            </Button>
            <Button variant="outline" onClick={handleClearFilters}>
              Limpar Filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
