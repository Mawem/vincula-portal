"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"
import { Button } from "@/components/ui/button"


export function TransactionsTable({ title, data }: { title: string, data: any }) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0]).map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row: any, rowIndex: any) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((cell: any, cellIndex: any) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {console.log('Página anterior')}}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {console.log('Página siguiente')}}
          >
            Siguiente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}