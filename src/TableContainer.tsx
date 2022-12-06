import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

type FetchFn = () => Promise<any[]>;
type Header = {
  id: string;
  label: string;
};

const MemoizedTableRow = memo(TableRow);

export const TableContainer = ({
  key,
  fetchFn,
  headers,
  renderRow,
  rowKey = "id",
}: {
  key: string;
  fetchFn: FetchFn;
  headers: Header[];
  renderRow: Function;
  rowKey?: string;
}) => {
  const queryKey = [key];
  const query = useQuery({ queryKey, queryFn: fetchFn });

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell key={header.id}>{header.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {query.data?.map((row) => (
          <MemoizedTableRow key={row[rowKey]} {...row}>
            {renderRow(row)}
          </MemoizedTableRow>
        ))}
      </TableBody>
    </Table>
  );
};
