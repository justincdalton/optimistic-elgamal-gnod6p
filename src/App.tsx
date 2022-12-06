import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PeopleTable } from "./PeopleTable";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PeopleTable />
    </QueryClientProvider>
  );
}

export default App;
