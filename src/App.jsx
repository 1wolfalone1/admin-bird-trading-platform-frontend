import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutContainer from "./container/layout/LayoutContainer";
import DashBoard from "./container/dashboard/DashBoard";
import { breadCrumbs } from "./config/constant";
import Products from "./container/product-layout/Products";
import TestPage from "./container/test-page/TestPage";
import UpdateProductPage from "./container/update-product-page/UpdateProductPage";
import "cropperjs/dist/cropper.css";

function App() {
 
   return (
      <Routes>
         <Route path="/" element={<LayoutContainer />}>
            <Route index element={<DashBoard />} />
            <Route path={breadCrumbs.PRODUCTS.url} element={<Products />} />
            <Route path="create-product" element={<UpdateProductPage />} />
            <Route path="logout" element={<TestPage />} />
         </Route>
      </Routes>
   );
}

export default App;
