import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayoutContainer from "./container/layout/LayoutContainer";
import DashBoard from "./container/dashboard/DashBoard";

function App() {
   return (
      <Routes>
         <Route path="/" element={<LayoutContainer />}>
            <Route index element={<DashBoard />} />
         </Route>
      </Routes>
   );
}

export default App;
