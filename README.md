# AG Grid Demo - Server-Side Infinite Scroll

A standalone Vite + React + TypeScript application demonstrating **AG Grid Community (free tier)** capabilities with mocked server-side operations.

## Features Demonstrated

✅ **Infinite Scroll Pagination** - Loads 10 users at a time from a dataset of 1000 mock users  
✅ **Server-Side Sorting** - Click column headers to sort data  
✅ **Server-Side Filtering** - Use column filter icons to filter by name or email  
✅ **Global Search** - Search across name and email fields  
✅ **Simulated Network Delay** - 300ms delay to simulate realistic API behavior  

## Project Structure

```
ag-grid-demo/
├── src/
│   ├── App.tsx              # Main application component
│   ├── DataGrid.tsx         # Reusable AG Grid component with infinite scroll
│   ├── mockData.ts          # Generates 1000 realistic user records
│   ├── mockServer.ts        # Simulates server-side filtering, sorting, pagination
│   ├── types.ts             # TypeScript interfaces
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles with Tailwind
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Installation

```bash
cd ag-grid-demo
npm install
```

## Running the App

```bash
npm run dev
```

Then open your browser to the URL shown in the terminal (typically `http://localhost:5173`).

## Technical Implementation

### AG Grid Setup
- Uses **AG Grid Community** (free tier)
- Configured with `rowModelType="infinite"` for server-side pagination
- `cacheBlockSize={10}` controls page size

### Mock Server Logic
The `mockServer.ts` file simulates a real backend:
- **Filtering**: Supports text filters (contains, not contains, equals, etc.)
- **Sorting**: Handles single-column sort by any field
- **Pagination**: Returns 10 records per page with total count metadata

### Data Generation
`mockData.ts` generates 1000 realistic users with:
- Random first and last names from predefined lists
- Email addresses based on names
- Created dates within the last 3 years

## Key Files Explained

### `DataGrid.tsx`
Reusable AG Grid component that:
- Registers required AG Grid modules (Community, Infinite Row Model)
- Implements `IDatasource` for infinite scroll
- Applies custom theme styling
- Handles data fetching via props

### `mockServer.ts`
Simulates server-side operations:
- Accepts page number, sort model, filter model, and global search
- Filters the in-memory dataset based on criteria
- Sorts results based on sort model
- Returns paginated slice with metadata

### `App.tsx`
Main application that:
- Defines column configurations
- Manages global search state
- Provides data fetcher callback to DataGrid
- Renders search UI and information panel

## Customization

### Change Page Size
Edit `PAGE_SIZE` constant in `App.tsx`:
```typescript
const PAGE_SIZE = 20; // Change from 10 to 20
```

### Add More Columns
Add fields to the `User` interface in `types.ts` and update:
1. Mock data generator in `mockData.ts`
2. Column definitions in `App.tsx`

### Modify Network Delay
Edit the delay in `mockServer.ts`:
```typescript
const simulateDelay = (ms: number = 500) => // Change from 300 to 500
```

## License

This is a demo project created for educational purposes.
