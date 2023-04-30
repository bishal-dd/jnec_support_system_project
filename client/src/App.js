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
import config from "./config";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedWorkerRoute from "./routes/ProtectedWorkerRoute";
import ProtectedViewerRoute from "./routes/ProtectedViewerRoute";
import EditWorkerComp from "./component/Admin/EditWorkerComp/EditWorkerComp";
import SolveComp from "./component/Admin/Solve/SolveComp";
import AssignComp from "./component/Admin/Assign/AssignComp";
import AdminNav from "./component/Admin/AdminNavigationComp/AdminNav";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" />
        <NavbarComp serverUrl={config.SERVER_URL} />

        <Routes>
          <Route element={<ProtectedRoute user={currentUser} />}>
            <Route
              path="/admin"
              element={<AdminHome />}
              serverUrl={config.SERVER_URL}
            />
            <Route
              path="/admin/edit"
              element={<EditComp serverUrl={config.SERVER_URL} />}
            />
            <Route
              path="/admin/add"
              element={<AddWorker serverUrl={config.SERVER_URL} />}
            />
            <Route
              path="/admin/delete"
              element={<DeleteWorkerComp serverUrl={config.SERVER_URL} />}
            />
            <Route
              path="/admin/editworker"
              element={<EditWorkerComp serverUrl={config.SERVER_URL} />}
            />
            <Route
              path="/admin/solve"
              element={<SolveComp serverUrl={config.SERVER_URL} />}
            />
            <Route
              path="/admin/assign"
              element={<AssignComp serverUrl={config.SERVER_URL} />}
            />
          </Route>
          <Route
            element={
              <ProtectedWorkerRoute
                user={currentUser}
                serverUrl={config.SERVER_URL}
              />
            }
          >
            <Route
              path="/worker"
              element={<WorkerComp serverUrl={config.SERVER_URL} />}
            />
          </Route>
          <Route
            element={
              <ProtectedViewerRoute
                user={currentUser}
                serverUrl={config.SERVER_URL}
              />
            }
          >
            <Route
              path="/view"
              element={<ViewerHome serverUrl={config.SERVER_URL} />}
            />
          </Route>
          <Route
            path="/"
            element={<HomeComp serverUrl={config.SERVER_URL} />}
          />
          <Route
            path="/login"
            element={<LoginComp serverUrl={config.SERVER_URL} />}
          />
          <Route
            path="/check"
            element={<CheckComp serverUrl={config.SERVER_URL} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
