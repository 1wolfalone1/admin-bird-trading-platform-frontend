import {
   FormControl,
   InputLabel,
   MenuItem,
   OutlinedInput,
   Select,
} from "@mui/material";
import s from "./customSelect.module.scss";
import React from "react";
const MenuProps = {
   disableScrollLock: true,

   PaperProps: {
      style: {
         maxHeight: "19rem",
         color: "red",
         fontSize: "3rem",
      },
   },
};

const selectStyle = {
   fontSize: "1.6rem",
};
export default function CustomSelect() {
   return (
      <FormControl color="primary" fullWidth >
         <InputLabel
            id="demo-multiple-checkbox-label"
            sx={{ fontSize: "1.6rem",  }}
         >
            Categories
         </InputLabel>
         <Select
            input={<OutlinedInput label="Categories" />}
            renderValue={(selected) => {
               const renderValue = selected.join(", ");
               return renderValue;
            }}
            MenuProps={MenuProps}
            fullWidth={true}
            sx={selectStyle}
         >
            <MenuItem>dsfasf</MenuItem>
         </Select>
      </FormControl>
   );
}
