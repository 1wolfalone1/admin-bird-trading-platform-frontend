import { breadCrumbs } from "../../config/constant";
import s from "./products.module.scss";
import React from "react";
import useBreadCrumb from "../../custom-hook/useBreadCrumb";
import { DataGrid } from "@mui/x-data-grid";
import { createFakeServer, useDemoData } from "@mui/x-data-grid-generator";
const breadCrumbPath = [breadCrumbs.PRODUCTS];
const rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];
const columns = [
  {
     field: "col1",
     headerName: "Column 1",
     type: "number",
     flex: 1,
     editable: true,
  },
  { field: "col2", headerName: "Column 2", width: 500, editable: true },
];
const SERVER_OPTIONS = {
  useCursorPagination: false,
};
const { useQuery, ...data } = createFakeServer({}, SERVER_OPTIONS);

export default function Products() {
   useBreadCrumb(breadCrumbPath);

   const { data } = useDemoData({
      dataSet: "Commodity",
      rowLength: 200,
      maxColumns: 15,
      editable: true,
   });


   const [paginationModel, setPaginationModel] = React.useState({
      page: 0,
      pageSize: 5,
   });

   const { isLoading, rows, pageInfo } = useQuery(paginationModel);

   // Some API clients return undefined while loading
   // Following lines are here to prevent `rowCountState` from being undefined during the loading
   const [rowCountState, setRowCountState] = React.useState(
      pageInfo?.totalRowCount || 0
   );

   React.useEffect(() => {
      setRowCountState((prevRowCountState) =>
         pageInfo?.totalRowCount !== undefined
            ? pageInfo?.totalRowCount
            : prevRowCountState
      );
   }, [pageInfo?.totalRowCount, setRowCountState]);

   return (
      <div className={s.container}>
         <div style={{ height: 400, width: "100%" }}>
            <DataGrid
               {...data}
               initialState={{
                  ...data.initialState,
                  pagination: { paginationModel: { pageSize: 5 } },
               }}
               pageSizeOptions={[5, 10, 25]}
               rowCount={rowCountState}
               loading={isLoading}
               paginationModel={paginationModel}
               paginationMode="server"
               onPaginationModelChange={setPaginationModel}
            />
         </div>
      </div>
   );
}
