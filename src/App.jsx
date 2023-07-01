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
import GetToken from "./component/get-token/GetToken";
import ShopOrderPage from "./container/shop-order-page/ShopOrderPage";
import ShopOrderDataGrid from "./component/shop-order-data-grid/ShopOrderDataGrid";
import ShopOrderDetailsDataGrid from "./component/shop-order-details-data-grids/ShopOrderDetailsDataGrid";
import ShopStaffPage from "./container/shop-staff-page/ShopStaffPage";
import ShopStaffDataGrid from "./component/shop-staff-data-grid/ShopStaffDataGrid";
import CreateShopStaff from "./container/create-shop-staff/CreateShopStaff";
import ShopOwnerSettings from "./container/shop-owner-settings/ShopOwnerSettings";

function App() {
   return (
      <Routes>
         <Route path="/" element={<LayoutContainer />}>
            <Route index element={<DashBoard />} />
            <Route path={breadCrumbs.PRODUCTS.url} element={<Products />} />
            <Route path={breadCrumbs.ORDER.url} element={<ShopOrderPage />}>
               <Route index element={<ShopOrderDataGrid />} />
               <Route
                  path="order-details"
                  element={<ShopOrderDetailsDataGrid />}
               />
            </Route>
            <Route path="create-product" element={<UpdateProductPage />} />
            <Route path="logout" element={<TestPage />} />
            <Route path="get-token" element={<GetToken />} />
            <Route path={breadCrumbs.STAFF.url} element={<ShopStaffPage />} >
               <Route index element={<ShopStaffDataGrid/>}/>
               <Route path={'create-staff'} element={<CreateShopStaff/>}/>
            </Route>
            <Route path={`${breadCrumbs.UPDATE_PRODUCT.url}/:id`} element={<UpdateProductPage/>}/>
            <Route path={`${breadCrumbs.SETTINGS.url}`} element={<ShopOwnerSettings/>}/>
         </Route>
      </Routes>
   );
}

export default App;
