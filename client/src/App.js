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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedWorkerRoute from "./routes/ProtectedWorkerRoute";
import ProtectedViewerRoute from "./routes/ProtectedViewerRoute";
import EditWorkerComp from "./component/Admin/EditWorkerComp/EditWorkerComp";
import AssignComp from "./component/Admin/Assign/AssignComp";
import SolveComp from "./component/Admin/Solve/SolveComp";
import WorkingComp from "./component/Admin/WorkingComp/WorkingComp";
import WorkerHistory from "./component/WorkerComp/WorkerHistory";
import SuperAdmin from "./component/Super_Admin/SuperAdmin";
import EditAdmin from "./component/Super_Admin/EditAdmin";
import AdminIssues from "./component/Admin/AdminIssues/AdminIssues";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <NavbarComp />
        <ToastContainer position="top-center" />

        <Routes>
          <Route path="/super_admin" element={<SuperAdmin />} />
          <Route path="/edit_admin" element={<EditAdmin />} />

          <Route element={<ProtectedRoute user={currentUser} />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/edit" element={<EditComp />} />
            <Route path="/admin/add" element={<AddWorker />} />
            <Route path="/admin/delete" element={<DeleteWorkerComp />} />
            <Route path="/admin/editworker" element={<EditWorkerComp />} />
            <Route path="/admin/solve" element={<SolveComp />} />
            <Route path="/admin/assign" element={<AssignComp />} />
            <Route path="/admin/working" element={<WorkingComp />} />
            <Route path="/admin/admin_issues" element={<AdminIssues />} />
          </Route>

          <Route element={<ProtectedWorkerRoute user={currentUser} />}>
            <Route path="/worker" element={<WorkerComp />} />
            <Route path="/worker_history" element={<WorkerHistory />} />
          </Route>
          <Route element={<ProtectedViewerRoute user={currentUser} />}>
            <Route path="/view" element={<ViewerHome />} />
          </Route>
          <Route path="/" element={<HomeComp />} />
          <Route path="/login" element={<LoginComp />} />
          <Route path="/check" element={<CheckComp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
