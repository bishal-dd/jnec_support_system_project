import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { FiHome, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { FaTrashAlt, FaUserPlus, FaUserEdit, FaCheck } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import "react-pro-sidebar/dist/css/styles.css";

import "./adminav.css";

const AdminNav = () => {
  const location = useLocation();

  const [menuCollapse, setMenuCollapse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    // Extract the path from the current URL
    const currentPath = location.pathname;

    // Set the active menu based on the current path
    setActiveMenu(getActiveMenuFromPath(currentPath));

    // Check if the screen is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location]);

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const getActiveMenuFromPath = (path) => {
    // Map the path to the corresponding menu item
    switch (path) {
      case "/admin":
        return "dashboard";
      case "/admin/add":
        return "add";
      case "/admin/editworker":
        return "edit";
      case "/admin/delete":
        return "delete";
      case "/admin/assign":
        return "assign";
      case "/admin/working":
        return "working";
      case "/admin/solve":
        return "solve";
      default:
        return "";
    }
  };

  const headerStyle = {
    zIndex: menuCollapse ? "0" : "999",
  };

  return (
    <div id="header" style={headerStyle}>
      {isMobile && (
        <div className="collapse-button" onClick={menuIconClick}>
          {menuCollapse ? (
            <FiArrowRightCircle size={30} />
          ) : (
            <FiArrowLeftCircle size={30} />
          )}
        </div>
      )}
      {isMobile && menuCollapse ? null : (
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>HelpDesk</p>
            </div>
            {!isMobile && (
              <div className="closemenu" onClick={menuIconClick}>
                {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
              </div>
            )}
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                active={activeMenu === "dashboard"}
                icon={<FiHome />}
                onClick={() => handleMenuClick("dashboard")}
              >
                <Link to="/admin" className="text-dark">
                  Dashboard
                </Link>
              </MenuItem>
              <MenuItem
                active={activeMenu === "add"}
                icon={<FaUserPlus />}
                onClick={() => handleMenuClick("add")}
              >
                <Link to="/admin/add" className="text-dark">
                  Add Staff
                </Link>
              </MenuItem>
              <MenuItem
                active={activeMenu === "edit"}
                icon={<FaUserEdit />}
                onClick={() => handleMenuClick("edit")}
              >
                <Link to="/admin/editworker" className="text-dark">
                  Edit Staff
                </Link>
              </MenuItem>
              <MenuItem
                active={activeMenu === "delete"}
                icon={<FaTrashAlt />}
                onClick={() => handleMenuClick("delete")}
              >
                <Link to="/admin/delete" className="text-dark">
                  Delete Staff
                </Link>
              </MenuItem>
              <MenuItem
                active={activeMenu === "assign"}
                icon={<MdAssignmentAdd />}
                onClick={() => handleMenuClick("assign")}
              >
                <Link to="/admin/assign" className="text-dark">
                  Assigned
                </Link>
              </MenuItem>
              <MenuItem
                active={activeMenu === "working"}
                icon={<GrUserWorker />}
                onClick={() => handleMenuClick("working")}
              >
                <Link to="/admin/working" className="text-dark">
                  Working
                </Link>
              </MenuItem>
              <MenuItem
                active={activeMenu === "solve"}
                icon={<FaCheck />}
                onClick={() => handleMenuClick("solve")}
              >
                <Link to="/admin/solve" className="text-dark">
                  Solved
                </Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      )}
    </div>
  );
};

export default AdminNav;
