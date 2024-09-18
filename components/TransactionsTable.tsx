"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"
import { Button } from "@/components/ui/button"


export function TransactionsTable({ title, data, pageChange, currentPage, totalPages }: { title: string, data: any, pageChange?: any, currentPage?: any, totalPages?: any }) {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {data && data.length > 0 && Object.keys(data[0]).map((header, index) => (
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
            onClick={() => pageChange(currentPage > 1 ? currentPage - 1 : 1)}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => pageChange(currentPage <= totalPages ? currentPage + 1 : totalPages)}
          >
            Siguiente
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}