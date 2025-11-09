import { SortModelItem } from 'ag-grid-community';
import { MOCK_USERS } from './mockData';
import { User, DataGridResponse } from './types';

// Simulate network delay
const simulateDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

export async function fetchUsers(
  page: number,
  sortModel: SortModelItem[],
  filterModel: Record<string, any>
): Promise<DataGridResponse<User>> {
  console.log(`🔄 Fetching page ${page}...`);
  await simulateDelay();

  let filteredUsers = [...MOCK_USERS];

  // Apply column filters
  Object.entries(filterModel).forEach(([field, filter]) => {
    if (filter.filterType === 'text') {
      const filterValue = filter.filter?.toLowerCase() || '';
      const filterType = filter.type;

      filteredUsers = filteredUsers.filter(user => {
        const value = (user[field as keyof User] || '').toString().toLowerCase();
        
        switch (filterType) {
          case 'contains':
            return value.includes(filterValue);
          case 'notContains':
            return !value.includes(filterValue);
          case 'equals':
            return value === filterValue;
          case 'notEqual':
            return value !== filterValue;
          case 'startsWith':
            return value.startsWith(filterValue);
          case 'endsWith':
            return value.endsWith(filterValue);
          default:
            return true;
        }
      });
    }
  });

  // Apply sorting
  if (sortModel && sortModel.length > 0) {
    const sort = sortModel[0];
    const { colId, sort: sortDirection } = sort;

    filteredUsers.sort((a, b) => {
      const aValue = a[colId as keyof User];
      const bValue = b[colId as keyof User];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Calculate pagination
  const pageSize = 10;
  const totalCount = filteredUsers.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  console.log(`✅ Returning ${paginatedUsers.length} users for page ${page} (total: ${totalCount})`);
  console.log('Users:', paginatedUsers.map(u => `${u.name} (${u.email})`));

  return {
    data: paginatedUsers,
    meta: {
      page,
      pages: totalPages,
      count: totalCount,
    },
  };
}
