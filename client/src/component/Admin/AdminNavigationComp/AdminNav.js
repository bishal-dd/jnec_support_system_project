import React, { useState } from "react";
import {
  FaTrashAlt,
  FaUserPlus,
  FaUserEdit,
  FaCheck,
  FaHome,
} from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import "./adminav.css";
import { VscThreeBars } from "react-icons/vsc";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

export default function AdminNav() {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  return (
    <Sidebar className="position-fixed vh-100 rounded-2" id="sidebar">
      <Menu>
        <MenuItem component={<Link to="/admin" />}>
          {" "}
          <FaHome />
          <span className="p-2">Dashboard</span>
        </MenuItem>
        <SubMenu label="Staffs">
          <MenuItem component={<Link to="/admin/add" />}>
            {" "}
            <FaUserPlus />
            <span className="p-2">Add staff</span>{" "}
          </MenuItem>
          <MenuItem component={<Link to="/admin/delete" />}>
            <FaTrashAlt />
            <span className="p-2">Delete staff</span>
          </MenuItem>
          <MenuItem component={<Link to="/admin/editworker" />}>
            <FaUserEdit />
            <span className="p-2">Edit staff</span>
          </MenuItem>
        </SubMenu>
        <SubMenu label="Issues Status">
          <MenuItem component={<Link to="/admin/assign" />}>
            <MdAssignmentAdd />
            <span className="p-2">Assigned</span>
          </MenuItem>
          <MenuItem component={<Link to="/admin/working" />}>
            <MdAssignmentAdd />
            <span className="p-2">Working</span>
          </MenuItem>
          <MenuItem component={<Link to="/admin/solve" />}>
            {" "}
            <FaCheck /> <span className="p-2">Solved</span>{" "}
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}
