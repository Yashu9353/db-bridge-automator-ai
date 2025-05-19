
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

type TablesViewProps = {
  schema: any;
  activeSchema: string;
};

const TablesView = ({ schema, activeSchema }: TablesViewProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Tables in {activeSchema}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Table Name</TableHead>
            <TableHead>Columns</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schema.tables.map((table: any) => (
            <TableRow key={table.name}>
              <TableCell className="font-medium">{table.name}</TableCell>
              <TableCell>{table.columns.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablesView;
