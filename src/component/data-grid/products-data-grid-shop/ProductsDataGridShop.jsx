import {
   DataGrid,
   useGridApiRef,
   GridToolbar,
   useGridApiContext,
} from "@mui/x-data-grid";
import s from "./productsDataGridShop.module.scss";
import React, { useEffect, useState } from "react";
import { api } from "../../../api/api";
import moment from "moment/moment";
import {
   Box,
   Input,
   MenuItem,
   Select,
   Tooltip,
   Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import productShopSlice, {
   getProductTableAndPaging,
   productTableSelector,
} from "../../../redux/productsShopSlice";
import clsx from "clsx";



export default function ProductsDataGridShop() {
   const tableData = useSelector(productTableSelector);
   const dispatch = useDispatch();
   const apiRef = useGridApiRef();
   const [paginationModel, setPaginationModel] = useState({
      pageSize: 10, // Default page size
      page: 0, // Default page number
   });
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
      dispatch(productShopSlice.actions.changeProductSearchInfo(filterObject));
      dispatch(getProductTableAndPaging(1));
   };
   const handlePageChange = (page) => {
      setPaginationModel((prevPaginationModel) => ({
         ...prevPaginationModel,
         page,
      }));
   };

   useEffect(() => {
      dispatch(getProductTableAndPaging(paginationModel.page + 1));
   }, [paginationModel]);
   const handleSortModelChange = React.useCallback((sortModel) => {
      // Here you save the data you need from the sort model
      if (sortModel[0]) {
         dispatch(productShopSlice.actions.changeSortDirection(sortModel[0]));
         dispatch(getProductTableAndPaging(1));
      } else {
         dispatch(
            productShopSlice.actions.changeSortDirection({
               field: "",
               sort: "",
            })
         );
         dispatch(getProductTableAndPaging(1));
      }
   }, []);
   const handleRowChange = (row, id, a, b) => {
      console.log(row, id, a, b);
   };

   useEffect(() => {
      return () => {
         dispatch(productShopSlice.actions.changeListSelectedRows([]));
      };
   }, []);

   const handleProcessRowUpdate = async (newRow, oldRow) => {
      // Make the HTTP request to save in the backend
      try {
         const response = await api.put("/shop-owner/products/quantity", [
            {
               id: newRow.id,
               quantity: newRow.quantity,
            },
         ]);
         const data = await response.data;
         console.log(data);
      } catch (e) {
         console.log(e);
      }
      return newRow;
   };
   const handleProcessRowUpdateError = (newRow, oldRow) => {
      console.log(newRow, oldRow);
   };
   const handleRowSelectionModelChange = (newRowSelectionModel) => {
      if (tableData.mode === "view") {
         dispatch(
            productShopSlice.actions.changeListSelectedRows(
               newRowSelectionModel
            )
         );
      }
   };
   return (
      <>
         <div className={clsx(s.container, "box-shadow")}>
            {tableData ? (
               <DataGrid
                  checkboxSelection
                  autoPageSize
                  isRowSelectable={(params) => tableData?.mode === "view"}
                  onRowSelectionModelChange={handleRowSelectionModelChange}
                  onProcessRowUpdateError={handleProcessRowUpdateError}
                  processRowUpdate={handleProcessRowUpdate}
                  editMode="row"
                  rowModesModel={tableData.rowModesModel}
                  onRowModesModelChange={handleRowChange}
                  sortingMode="server"
                  onSortModelChange={handleSortModelChange}
                  filterMode="server"
                  onFilterModelChange={onFilterChange}
                  disableRowSelectionOnClick
                  rowSelectionModel={tableData?.listSelected}
                  apiRef={apiRef}
                  columns={columns}
                  rowCount={tableData.totalProduct}
                  rowsPerPageOptions={10}
                  page={tableData?.currentPage}
                  rows={tableData?.data}
                  // editMode={isEditingEnabled ? "row" : "none"}
                  slots={{
                     toolbar: GridToolbar,
                  }}
                  onPageChange={handlePageChange}
                  loading={tableData?.isLoading}
                  paginationModel={paginationModel}
                  paginationMode="server"
                  disableColumnMenu
                  onPaginationModelChange={(newPaginationModel) => {
               
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
            ) : (
               ""
            )}
         </div>
      </>
   );
}

function CustomEditComponent(props) {
   const { id, value: valueProp, field, error } = props;
   const [value, setValue] = React.useState(valueProp);
   const apiRef = useGridApiContext();
   const [errorToolTip, setErrorTooltip] = React.useState(false);
   const handleChange = (e) => {
      console.log(e.target.value);
      let newValue = e.target.value.replace(/[^0-9]/g, "");
      const error = Number(+e.target.value) > 100000;
      console.log(error, "erorrrrrrrrrrrrrrrrrrr", value, newValue);
      if (error) {
         newValue = value;
      }
      apiRef.current.setEditCellValue({
         id,
         field,
         value: !error ? newValue : value,
         debounceMs: 200,
         error: error,
      });
      if (!error) {
         setErrorTooltip(false);
         setValue(newValue);
      } else {
         setErrorTooltip(true);
         setValue(value);
      }
   };

   React.useEffect(() => {}, [valueProp]);

   return (
      <Tooltip
         open={!!errorToolTip}
         title={"Invalid quantity! Quantity need above 0 and less than 100000"}
      >
         <Box sx={{ width: "100%" }}>
            <input type="text" value={value} onChange={handleChange} />
         </Box>
      </Tooltip>
   );
}
const renderRatingEditInputCell = (params) => {
   return <CustomEditComponent {...params} />;
};
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
            <MenuItem value={9}>All</MenuItem>
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={0}>Inactive</MenuItem>
            <MenuItem value={-2}>Banned</MenuItem>
         </Select>
      </Box>
   );
};
const operatorSelect = {
   label: "select",
   value: "=",
   InputComponent: CustomFilteraStatus,
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
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      headerName: "ID",
      width: 100,
      filterable: true,
      filterOperators: [operatorIDEqual],
   },
   {
      field: "name",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      headerName: "Name",
      width: 200,
      filterable: true,
      filterOperators: [operatorNameContain],
   },
   {
      field: "price",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      headerName: "Price",
      width: 80,
      filterable: true,
      filterOperators: [operatorPriceFrom],
   },
   {
      field: "discountedPrice",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      headerName: "Discounted price",
      width: 120,
      filterable: true,
      filterOperators: [operatorPriceFrom],
   },
   {
      field: "quantity",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      headerName: "Quantity",
      type: "number",
      width: 120,
      renderCell: (params) => params.value,
      editable: true,
      renderEditCell: renderRatingEditInputCell,
      // preProcessEditCellProps: (params) => {
      //    console.log(params);
      //    const hasError = Number(+params.props.value) > 10000;
      //    return { ...params.props, error: hasError };
      // },
   },
   {
      field: "type",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      headerName: "Type",
      width: 150,
      renderCell: (params) => params.value?.name || "",
      filterable: true,
      filterOperators: [operatorTypeContain],
   },
   {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 120,
      filterable: true,
      sortable: false,
      filterOperators: [operatorSelect],
      renderCell: (params) => {
         let statusString = "Active";
         if (params.value === 0) {
            statusString = "Inactive";
         } else if (params.value === 2) {
            statusString = "Banned";
         }
         return statusString;
      },
   },
   {
      field: "totalOrders",
      headerName: "Total Orders",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      type: "number",
      filterable: false,
   },
   {
      field: "star",
      headerName: "Star",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      type: "number",
      filterable: false,
   },
   {
      field: "totalReviews",
      headerName: "Total Reviews",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      type: "number",
      width: 150,
      filterable: false,
   },
   {
      field: "createDate",
      headerName: "Create Date",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 180,
      filterable: false,

      valueFormatter: (params) =>
         moment.utc(params.value).format("DD/MM/YY HH:mm"),
   },
   {
      field: "lastUpdate",
      headerName: "Last Update",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 180,
      filterable: false,
      valueFormatter: (params) =>
         moment.utc(params.value).format("DD/MM/YY HH:mm"),
   },
];
