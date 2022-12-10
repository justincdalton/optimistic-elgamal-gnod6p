import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer as MuiContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, FormEventHandler, memo, ReactNode, Reducer, useReducer, useState } from "react";

type QueryParams = {
  page: number;
  pageOffset?: number;
  pageSize: number;
  sortColumn?: string;
  sortOrder?: 'asc' | 'desc' | undefined;
  searchTerm?: string;
}
type QueryParamsAction = {
  type: string;
  page?: number;
  sortColumn?: string;
  searchTerm?: string;
}
type FetchFn = (params?: QueryParams) => Promise<any[]>;
type Column = {
  id: string;
  label: string;
};

const MemoizedTableRow = memo(TableRow);

const TableContent = ({
  children,
  columnCount,
  isLoading,
  data
}: {
  children: ReactNode;
  columnCount: number;
  isLoading: boolean;
  data?: any[];
}) => {
  if (isLoading && !data) {
    return (
      <TableCell colSpan={columnCount}>
        Loading...
      </TableCell>
    )
  }

  if (!data.length) {
    return (
      <TableCell colSpan={columnCount}>
        No Data Found
      </TableCell>
    )
  }

  return <>{children}</>;
}

const SearchField = ({ onSearch }: { onSearch: Function }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    onSearch(searchTerm)
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Search field"
        type="search"
        variant="standard"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </form>
  )
}


const queryReducer : Reducer<QueryParams, QueryParamsAction> = (state, action) => {
  switch (action.type) {
    case "SORT":
      let sortOrder = 'asc';
      if (state.sortColumn === action.sortColumn && state.sortOrder === 'asc') {
        sortOrder = 'desc';
      }

      return {
        ...state,
        sortOrder,
        sortColumn: action.sortColumn
      }
    case "PAGE":
      return {
        ...state,
        page: action.page,
        pageOffset: (action.page ?? 0) * state.pageSize
      }
    case "SEARCH":
      return {
        ...state,
        searchTerm: action.searchTerm
      }
  }
}

export const TableContainer = ({
  title,
  tableKey,
  fetchFn,
  columns,
  renderRow,
  rowKey = "id",
}: {
  title: string;
  tableKey: string;
  fetchFn: FetchFn;
  columns: Column[];
  renderRow: Function;
  rowKey?: string;
}) => {
  const [state, dispatch] = useReducer(queryReducer, {
    pageSize: 10,
    page: 0
  })
  const query = useQuery({
    queryKey: [tableKey, state],
    queryFn: () => fetchFn(state),
    cacheTime: Infinity,
    keepPreviousData: true
  });

  return (
    <MuiContainer component={Paper} sx={{width: 500}}>
      <Toolbar>
        <Typography variant="h6" sx={{ flex: '1 1 100%', textAlign: 'left'}}>
          {title}
        </Typography>
        <SearchField onSearch={(searchTerm: string) => dispatch({type: 'SEARCH', searchTerm})} />
        <Box width={40}>
          {query.isFetching && <CircularProgress size={20} />}
        </Box>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel
                  active={state.sortColumn === column.id}
                  direction={state.sortColumn === column.id ? state.sortOrder : 'asc'}
                  onClick={() => dispatch({type: 'SORT', sortColumn: column.id})}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableContent columnCount={columns.length} isLoading={query.isLoading} data={query.data}>
            {query.data?.map((row) => (
              <MemoizedTableRow key={row[rowKey]} {...row}>
                {renderRow(row)}
              </MemoizedTableRow>
            ))}
          </TableContent>
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={-1}
        rowsPerPage={state.pageSize}
        page={state.page}
        onPageChange={(_, page) => dispatch({type: 'PAGE', page})}
      />
    </MuiContainer>
  );
};
