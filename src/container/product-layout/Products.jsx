import { breadCrumbs } from "../../config/constant";
import s from "./products.module.scss";
import React from "react";
import useBreadCrumb from "../../custom-hook/useBreadCrumb";
import { DataGrid, gridExpandedSortedRowIdsSelector, gridVisibleColumnDefinitionsSelector, useGridApiRef } from "@mui/x-data-grid";
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
   const apiRef = useGridApiRef();
   const { data } = useDemoData({
      dataSet: "Commodity",
      rowLength: 100,
      maxColumns: 20,
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
   const [coordinates, setCoordinates] = React.useState({
      rowIndex: 0,
      colIndex: 0,
    });
   React.useEffect(() => {
      setRowCountState((prevRowCountState) =>
         pageInfo?.totalRowCount !== undefined
            ? pageInfo?.totalRowCount
            : prevRowCountState
      );

   }, [pageInfo?.totalRowCount, setRowCountState]);
   React.useEffect(() => {
      const { rowIndex, colIndex } = coordinates;
      apiRef.current.scrollToIndexes(coordinates);
      const id = gridExpandedSortedRowIdsSelector(apiRef)[rowIndex];
      const column = gridVisibleColumnDefinitionsSelector(apiRef)[colIndex];
      apiRef.current.setCellFocus(id, column.field);
    }, [apiRef, coordinates]);
   return (
      <div className={s.container}>
         <div style={{ height: 400, width: "100%" }}>
            <DataGrid
             apiRef={apiRef}
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
