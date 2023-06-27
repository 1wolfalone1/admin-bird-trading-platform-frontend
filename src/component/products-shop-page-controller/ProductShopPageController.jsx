import clsx from "clsx";
import s from "./productShopPageController.module.scss";
import React, { useEffect, useState } from "react";
import {
   Box,
   Button,
   ButtonGroup,
   FormControl,
   InputLabel,
   Menu,
   MenuItem,
   Modal,
   OutlinedInput,
   Select,
   Tab,
   Tabs,
   Typography,
} from "@mui/material";
import CustomSelect from "../select-custom/CustomSelect";
import { useNavigate } from "react-router-dom";
import { CATEGORY, breadCrumbs, category } from "../../config/constant";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useDispatch, useSelector } from "react-redux";
import productShopSlice, {
   getProductTableAndPaging,
   productTableSelector,
} from "../../redux/productsShopSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { GridRowModes } from "@mui/x-data-grid";
import { api } from "../../api/api";
import theme from "../../style/theme";
import { modelStyle } from "./../../config/constant";

const MenuProps = {
   disableScrollLock: true,

   PaperProps: {
      style: {
         maxHeight: "15rem",
         color: "red",
         fontSize: "2rem",
      },
   },
};
const selectStyle = {
   fontSize: "1.3rem",
};
export default function ProductShopPageController() {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const [openModel, setOpenModel] = useState(false);
   const [deleteProducts, setDeleteProducts] = useState("");
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const handleCloseModelDelete = () => {
      setOpenModel(false);
   };
   const { type, listSelected, mode, currentPage } =
      useSelector(productTableSelector);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const handleTabValueChange = (e, value) => {
      const cate = Object.values(category).find((cate) => cate.id === value);
      dispatch(productShopSlice.actions.changeTab(cate));
   };
   useEffect(() => {
      let active = true;
      if (active) {
         dispatch(getProductTableAndPaging(1));
      }
      return () => {
         active = false;
      };
   }, [type]);
   const handleActionInRow = async (e) => {
      try {
         console.log(e.target.value);
         const res = await api.put("/shop-owner/products/status", {
            ids: listSelected,
            status: e.target.value,
         });
         const data = await res.data;
         console.log(data);
         dispatch(getProductTableAndPaging(currentPage));
         dispatch(productShopSlice.actions.changeListSelectedRows([]));
         console.log(e.target.value, openModel)
         if(e.target.value == -1) {
            console.log(e.target.value, openModel)
            setOpenModel(false);
         }
      } catch (e) {
         console.log(e);
      }
   };

   const handleChangeToEditMode = () => {
      const newRowModeModel = listSelected.reduce((acc, id) => {
         return { ...acc, [id]: { mode: GridRowModes.Edit } };
      }, {});
      dispatch(productShopSlice.actions.changeRowsModeModel(newRowModeModel));
      dispatch(productShopSlice.actions.changeTableMode("edit"));
   };
   const handleSaveMode = () => {
      const newRowModeModel = listSelected.reduce((acc, id) => {
         return { ...acc, [id]: { mode: GridRowModes.View } };
      }, {});
      dispatch(productShopSlice.actions.changeRowsModeModel(newRowModeModel));
      dispatch(productShopSlice.actions.changeTableMode("view"));
      dispatch(productShopSlice.actions.changeListSelectedRows([]));
   };

   const handleCancelMode = () => {
      const newRowModeModel = listSelected.reduce((acc, id) => {
         return {
            ...acc,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
         };
      }, {});
      dispatch(productShopSlice.actions.changeRowsModeModel(newRowModeModel));
      dispatch(productShopSlice.actions.changeTableMode("view"));
      dispatch(productShopSlice.actions.changeListSelectedRows([]));
   };

   return (
      <div className={clsx(s.controller, "box-shadow")}>
         <Grid2 container width={"100%"}>
            <Grid2 xs={6} className={s.right}>
               <Tabs
                  value={type.id}
                  onChange={handleTabValueChange}
                  aria-label="basic tabs example"
               >
                  {CATEGORY.map((cate) => (
                     <Tab label={cate.name} key={cate.id} value={cate.id} />
                  ))}
               </Tabs>
            </Grid2>
            <Grid2
               xs={6}
               sx={{ display: "flex", justifyContent: "end", gap: 1 }}
            >
               {mode === "view" ? (
                  <Button
                     variant="outlined"
                     disabled={listSelected.length === 0}
                     onClick={handleChangeToEditMode}
                  >
                     Edit
                  </Button>
               ) : (
                  <ButtonGroup variant="outlined">
                     <Button onClick={handleSaveMode}>Save</Button>
                     <Button onClick={handleCancelMode}>Cancel</Button>
                  </ButtonGroup>
               )}
               <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  variant="outlined"
               >
                  Action <KeyboardArrowDownIcon />
               </Button>
               <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  disableScrollLock
                  MenuListProps={{
                     "aria-labelledby": "basic-button",
                  }}
               >
                  <MenuItem onClick={handleActionInRow} value={1}>
                     Active
                  </MenuItem>
                  <MenuItem onClick={handleActionInRow} value={0}>
                     Inactive
                  </MenuItem>
                  <MenuItem onClick={() => setOpenModel(true)} value={-1}>
                     Delete
                  </MenuItem>
               </Menu>
               <Button
                  variant="outlined"
                  sx={{ fontSize: "1.5rem" }}
                  onClick={() => navigate(breadCrumbs.CREATE_PRODUCTS.url)}
               >
                  <span>Create products +</span>
               </Button>
            </Grid2>
         </Grid2>
         <Modal
            keepMounted
            open={openModel}
            onClose={handleCloseModelDelete}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
         >
            <Box
               sx={{
                  backgroundColor: theme.palette.template5.main,
                  ...modelStyle,
               }}
            >
               <Box
                  sx={{
                     backgroundColor: theme.palette.template5.contrastText,
                     padding: "1rem 2rem",
                  }}
               >
                  <Typography
                     sx={{ color: theme.palette.template4.main }}
                     variant="h4"
                  >
                     Delete products?
                  </Typography>
               </Box>
               <Box sx={{ padding: "1rem 2rem", display: 'flex' , flexDirection: 'column', gap: 1}}>
                  <Typography sx={{ fontSize: "2rem" }}>
                     The product has been deleted and cannot be obtained again.
                  </Typography>
                  <Typography sx={{ fontSize: "2rem", color: 'red' }}>
                     Are you certain that you want to delete everything?
                  </Typography>
               </Box>
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "end",
                     gap: 1,
                     padding: 1,
                  }}
               >
                  <Button variant="outlined" onClick={handleCloseModelDelete}>Cancel</Button>
                  <Button variant="outlined" onClick={handleActionInRow} value={-1}>Delete</Button>
               </Box>
            </Box>
         </Modal>
      </div>
   );
}
