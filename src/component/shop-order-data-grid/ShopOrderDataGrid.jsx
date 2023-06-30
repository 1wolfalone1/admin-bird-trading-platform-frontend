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
   Input,
   List,
   ListItem,
   ListItemText,
   MenuItem,
   Popover,
   Select,
   Tooltip,
   Typography,
} from "@mui/material";
import moment from "moment";
import ListPromotionInDataGrid from "../list-promotion-in-data-grid/ListPromotionInDataGrid";
import { v4 } from "uuid";
import { api } from "../../api/api";
import { DatePicker } from "@mui/x-date-pickers";
import {
   getListVouchers,
   productDetailsSelector,
} from "../../redux/productDetailsSlice";

export default function ShopOrderDataGrid() {
   const apiRef = useGridApiRef();
   const [paginationModel, setPaginationModel] = useState({
      pageSize: 10, // Default page size
      page: 1, // Default page number
   });
   const dispatch = useDispatch();
   const {
      data,
      rowModesModel,
      currentPage,
      isLoading,
      totalOrders,
      listSelected,
      mode,
   } = useSelector(getShopOrderTableSelector);
   const handlePageChange = (page) => {
      setPaginationModel((prevPaginationModel) => ({
         ...prevPaginationModel,
         page,
      }));
   };
   console.log(data);

   const handleRowSelectionModelChange = (newRowSelectionModel, a) => {
      console.log(newRowSelectionModel);
      let newListSelected = [];
      if (apiRef.current) {
         newListSelected = newRowSelectionModel.map((rowId) =>
            apiRef.current.getRow(rowId)
         );
      }
      if (mode === "view") {
         dispatch(
            shopOrderSlice.actions.changeListSelectedRows(newListSelected)
         );
      }
   };
   const handleSortModelChange = React.useCallback((sortModel) => {
      // Here you save the data you need from the sort model
      if (sortModel[0]) {
         dispatch(shopOrderSlice.actions.changeSortDirection(sortModel[0]));
         setPaginationModel({
            pageSize: 10, // Default page size
            page: 0,
         });
      } else {
         dispatch(
            shopOrderSlice.actions.changeSortDirection({
               field: "",
               sort: "",
            })
         );
         setPaginationModel({
            pageSize: 10, // Default page size
            page: 0,
         });
      }
   }, []);
   const onFilterChange = (filterModel) => {
      // Here you save the data you need from the filter model
      console.log(filterModel, "filter model");
      let filterObject = filterModel.items[0];
      console.log(filterObject, "filter object");
      if (
         !filterObject ||
         filterObject.value === undefined ||
         filterObject.value === ""
      ) {
         filterObject = {
            field: "",
            value: "",
            operator: "",
         };
      }
      dispatch(shopOrderSlice.actions.changeOrderSearchInfo(filterObject));
      setPaginationModel({
         pageSize: 10, // Default page size
         page: 0,
      });
   };
   const handleRowChange = (row) => {
      console.log(row);
   };
   console.log(data);
   useEffect(() => {
      dispatch(getOrderFilterPaging(paginationModel.page + 1));
   }, [paginationModel]);
   useEffect(() => {
      dispatch(shopOrderSlice.actions.changeTab(1));
   }, []);
   const handleProcessRowUpdate = async (newRow, oldRow) => {
      // Make the HTTP request to save in the backend
      // try {
      //    const response = await api.put("/shop-owner/products/quantity", [
      //       {
      //          id: newRow.id,
      //          quantity: newRow.quantity,
      //       },
      //    ]);
      //    const data = await response.data;
      //    console.log(data);
      // } catch (e) {
      //    console.log(e);
      // }
      return newRow;
   };
   const handleProcessRowUpdateError = (newRow, oldRow) => {
      console.log(newRow, oldRow);
   };
   return (
      <div className={clsx(s.container, "box-shadow")}>
         <DataGrid
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
         />
      </div>
   );
}
const CustomFiltera = ({ applyValue, item }) => {
   const handleFilterChange = (event) => {
      console.log(event.target.value, item, applyValue);
      let newItem = { ...item, value: event.target.value };
      applyValue(newItem);
   };

   return (
      <Box>
         <Typography
            sx={{ padding: "0", fontSize: "1.6rem", lineHeight: "1.6rem" }}
         >
            value
         </Typography>
         <Input
            placeholder="Filter..."
            value={item.value}
            onChange={handleFilterChange}
         />
      </Box>
   );
};
const CustomFilteraStatus = ({ applyValue, item }) => {
   const handleFilterChange = (event) => {
      console.log(event.target.value, item, applyValue);
      let newItem = { ...item, value: event.target.value };
      applyValue(newItem);
   };

   return (
      <Box>
         <Typography
            sx={{ padding: "0", fontSize: "1.6rem", lineHeight: "1.6rem" }}
         >
            value
         </Typography>
         <Select
            defaultValue={""}
            value={item.value}
            onChange={handleFilterChange}
            sx={{ width: "100%" }}
            MenuProps={{ disableScrollLock: true }}
         >
            <MenuItem value={9}>ALL</MenuItem>
            <MenuItem value={0}>PENDING</MenuItem>
            <MenuItem value={1}>PROCESSING</MenuItem>
            <MenuItem value={2}>SHIPPED</MenuItem>
         </Select>
      </Box>
   );
};
const CustomFilterPaymentMethod = ({ applyValue, item }) => {
   const handleFilterChange = (event) => {
      console.log(event.target.value, item, applyValue);
      let newItem = { ...item, value: event.target.value };
      applyValue(newItem);
   };

   return (
      <Box>
         <Typography
            sx={{ padding: "0", fontSize: "1.6rem", lineHeight: "1.6rem" }}
         >
            value
         </Typography>
         <Select
            defaultValue={""}
            value={item.value}
            onChange={handleFilterChange}
            sx={{ width: "100%" }}
            MenuProps={{ disableScrollLock: true }}
         >
            <MenuItem value={"9"}>ALL</MenuItem>
            <MenuItem value={"PAYPAL"}>PAYPAL</MenuItem>
            <MenuItem value={"DELIVERY"}>DELIVERY</MenuItem>
         </Select>
      </Box>
   );
};
const CustomFilterPromotionSelection = ({ applyValue, item }) => {
   const { listVouchers } = useSelector(productDetailsSelector);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getListVouchers());
   }, []);
   const handleFilterChange = (event) => {
      console.log(event.target.value, item, applyValue);
      let newItem = { ...item, value: event.target.value };
      applyValue(newItem);
   };

   return (
      <Box>
         <Typography
            sx={{ padding: "0", fontSize: "1.6rem", lineHeight: "1.6rem" }}
         >
            value
         </Typography>

         {listVouchers.length === 0 ? (
            <Typography>
               <em>None</em>
            </Typography>
         ) : (
            <>
               <Select
                  defaultValue={""}
                  value={item.value}
                  onChange={handleFilterChange}
                  sx={{ width: "100%" }}
                  MenuProps={{ disableScrollLock: true }}
               >
                  {listVouchers.map((item) => (
                     <MenuItem value={item.id}>
                        {" "}
                        <Chip
                           color={"table"}
                           variant="outlined"
                           label={`${item.name} - ${item.discountRate}%`}
                        />
                     </MenuItem>
                  ))}
               </Select>
            </>
         )}
      </Box>
   );
};
const CustomFilterDate = ({ applyValue, item }) => {
   const [dateForm, setDateForm] = useState({
      dateFrom: 0,
      dateTo: -1,
   });
   const handleFrom = (value) => {
      const milliseconds = Date.parse(value);
      setDateForm((state) => {
         return { ...state, dateFrom: milliseconds };
      });
   };
   const handleTo = (value) => {
      console.log(value, item, applyValue);
      const milliseconds = Date.parse(value);
      setDateForm((state) => {
         return { ...state, dateTo: milliseconds };
      });
   };
   useEffect(() => {
      const newValue = JSON.stringify(dateForm);
      console.log(newValue);
      applyValue({ ...item, value: newValue });
   }, [dateForm]);

   return (
      <>
         <Box display="flex" flexDirection={"column"} gap={1}>
            <Box>
               <DatePicker label={"From"} onChange={handleFrom} />
            </Box>
            <Box>
               <DatePicker label={"To"} onChange={handleTo} />
            </Box>
         </Box>
      </>
   );
};
const operatorDate = {
   label: "date",
   value: "Range",
   InputComponent: CustomFilterDate,
   getValueAsString: (value) => `${JSON.stringify(value)}`,
};
const operatorSelectPromotion = {
   label: "promotion",
   value: "=",
   InputComponent: CustomFilterPromotionSelection,
   getValueAsString: (value) => value,
};
const operatorSelectStatus = {
   label: "select",
   value: "=",
   InputComponent: CustomFilteraStatus,
   getValueAsString: (value) => value,
};
const operatorSelectPaymenMethod = {
   label: "select",
   value: "=",
   InputComponent: CustomFilterPaymentMethod,
   getValueAsString: (value) => value,
};
const operatorPriceFrom = {
   label: ">=",
   value: ">=",
   InputComponent: CustomFiltera,
   getValueAsString: (value) => value,
};
const operatorNameContain = {
   label: "Contain",
   value: "Contain",
   InputComponent: CustomFiltera,
   getValueAsString: (value) => value,
};
const operatorTypeContain = {
   label: "Contain",
   value: "Contain",
   InputComponent: CustomFiltera,
   getValueAsString: (value) => value,
};
const operatorIDEqual = {
   label: "=",
   value: "=",
   InputComponent: CustomFiltera,
   getValueAsString: (value) => value,
};
const columns = [
   {
      field: "id",
      headerName: "ID",
      type: "number",
      width: 90,
      filterOperators: [operatorIDEqual],
      filterable: true,
   },
   {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      width: 120,
      filterOperators: [operatorPriceFrom],
      filterable: true,
   },
   {
      field: "orderStatus",
      headerName: "Status",
      type: "text",
      width: 120,
      filterable: true,
      filterOperators: [operatorSelectStatus],
      renderCell: (params) => {
         return params.value.status;
      },
   },
   {
      field: "shippingFee",
      headerName: "Shipping Fee",
      type: "number",
      width: 130,
      filterOperators: [operatorPriceFrom],
      filterable: true,
   },
   {
      field: "paymentMethod",
      headerName: "Payment Method",
      type: "text",
      width: 160,
      filterOperators: [operatorSelectPaymenMethod],
   },
   {
      field: "promotionsShop",
      headerName: "Promotions",
      width: 200,
      type: "custom",
      filterOperators: [operatorSelectPromotion],
      renderCell: (params) => {
         const promotions = params.value;
         console.log(promotions, " promotioin nnnnn");
         if (promotions.length === 0) {
            return (
               <Typography>
                  <em>None</em>
               </Typography>
            );
         }
         return (
            <Tooltip
               placement="bottom-start"
               title={
                  <>
                     <List dense>
                        {promotions.map((promotion, index) => (
                           <ListItem key={promotion.id}>
                              <Chip
                                 color={"template5"}
                                 variant="outlined"
                                 label={`${promotion.quantity} x ${promotion.name} - ${promotion.discountRate}%`}
                              />
                           </ListItem>
                        ))}
                     </List>
                  </>
               }
            >
               <Box>
                  {promotions.map((promotion) => {
                     return (
                        <Chip
                           color={"table"}
                           variant="outlined"
                           label={`${promotion.quantity} x ${promotion.name} - ${promotion.discountRate}%`}
                        />
                     );
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
      filterOperators: [operatorDate],

      valueFormatter: (params) =>
         moment.utc(params.value).format("DD/MM/YY HH:mm"),
   },
   {
      field: "lastedUpdate",
      headerName: "Last Updated",
      type: "number",
      width: 150,
      filterOperators: [operatorDate],
      valueFormatter: (params) =>
         moment.utc(params.value).format("DD/MM/YY HH:mm"),
   },
];
