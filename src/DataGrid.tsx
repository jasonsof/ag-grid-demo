import {
  themeQuartz,
  IDatasource,
  IGetRowsParams,
  GridReadyEvent,
  ColDef,
  GetRowIdParams,
  SortModelItem,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useCallback } from 'react';

interface DataFetcher<T> {
  (
    page: number,
    sortModel: SortModelItem[],
    filterModel: Record<string, any>
  ): Promise<{
    data: T[];
    meta: { page: number; pages: number; count: number };
  }>;
}

interface DataGridProps<T> {
  columnDefs: ColDef[];
  dataFetcher: DataFetcher<T>;
  pageSize?: number;
  getRowId: (params: GetRowIdParams<T>) => string;
}

const DataGrid = <T extends { id: number | string }>({
  columnDefs,
  dataFetcher,
  pageSize = 10,
  getRowId,
}: DataGridProps<T>) => {
  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      const dataSource: IDatasource = {
        getRows: async (params: IGetRowsParams) => {
          const page = Math.floor(params.startRow / pageSize) + 1;
          const sort = params.sortModel;
          const filter = params.filterModel;
          try {
            const response = await dataFetcher(page, sort, filter);
            const { data, meta } = response;
            const lastRow = meta.count || -1;
            params.successCallback(data, lastRow);
          } catch (error) {
            console.error('Error fetching data:', error);
            params.failCallback();
          }
        },
      };

      params.api.setGridOption('datasource', dataSource);
    },
    [dataFetcher, pageSize]
  );

  const theme = useMemo(() => {
    return themeQuartz.withParams({
      headerBackgroundColor: '#F9FAFB',
      borderColor: '#E5E7EB',
      wrapperBorderRadius: '0.75rem',
    });
  }, []);

  return (
    <div className="h-full w-full">
      <AgGridReact
        theme={theme}
        rowModelType="infinite"
        cacheBlockSize={pageSize}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        getRowId={getRowId}
        rowSelection="multiple"
        enableCellTextSelection={true}
        ensureDomOrder={true}
      />
    </div>
  );
};

export default DataGrid;
