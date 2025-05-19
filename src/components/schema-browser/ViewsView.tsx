
import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

type ViewsViewProps = {
  schema: any;
  activeSchema: string;
};

const ViewsView = ({ schema, activeSchema }: ViewsViewProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Views in {activeSchema}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">View Name</TableHead>
            <TableHead>Definition</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schema.views.map((view: any) => (
            <TableRow key={view.name}>
              <TableCell className="font-medium">{view.name}</TableCell>
              <TableCell>
                <pre className="text-xs whitespace-pre-wrap">{view.definition}</pre>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewsView;
