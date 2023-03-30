import "./App.css";
import NavbarComp from "./component/NavbarComp/NavbarComp";
import HomeComp from "./component/User/HomeComp/HomeComp";
import LoginComp from "./component/LoginComp/LoginComp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./component/Admin/AdminHome/AdminHome";
import CheckComp from "./component/CheckComp/CheckComp";
import WorkerComp from "./component/WorkerComp/WorkerComp";
import EditComp from "./component/EditComp/EditComp";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComp />
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/login" element={<LoginComp />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/check" element={<CheckComp />}  /> 
          <Route path="/worker"  element={<WorkerComp />} />
          <Route path="/edit" element={<EditComp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
