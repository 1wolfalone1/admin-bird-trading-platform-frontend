import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shopOrderSlice, {
   getOrderFilterPaging,
   getShopOrderTableSelector,
} from "../../redux/shopOrderSlice";
import s from "./shopOrderDataGrid.module.scss";
import clsx from "clsx";
import { DataGrid, GridToolbar, useGridApiRef } from "@mui/x-data-grid";
import {
   Box,
   Button,
   Chip,
   List,
   ListItem,
   ListItemText,
   Popover,
   Tooltip,
   Typography,
} from "@mui/material";
import moment from "moment";
import ListPromotionInDataGrid from "../list-promotion-in-data-grid/ListPromotionInDataGrid";
import { v4 } from "uuid";

export default function ShopOrderDataGrid() {
   const apiRef = useGridApiRef();
   const [paginationModel, setPaginationModel] = useState({
      pageSize: 10, // Default page size
      page: 0, // Default page number
   });
   const dispatch = useDispatch();
   const { data, rowModesModel, currentPage, isLoading, totalOrders } =
      useSelector(getShopOrderTableSelector);
   const handlePageChange = (page) => {
      setPaginationModel((prevPaginationModel) => ({
         ...prevPaginationModel,
         page,
      }));
   };
   useEffect(() => {
      dispatch(getOrderFilterPaging(paginationModel.page));
   }, [paginationModel]);
   useEffect(() => {
      dispatch(shopOrderSlice.actions.changeTab(1));
   }, []);
   return (
      <div className={clsx(s.container, "box-shadow")}>
         <DataGrid
            // checkboxSelection
            // autoPageSize
            // isRowSelectable={(params) => tableData?.mode === "view"}
            // onRowSelectionModelChange={handleRowSelectionModelChange}
            // onProcessRowUpdateError={handleProcessRowUpdateError}
            // processRowUpdate={handleProcessRowUpdate}
            // editMode="row"
            // rowModesModel={tableData.rowModesModel}
            // onRowModesModelChange={handleRowChange}
            // sortingMode="server"
            // onSortModelChange={handleSortModelChange}
            // filterMode="server"
            // onFilterModelChange={onFilterChange}
            // disableRowSelectionOnClick
            // rowSelectionModel={tableData?.listSelected}
            apiRef={apiRef}
            columns={columns}
            rowCount={totalOrders}
            rowsPerPageOptions={10}
            page={currentPage}
            rows={data}
            // editMode={isEditingEnabled ? "row" : "none"}
            slots={{
               toolbar: GridToolbar,
            }}
            onPageChange={handlePageChange}
            loading={isLoading}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={(newPaginationModel) => {
               console.log(newPaginationModel, "asdfasdjfkhasdkfjhasdkjfaskdf");
               setPaginationModel({
                  ...newPaginationModel,
                  pageSize: 10,
               });
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
      </div>
   );
}
const columns = [
   { field: "id", headerName: "ID", type: "number", width: 90 },
   {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      width: 120,
   },
   { field: "status", headerName: "Status", type: "text", width: 120 },
   {
      field: "shippingFee",
      headerName: "Shipping Fee",
      type: "number",
      width: 130,
   },
   {
      field: "paymentMethod",
      headerName: "Payment Method",
      type: "text",
      width: 160,
   },
   {
      field: "promotionsShop",
      headerName: "Promotions",
      width: 200,
      type: "custom",
      renderCell: (params) => {
         const promotions = ["afasdf", "basf", "c", "d", "e", "f"];
         if (promotions.length === 0) {
            return (
               <Typography>
                  <em>None</em>
               </Typography>
            );
         }
         console.log(params);
         return (
            <Tooltip
               title={
                  <>
                     <List dense>
                        {promotions.map((promotion, index) => (
                           <ListItem key={index}>
                              <Chip
                                 color={"template5"}
                                 variant="outlined"
                                 label={promotion}
                              />
                           </ListItem>
                        ))}
                     </List>
                  </>
               }
            >
               <Box sx={{ display: "flex" }}>
                  {promotions.map((promotion) => {
                     return <Typography key={v4()}>as, </Typography>;
                  })}
               </Box>
            </Tooltip>
         );
      },
   },
   {
      field: "createdDate",
      headerName: "Created Date",
      type: "number",
      width: 150,
      valueFormatter: (params) =>
         moment.utc(params.value).format("DD/MM/YY HH:mm"),
   },
   {
      field: "lastedUpdate",
      headerName: "Last Updated",
      type: "number",
      width: 150,
      valueFormatter: (params) =>
         moment.utc(params.value).format("DD/MM/YY HH:mm"),
   },
];
