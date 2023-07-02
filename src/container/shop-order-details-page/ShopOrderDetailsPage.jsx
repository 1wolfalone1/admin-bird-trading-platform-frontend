import { DataGrid } from '@mui/x-data-grid'
import clsx from 'clsx'
import React from 'react'

export default function ShopOrderDetailsPage() {
  return (
   <div className={clsx(s.container, "box-shadow")}>
   {/* <DataGrid
      onProcessRowUpdateError={handleProcessRowUpdateError}
      processRowUpdate={handleProcessRowUpdate}
      editMode="row"
      sortingMode="server"
      onSortModelChange={handleSortModelChange}
      filterMode="server"
      onFilterModelChange={onFilterChange}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowChange}
      checkboxSelection
      isRowSelectable={(params) => mode === "view"}
      onRowSelectionModelChange={handleRowSelectionModelChange}
      disableRowSelectionOnClick
      rowSelectionModel={listSelected.map((row) => row.id)}
      apiRef={apiRef}
      columns={columns}
      rowCount={totalOrders}
      rowsPerPageOptions={10}
      page={currentPage - 1}
      rows={data}
      // editMode={isEditingEnabled ? "row" : "none"}
      slots={{
         toolbar: GridToolbar,
      }}
      onPageChange={handlePageChange}
      loading={isLoading}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      sx={{
         boxShadow: 2,
         border: 2,
         color: "hsl(0, 0%, 1%)",
         borderColor: "hsla(74, 100%, 95%, 0)",
         "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
         },
      }}
   /> */}
</div>
  )
}
