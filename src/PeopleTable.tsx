import { TableContainer } from "./TableContainer";
import { TableCell } from "@mui/material";
import { fetchPeople } from "./api";

function PeopleRow({ row }: { row: any }) {
  return (
    <>
      <TableCell>{row.firstName}</TableCell>
      <TableCell>{row.lastName}</TableCell>
      <TableCell>{row.age}</TableCell>
    </>
  );
}

const columns = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "age", label: "Age" },
];

export function PeopleTable() {
  return (
    <TableContainer
      title={'People'}
      tableKey={'people'}
      fetchFn={fetchPeople}
      columns={columns}
      renderRow={(row: any) => <PeopleRow row={row} />}
    />
  );
}
