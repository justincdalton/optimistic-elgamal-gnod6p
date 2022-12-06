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

const headers = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "age", label: "Age" },
];

export function PeopleTable() {
  return (
    <TableContainer
      key={"people"}
      fetchFn={fetchPeople}
      headers={headers}
      renderRow={(row: any) => <PeopleRow row={row} />}
    />
  );
}
