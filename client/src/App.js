import "./App.css";
import NavbarComp from "./component/NavbarComp/NavbarComp";
import HomeComp from "./component/User/HomeComp/HomeComp";
import LoginComp from "./component/LoginComp/LoginComp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./component/Admin/AdminHome/AdminHome";
import CheckComp from "./component/CheckComp/CheckComp";
import WorkerComp from "./component/WorkerComp/WorkerComp";
import EditComp from "./component/Admin/EditComp/EditComp";
import AddWorker from "./component/Admin/AddWorker/AddWorker";
import DeleteWorkerComp from "./component/Admin/DeleteWorkerComp/DeleteWorkerComp";
import ViewerHome from "./component/Viewer/ViewerHome";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedWorkerRoute from "./routes/ProtectedWorkerRoute";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <NavbarComp />
        <Routes>
          <Route element={<ProtectedRoute user={currentUser} />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/edit" element={<EditComp />} />
            <Route path="/add" element={<AddWorker />} />
            <Route path="/delete" element={<DeleteWorkerComp />} />
          </Route>
          <Route element={<ProtectedWorkerRoute user={currentUser} />}>
            <Route path="/worker" element={<WorkerComp />} />
          </Route>
          <Route path="/" element={<HomeComp />} />
          <Route path="/login" element={<LoginComp />} />
          <Route path="/check" element={<CheckComp />} />
          <Route path="/view" element={<ViewerHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
