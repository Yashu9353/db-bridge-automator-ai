
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

type FunctionsViewProps = {
  schema: any;
  activeSchema: string;
};

const FunctionsView = ({ schema, activeSchema }: FunctionsViewProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Functions in {activeSchema}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Function Name</TableHead>
            <TableHead>Parameters</TableHead>
            <TableHead>Return Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schema.functions.map((func: any) => (
            <TableRow key={func.name}>
              <TableCell className="font-medium">{func.name}</TableCell>
              <TableCell>{func.parameters.join(", ")}</TableCell>
              <TableCell>{func.returnType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FunctionsView;
