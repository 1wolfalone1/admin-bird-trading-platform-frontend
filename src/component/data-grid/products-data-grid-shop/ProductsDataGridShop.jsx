import { DataGrid, TableHeader, useGridApiRef } from "@mui/x-data-grid";
import s from "./productsDataGridShop.module.scss";
import React, { useEffect, useState } from "react";
import { createFakeServer, useDemoData } from "@mui/x-data-grid-generator";
import { api } from "../../../api/api";
import moment from "moment/moment";
import { MenuItem, Select, TableSortLabel } from "@mui/material";
import { TableBar } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import productShopSlice, {
   getProductTableAndPaging,
   productTableSelector,
} from "../../../redux/productsShopSlice";
import theme from "../../../style/theme";
import clsx from "clsx";
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
   const [rowSelectionModel, setRowSelectionModel] = useState();
   const apiRef = useGridApiRef();
   const [paginationModel, setPaginationModel] = useState({
      pageSize: 10, // Default page size
      page: 0, // Default page number
   });

   const handlePageChange = (page) => {
      setPaginationModel((prevPaginationModel) => ({
         ...prevPaginationModel,
         page,
      }));
   };
   useEffect(() => {
      dispatch(getProductTableAndPaging(paginationModel.page + 1));
   }, [paginationModel]);
   useEffect(() => {
      console.log(rowSelectionModel, 'rowww sleectono');
   }, [rowSelectionModel]);
   return (
      <div className={clsx(s.container, "box-shadow")}>
         {tableData ? (
            <DataGrid
               checkboxSelection
               autoPageSize
               onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
               }}
               rowSelectionModel={rowSelectionModel}
               apiRef={apiRef}
               columns={columns}
               rowCount={tableData.totalProduct}
               rowsPerPageOptions={10}
               page={tableData?.page}
               rows={tableData?.data}
               editMode="row"
               slots={{
                  Header: CustomHeader,
               }}
               onPageChange={handlePageChange}
               loading={tableData?.isLoading}
               paginationModel={paginationModel}
               paginationMode="server"
               onPaginationModelChange={(newPaginationModel) => {
                  console.log(
                     newPaginationModel,
                     "asdfasdjfkhasdkfjhasdkjfaskdf"
                  );
                  setPaginationModel(newPaginationModel);
               }}
               sx={{
                  boxShadow: 2,
                  border: 2,
                  color: "hsl(0, 0%, 1%)",
                  borderColor: "hsla(74, 100%, 95%, 0)",
                  "& .MuiDataGrid-cell:hover": {
                     color: "primary.main",
                  },
               }}
            />
         ) : (
            ""
         )}
      </div>
   );
}

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
      width: 300,
   },
   {
      field: "price",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      headerName: "Price",
      width: 80,
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
   },
   {
      field: "star",
      headerName: "Star",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      type: "number",
   },
   {
      field: "totalReviews",
      headerName: "Total Reviews",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      type: "number",
      width: 150,
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
