import { createTheme } from "@mui/material";

const theme = createTheme({
   palette: {
      mode: 'dark',
      primary: {
         // light: will be calculated from palette.primary.main,
         main: '#cdffa6',
         contrastText: '#151515',
         // dark: will be calculated from palette.primary.main,
         // contrastText: will be calculated to contrast with palette.primary.main
       },
       secondary: {
         main: '#3e4044',
         // dark: will be calculated from palette.secondary.main,
         contrastText: '#cdffa6',
       },
       template4: {
         main: '#1d1e2c',
         contrastText: '#cdffa6',
       },
       template5: {
         main: '#24263a',
         contrastText: '#cdffd8',
       },
       template1: {
         main: '#ffebeb',
         contrastText: '#566068',
       },
       template2: {
         main: '#3e4044',
         contrastText: '#ffffff',
       },
       template3: {
         main: '#232323',
         contrastText: '#ffffff',
       }
       ,template6: {
        main: '#91daff',
        contrastText: '#0e0017',
      }
   },
   typography: {
    fontSize: 20
  },
})
export default theme ;