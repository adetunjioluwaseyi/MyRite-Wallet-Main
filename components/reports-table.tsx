"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const columns = ["DATE", "TRANSACTION ID", "WALLET TYPE", "AMOUNT", "NARRATION"]

export function ReportsTable() {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            {columns.map((col) => (
              <TableHead key={col} className="bg-muted text-foreground font-semibold text-sm">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              No data available
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
