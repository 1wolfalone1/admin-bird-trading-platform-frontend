import { DataGrid, TableHeader, useGridApiRef } from "@mui/x-data-grid";
import s from "./productsDataGridShop.module.scss";
import React, { useEffect, useState } from "react";
import { createFakeServer, useDemoData } from "@mui/x-data-grid-generator";
import { api } from "../../../api/api";
import moment from "moment/moment";
import { MenuItem, Select, TableSortLabel } from "@mui/material";
import { TableBar } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getProductTableAndPaging, productTableSelector } from "../../../redux/productsShopSlice";
const CustomHeader = ({
   field,
   headerName,
   sortable,
   sortDirection,
   sortOnClick,
}) => {
   return (
      <TableBar>
         {sortable ? (
            <TableSortLabel
               active={sortDirection !== null}
               direction={sortDirection}
               onClick={sortOnClick}
            >
               <span style={{ fontSize: "16px", color: "blue" }}>
                  {headerName}
               </span>
            </TableSortLabel>
         ) : (
            <span style={{ fontSize: "16px", color: "blue" }}>
               {headerName}
            </span>
         )}
      </TableBar>
   );
};
export default function ProductsDataGridShop() {
   const tableData = useSelector(productTableSelector);
   const dispatch = useDispatch();
   useEffect(() => {
      console.log(tableData)
      dispatch(getProductTableAndPaging(1))
   }, []);
   const columns = [
      {
         field: "id",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         headerName: "ID",
         width: 100,
      },
      {
         field: "name",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         headerName: "Name",
         width: 150,
      },
      {
         field: "category",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         headerName: "Category",
         width: 150,
         renderCell: (params) => {
            const categoryId = params.value;
            let categoryText = "";

            switch (categoryId) {
               case 1:
                  categoryText = "Birds";
                  break;
               case 2:
                  categoryText = "Food";
                  break;
               case 3:
                  categoryText = "Accessories";
                  break;
               default:
                  categoryText = "";
                  break;
            }

            return categoryText;
         },
      },
      {
         field: "price",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         headerName: "Price",
         width: 80,
      },

      {
         field: "listTag",
         headerName: "List Tag",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         width: "200",
         renderCell: (params) => {
            return (
               <>
                  {params.value ? (
                     <Select
                        value={params.value[0]?.id}
                        sx={{ width: "21rem" }}
                     >
                        {params.value.map((option, i) => (
                           <MenuItem value={option.id} key={option.id}>
                              {option.name}
                           </MenuItem>
                        ))}
                     </Select>
                  ) : (
                     "Not defined"
                  )}
               </>
            );
         },
      },
      {
         field: "quantity",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         headerName: "Quantity",
         type: "number",
         width: 120,
      },
      {
         field: "type",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         headerName: "Type",
         width: 150,
         renderCell: (params) => params.value?.name || "",
      },
      {
         field: "status",
         headerName: "Status",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         width: 120,
         renderCell: (params) => (params.value ? "Inactive" : "Active"),
      },
      {
         field: "totalOrders",
         headerName: "Total Orders",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         type: "number",
         width: 80,
      },
      {
         field: "star",
         headerName: "Star",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         type: "number",
         width: 80,
      },
      {
         field: "totalReviews",
         headerName: "Total Reviews",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         type: "number",
         width: 80,
      },
      {
         field: "createDate",
         headerName: "Create Date",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         width: 180,
         valueFormatter: (params) =>
            moment.utc(params.value).format("DD/MM/YY HH:mm"),
      },
      {
         field: "lastUpdate",
         headerName: "Last Update",
         headerClassName: "super-app-theme--header",
         headerAlign: "center",
         width: 180,
         valueFormatter: (params) =>
            moment.utc(params.value).format("DD/MM/YY HH:mm"),
      },
   ];
   console.log(tableData, '----------table');
   const apiRef = useGridApiRef();

   return (
      <div className={s.container}>
         {tableData ? (
            <DataGrid
               autoPageSize
               apiRef={apiRef}
               columns={columns}
               rowCount={100}
               rowsPerPageOptions={10}
               page={tableData?.page}
               rows={tableData?.data}
               totalPages
               editMode="row"
               slots={{
                  Header: CustomHeader,
               }}
               // initialState={{
               //    ...data.initialState,
               //    pagination: { paginationModel: { pageSize: 5 } },
               // }}
               // pageSizeOptions={[5, 10, 25]}
               // page={1}
               // rowCount={rowCountState}
               loading={tableData?.isLoading}
               // paginationModel={paginationModel}
               // paginationMode="server"
               // onPaginationModelChange={setPaginationModel}
            />
         ) : (
            ""
         )}
      </div>
   );
}
