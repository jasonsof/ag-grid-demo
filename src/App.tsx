import { useCallback, useMemo } from 'react';
import { GetRowIdParams, SortModelItem } from 'ag-grid-community';
import DataGrid from './DataGrid';
import { fetchUsers } from './mockServer';
import { User } from './types';

function App() {
  const PAGE_SIZE = 10;

  // Column Definitions
  const colDefs = useMemo(() => [
    {
      field: 'name',
      filter: true,
      filterParams: {
        filterOptions: ['contains', 'notContains', 'equals', 'notEqual'],
      },
      flex: 1,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      field: 'email',
      filter: true,
      filterParams: {
        filterOptions: ['contains', 'notContains', 'equals', 'notEqual'],
      },
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      valueFormatter: (params: { value: string }) => {
        if (!params.value) return '';
        return new Date(params.value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
      flex: 1,
    },
  ], []);

  // Data Fetcher
  const dataFetcher = useCallback(
    async (
      page: number,
      sort: SortModelItem[],
      filter: Record<string, any>
    ) => {
      return fetchUsers(page, sort, filter);
    },
    []
  );

  const getRowId = useCallback((params: GetRowIdParams<User>) => {
    return params.data.id.toString();
  }, []);

  return (
    <div className="flex h-screen flex-col bg-gray-50 p-8">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden">
        <div className="mb-4">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            AG Grid Demo - Server-Side Infinite Scroll
          </h1>
          <p className="text-gray-600">
            Demonstrating filtering, sorting, and infinite scroll pagination with mocked server-side data
          </p>
        </div>

        {/* Info Panel */}
        <div className="mb-4 rounded-lg bg-blue-50 p-4">
          <h2 className="mb-2 font-semibold text-blue-900">Features Demonstrated:</h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-blue-800">
            <li>Server-side infinite scroll pagination (1000 mock users, 10 per page)</li>
            <li>Column filtering (click filter icon in column headers)</li>
            <li>Column sorting (click column headers to sort)</li>
            <li>Row selection (click checkboxes to select rows)</li>
            <li>Row highlighting (hover over rows to see highlight)</li>
            <li>Column reordering (drag column headers to reorder)</li>
            <li>Column resizing (drag column edges to resize)</li>
          </ul>
        </div>

        {/* Data Grid */}
        <div className="flex-1 overflow-hidden rounded-lg bg-white p-6 shadow-sm">
          <DataGrid<User>
            columnDefs={colDefs}
            dataFetcher={dataFetcher}
            pageSize={PAGE_SIZE}
            getRowId={getRowId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
