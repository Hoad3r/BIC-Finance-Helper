"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import { EditCategoryDialog } from "./edit-category-dialog"
import { DeleteCategoryDialog } from "./delete-category-dialog"

export function CategoriesTable() {
  // In a real app, this data would come from an API or database
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "Alimentação",
      type: "expense",
      transactionCount: 12,
    },
    {
      id: "2",
      name: "Moradia",
      type: "expense",
      transactionCount: 3,
    },
    {
      id: "3",
      name: "Transporte",
      type: "expense",
      transactionCount: 8,
    },
    {
      id: "4",
      name: "Lazer",
      type: "expense",
      transactionCount: 5,
    },
    {
      id: "5",
      name: "Serviços",
      type: "expense",
      transactionCount: 4,
    },
    {
      id: "6",
      name: "Receita",
      type: "income",
      transactionCount: 2,
    },
  ])
  

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Transactions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>
                <Badge variant={category.type === "income" ? "outline" : "secondary"}>{category.type}</Badge>
              </TableCell>
              <TableCell>{category.transactionCount}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <EditCategoryDialog category={category}>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </EditCategoryDialog>
                  <DeleteCategoryDialog category={category}>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </DeleteCategoryDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
