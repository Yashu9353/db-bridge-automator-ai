
import React from "react";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Link,
  Tag
} from "@carbon/react";
import {
  DocumentPdf,
  CheckmarkFilled,
  WarningAltFilled,
  ErrorFilled
} from "@carbon/icons-react";

type Migration = {
  id: string;
  name: string;
  source: string;
  target: string;
  date: string;
  status: "success" | "warning" | "error";
};

const recentMigrations: Migration[] = [
  {
    id: "mig-001",
    name: "Customer Reporting Scripts",
    source: "Teradata",
    target: "IBM Db2",
    date: "2025-05-08",
    status: "success"
  },
  {
    id: "mig-002",
    name: "Finance Data Migration",
    source: "Oracle",
    target: "IBM Db2",
    date: "2025-05-07",
    status: "warning"
  },
  {
    id: "mig-003",
    name: "Inventory Management",
    source: "Teradata",
    target: "IBM Db2",
    date: "2025-05-05",
    status: "success"
  },
  {
    id: "mig-004",
    name: "HR Analytics Scripts",
    source: "SQL Server",
    target: "IBM Db2",
    date: "2025-05-03",
    status: "error"
  }
];

const StatusTag = ({ status }: { status: Migration["status"] }) => {
  if (status === "success") {
    return (
      <Tag type="green" size="sm">
        <CheckmarkFilled size={16} className="cds--tag__icon" />
        Successful
      </Tag>
    );
  }
  if (status === "warning") {
    return (
      <Tag type="cyan" size="sm">
        <WarningAltFilled size={16} className="cds--tag__icon" />
        Warnings
      </Tag>
    );
  }
  return (
    <Tag type="red" size="sm">
      <ErrorFilled size={16} className="cds--tag__icon" />
      Failed
    </Tag>
  );
};

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'source', header: 'Source' },
  { key: 'target', header: 'Target' },
  { key: 'date', header: 'Date' },
  { key: 'status', header: 'Status' },
];

const RecentMigrations = () => {
  const rows = recentMigrations.map(migration => ({
    id: migration.id,
    name: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <DocumentPdf size={16} />
        <Link href={`/migration/${migration.id}`}>
          {migration.name}
        </Link>
      </div>
    ),
    source: migration.source,
    target: migration.target,
    date: migration.date,
    status: <StatusTag status={migration.status} />,
  }));

  return (
    <DataTable rows={rows} headers={headers} size="sm">
      {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
};

export default RecentMigrations;
