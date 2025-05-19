
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

type StoredProceduresViewProps = {
  schema: any;
  activeSchema: string;
};

const StoredProceduresView = ({ schema, activeSchema }: StoredProceduresViewProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Stored Procedures in {activeSchema}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Procedure Name</TableHead>
            <TableHead>Parameters</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schema.procedures.map((proc: any) => (
            <TableRow key={proc.name}>
              <TableCell className="font-medium">{proc.name}</TableCell>
              <TableCell>{proc.parameters.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoredProceduresView;
