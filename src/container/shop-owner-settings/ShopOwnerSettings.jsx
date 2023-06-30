import React, { useEffect, useRef, useState } from "react";
import useBreadCrumb from "../../custom-hook/useBreadCrumb";
import { breadCrumbs } from "./../../config/constant";
import { useSelector } from "react-redux";
import { userInfoSliceSelector } from "../../redux/userInfoSlice";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";
import {
   Avatar,
   Button,
   ButtonGroup,
   FormHelperText,
   Modal,
   TextField,
   Tooltip,
   Typography,
} from "@mui/material";
import theme from "../../style/theme";
import clsx from "clsx";
import MapControl from "../../component/map-control/MapControl";
import s from "./shopOwnerSettings.module.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { styleFormUpdate } from "../../component/form-update-product/FormUpdateProduct";
import ReactQuill from "react-quill";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
let breadCrumbPath = [breadCrumbs.SETTINGS];
const validationSchema = yup.object({
   shopName: yup.string("").required("Shop name is required!"),
   phone: yup
      .string()
      .matches(/^(?!\D)/, "Phone number is not valid!")
      .required("Phone number is required!"),
   description: yup
      .string()
      .min(100, "Description must be at least 100 characters long")
      .required("Description is required!"),
});
const QuillWrapper = ({ field, form, ...props }) => {
   const { name } = field;
   const { setFieldValue } = form;
   const { value } = field;
   const handleChange = (content) => {
      setFieldValue(name, content);
   };
   return (
      <ReactQuill
         {...props}
         style={{ width: "100%" }}
         value={value}
         onChange={handleChange}
         onBlur={() => form.setFieldTouched(name, true)}
      />
   );
};
export default function ShopOwnerSettings() {
   const [openModel, setOpenModel] = useState(false);
   const [address, setAddress] = useState();
   const [triggers, setTriggers] = useState(0);
   const [isEditable, setIsEditable] = useState(false); // Editable state for the fields
   const [valueAvatar, setValueAvatar] = useState();
   const [valueCoverImage, setValueCoverImage] = useState();
   const hiddenAvatarInput = useRef(null);
   const hiddenCoverImageInput = useRef(null);
   const [errorCustom, setErrorCustom] = useState({
      avatar: "",
      address: "",
   });

   const hiddenFileInput = (e) => {};
   const form = useFormik({
      initialValues: {
         shopName: "",
         description: "",
         shopPhone: "",
      },
      validationSchema: validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
      validationOnMount: true,
      onSubmit: async () => {
         console.log(form.values);
      },
   });
   const { info } = useSelector(userInfoSliceSelector);
   useEffect(() => {
      if (info) {
         form.setValues({
            shopName: info.shopName,
            description: info.description,
            shopPhone: info.shopPhone,
         });
         setAddress(info?.address?.address);
      }
   }, [info]);
   console.log(info);
   useBreadCrumb(breadCrumbPath);
   const handleUpdateAvatar = (e) => {};
   const handleUpdateCoverImage = (e) => {};
   const handleClickFile = (e) => {
      const target = e.target.value;
      console.log(target);
      if (target == 0) {
         hiddenCoverImageInput.current.click();
      } else if (target == 1) {
         console.log(hiddenAvatarInput);
         hiddenAvatarInput.current.click();
      }
   };
   return (
      <Box sx={{ width: "100%", padding: "3rem 0 0 0" }}>
         <Typography
            variant="h3"
            fullWidth
            sx={{ textAlign: "center", marginBottom: "3rem", color: "#241e00" }}
         >
            Shop profile
         </Typography>
         <Grid2 container spacing={4}>
            <Grid2 xs={5} sx={{ position: "relative", height: "fit-content" }}>
               <Box
                  fullWidth
                  sx={{
                     backgroundImage: `url(${info?.coverImgUrl})`,
                     backgroundSize: "cover",
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center",
                     // Additional styling properties
                     height: "300px",
                     filter: "brightness(0.9)",

                     borderRadius: "1rem",
                  }}
                  className={clsx("box-shadow")}
               >
                  <Box position={"absolute"} right={0} bottom={0}>
                     {isEditable && (
                        <ButtonGroup orientation={"vertical"}>
                           <Button
                              variant="contained"
                              onClick={handleClickFile}
                              value={0}
                              sx={{
                                 display: "flex",
                                 justifyContent: "space-between",
                                 gap: 2,
                              }}
                           >
                              Cover image
                              <AutoFixHighIcon />
                           </Button>
                           <Button
                              variant="contained"
                              onClick={handleClickFile}
                              value={1}
                              sx={{
                                 display: "flex",
                                 justifyContent: "space-between",
                                 gap: 2,
                              }}
                           >
                              Avatar
                              <AutoFixHighIcon />
                           </Button>
                        </ButtonGroup>
                     )}
                  </Box>
                  <input
                     value={valueAvatar}
                     type="file"
                     ref={hiddenAvatarInput}
                     style={{ display: "none" }}
                     onChange={handleUpdateAvatar}
                     accept="image/*"
                  />
                  <input
                     value={valueCoverImage}
                     type="file"
                     ref={hiddenCoverImageInput}
                     style={{ display: "none" }}
                     onChange={handleUpdateCoverImage}
                     accept="image/*"
                  />
               </Box>
               <Box
                  sx={{
                     position: "absolute",
                     height: "20rem",
                     width: "20rem",
                     bottom: "-50%",
                     transform: "translate(30%, -50%)",
                  }}
               >
                  <Avatar
                     src={info.avatarImgUrl}
                     alt=""
                     sx={{ width: "100%", height: "100%" }}
                  />
               </Box>
            </Grid2>

            <Grid2
               xs={7}
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
               }}
            >
               <Box
                  fullWidth
                  display="flex"
                  flexDirection={"column"}
                  gap="2rem"
               >
                  <form
                     className={clsx("box-shadow")}
                     style={{
                        backgroundColor: theme.palette.template5.main,
                        borderRadius: "1rem",
                        padding: "3rem 2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "3rem",
                     }}
                  >
                     <TextField
                        disabled={!isEditable}
                        id="shopName"
                        name="shopName"
                        label="Shop name"
                        variant="outlined"
                        size="medium"
                        value={form.values.shopName ? form.values.shopName : ""}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={
                           form.touched.shopName &&
                           Boolean(form.errors.shopName)
                        }
                        helperText={
                           form.touched.shopName && form.errors.shopName
                        }
                        color="template7"
                        fullWidth
                     />
                     <TextField
                        disabled={!isEditable}
                        id="shopPhone"
                        name="shopPhone"
                        label="Phone number"
                        variant="outlined"
                        size="medium"
                        value={
                           form.values.shopPhone ? form.values.shopPhone : ""
                        }
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={
                           form.touched.shopPhone &&
                           Boolean(form.errors.shopPhone)
                        }
                        helperText={
                           form.touched.shopPhone && form.errors.shopPhone
                        }
                        color="template7"
                        fullWidth
                     />
                     <Tooltip
                        title={
                           <Typography
                              fontSize={"2rem"}
                              color={"template4.main"}
                           >
                              {address}
                           </Typography>
                        }
                     >
                        <Grid2 container sx={{ width: "80rem" }}>
                           <Grid2
                              xs={8}
                              sx={{
                                 display: "flex",
                                 alignItems: "center",
                                 border: "1px solid #6a6a6a",
                                 borderTopLeftRadius: "5px",
                                 borderBottomLeftRadius: "5px",
                                 padding: "1rem",
                              }}
                           >
                              <Typography
                                 noWrap
                                 sx={{
                                    fontSize: "2.4rem",
                                    paddingLeft: "1rem",
                                    color: "#7d7d7d",
                                    width: "100%",
                                 }}
                              >
                                 {address ? address : "You don't have address"}
                              </Typography>
                           </Grid2>
                           <Grid2 xs={4} sx={{ display: "flex" }}>
                              <Button
                                 disabled={!isEditable}
                                 fullWidth
                                 variant="outlined"
                                 color="table"
                                 onClick={() => {
                                    setOpenModel(true);
                                    setTriggers(0);
                                 }}
                                 sx={{
                                    fontSize: "2rem",
                                    borderRadius: "0",
                                    borderTopRightRadius: "5px",
                                    borderBottomRightRadius: "5px",
                                 }}
                              >
                                 Change
                              </Button>
                           </Grid2>
                        </Grid2>
                     </Tooltip>
                     {!address ? (
                        <FormHelperText error sx={{ fontSize: "1.6rem" }}>
                           {errorCustom.address}
                        </FormHelperText>
                     ) : (
                        ""
                     )}
                     <Box>
                        <QuillWrapper
                           disabled={!isEditable}
                           placeholder="Write description here..."
                           field={form.getFieldProps("description")}
                           form={form}
                        />
                        {form.touched.description &&
                           form.errors.description && (
                              <FormHelperText error>
                                 {form.errors.description}
                              </FormHelperText>
                           )}
                     </Box>
                  </form>
                  <Box
                     display={"flex"}
                     justifyContent={"flex-end"}
                     fullWidth
                     sx={{ flex: 1, width: "100%" }}
                  >
                     {isEditable ? (
                        <>
                           <Button
                              variant="outlined"
                              onClick={() => setIsEditable(false)}
                              sx={{ fontSize: "2rem", marginRight: "1rem" }}
                              color="template8"
                           >
                              Cancel
                           </Button>
                           <Button
                              variant="outlined"
                              onClick={() => setIsEditable(true)}
                              sx={{ fontSize: "2rem" }}
                              color="template7"
                           >
                              Save
                           </Button>
                        </>
                     ) : (
                        <Button
                           variant="outlined"
                           sx={{ fontSize: "2rem" }}
                           onClick={() => setIsEditable(true)}
                           color="template7"
                        >
                           Edit
                        </Button>
                     )}
                  </Box>
               </Box>
            </Grid2>
         </Grid2>
         <Modal
            open={openModel}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
         >
            <div className={s.model}>
               <MapControl
                  address={address}
                  setAddress={setAddress}
                  triggerSave={triggers}
                  w="70rem"
                  h="40rem"
                  setOpenModel={setOpenModel}
               />
               <Box display={"flex"} justifyContent={"end"} mt={4} gap={1}>
                  <Button
                     onClick={() => setOpenModel(false)}
                     variant="outlined"
                     sx={{ fontSize: "1.6rem" }}
                  >
                     Back
                  </Button>
                  <Button
                     variant="outlined"
                     sx={{ fontSize: "1.6rem" }}
                     onClick={() => setTriggers((state) => state + 1)}
                  >
                     Save
                  </Button>
               </Box>
            </div>
         </Modal>
      </Box>
   );
}
