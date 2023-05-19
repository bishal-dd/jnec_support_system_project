import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu,
} from "react-pro-sidebar";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { FaTrashAlt, FaUserPlus, FaUserEdit, FaCheck } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import "react-pro-sidebar/dist/css/styles.css";
import "./adminav.css";

const AdminNav = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
  };

  return (
    <div id="header">
      <ProSidebar className={menuCollapse ? "collapsed" : ""}>
        <SidebarHeader>
          <div className="logotext">
            <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
          </div>
          <div className="closemenu" onClick={menuIconClick}>
            {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem active={true} icon={<FiHome />}>
              <Link to="/admin" className="text-dark">
                Dashboard
              </Link>
            </MenuItem>
            <MenuItem icon={<FaUserPlus />}>
              <Link to="/admin/add" className="text-dark">
                Add Staff
              </Link>
            </MenuItem>
            <MenuItem icon={<FaUserEdit />}>
              <Link to="/admin/editworker" className="text-dark">
                Edit Staff
              </Link>
            </MenuItem>
            <MenuItem icon={<FaTrashAlt />}>
              <Link to="/admin/delete" className="text-dark">
                Delete Staff
              </Link>
            </MenuItem>
            <MenuItem icon={<MdAssignmentAdd />}>
              <Link to="/admin/assign" className="text-dark">
                Assigned
              </Link>
            </MenuItem>
            <MenuItem icon={<GrUserWorker />}>
              <Link to="/admin/working" className="text-dark">
                Working
              </Link>
            </MenuItem>
            <MenuItem icon={<FaCheck />}>
              <Link to="/admin/solve" className="text-dark">
                Solved
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default AdminNav;
