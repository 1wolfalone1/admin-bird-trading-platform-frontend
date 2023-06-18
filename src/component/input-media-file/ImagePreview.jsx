import { Button, Divider, IconButton } from "@mui/material";
import s from "./inputImageFile.module.scss";
import React from "react";
import clsx from "clsx";
import PhotoSizeSelectLargeOutlinedIcon from "@mui/icons-material/PhotoSizeSelectLargeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "react-redux";
import fileControlSlice from "../../redux/fileControlSlice";

const style = {
   button: {},
   icon: {
      "&:hover": {
         color: "yellow",
      },
   },
};

export default function ImagePreview({ image }) {
   const dispatch = useDispatch();
   return (
      <div className={clsx(s.container, s.previewImg)}>
         <img src={image.src} alt="" />
         <div className={s.control}>
            <IconButton
               color="inputImage"
               sx={style.icon}
               onClick={() => {
                  dispatch(fileControlSlice.actions.changeCurrentEdit(image));
                  dispatch(fileControlSlice.actions.openEditor(true));
               }}
            >
               <PhotoSizeSelectLargeOutlinedIcon sx={style.icon} />
            </IconButton>
            <Divider
               sx={{ background: "red", height: "1rem" }}
               color="inputImage"
               orientation="vertical"
            />
            <IconButton
               color="inputImage"
               sx={style.icon}
               onClick={() =>
                  dispatch(fileControlSlice.actions.removeImage(image))
               }
            >
               <DeleteOutlineIcon sx={style.icon} />
            </IconButton>
         </div>
      </div>
   );
}
