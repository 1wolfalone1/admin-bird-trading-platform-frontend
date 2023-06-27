import { createTheme } from "@mui/material";

const theme = createTheme({
   palette: {
      mode: "light",
      
      secondary: {
         contrastText: "#3e4044",
         // dark: will be calculated from palette.secondary.main,
         main: "#cdffa6",
      },
      template4: {
         contrastText: "#1d1e2c",
         main: "#cdffa6",
      },
      template5: {
         contrastText: "#24263a",
         main: "rgb(253, 255, 236)",
      },
      template1: {
         contrastText: "#ffebeb",
         main: "#566068",
      },
      template2: {
         contrastText: "#3e4044",
         main: "#ffffff",
      },
      template3: {
         contrastText: "#232323",
         main: "#ffffff",
      },
      template6: {
         contrastText: "#444444",
         main: "#cdffa6",
      },
      table: {
         contrastText: "#adadad",
         main: "#10001a",
      },
      inputImage: {
         main: "#ff8f8f",
         contrastText: "#0a0a0a",
      },
      template7: {
         main: '#001706',
         contrastText: "#fdfbfb",
      },
      template8: {
         main: '#bd4f00',
         contrastText: "#000000",
      }
   },
   typography: {
      fontSize: 24,
   },
});
export default theme;
