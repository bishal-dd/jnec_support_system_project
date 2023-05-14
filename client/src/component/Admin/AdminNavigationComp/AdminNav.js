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
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
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
    <div className="flex">
      <Sidebar>
        <main>
          <button onClick={() => collapseSidebar()}>Collapse</button>
        </main>
        <Menu>
          <MenuItem component={<Link to="/admin" />}> Dashboard </MenuItem>
          <SubMenu label="Staffs">
            <MenuItem component={<Link to="/admin/add" />}>
              {" "}
              Add Staffs{" "}
            </MenuItem>
            <MenuItem component={<Link to="/admin/delete" />}>
              {" "}
              Delete Staffs{" "}
            </MenuItem>
            <MenuItem component={<Link to="/admin/editworker" />}>
              {" "}
              Edit Staffs{" "}
            </MenuItem>
          </SubMenu>
          <SubMenu label="Issues Status">
            <MenuItem component={<Link to="/admin/assign" />}>
              {" "}
              Assigned{" "}
            </MenuItem>
            <MenuItem component={<Link to="/admin/working" />}>
              {" "}
              Working{" "}
            </MenuItem>
            <MenuItem component={<Link to="/admin/solve" />}> Solved </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}
