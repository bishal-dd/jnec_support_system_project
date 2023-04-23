import React from "react";
import { FaTrashAlt, FaUserPlus, FaUserEdit, FaCheck, FaHome} from "react-icons/fa";
import { MdAssignmentAdd,} from 'react-icons/md'
export default function AdminNav() {
  return (
    <div class="pt-0">
    <div class="row flex-nowrap ">
        <div class="col-auto col-md-2 col-xl-2 bg-dark pt-50 ">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <a href="/admin" class="nav-link align-middle px-0">
                          <FaHome /> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/add" class="nav-link px-0 align-middle">
                        <FaUserPlus /> <span class="ms-1 d-none d-sm-inline">Add Worker</span></a>
                    </li>
                    <li>
                        <a href="/editworker" class="nav-link px-0 align-middle">
                      <FaUserEdit />    <span class="ms-1 d-none d-sm-inline">Edit Worker</span></a>
                    </li>
                    <li>
                        <a href="/delete" class="nav-link px-0 align-middle">
                          <FaTrashAlt />  <span class="ms-1 d-none d-sm-inline">Delete Worker</span></a>
                    </li>
                    <li>
                        <a href="/assign" class="nav-link px-0 align-middle">
                         <MdAssignmentAdd />   <span class="ms-1 d-none d-sm-inline">Assign</span></a>
                    </li>
                    <li>
                        <a href="/solve" class="nav-link px-0 align-middle">
                        <FaCheck />  <span class="ms-1 d-none d-sm-inline">Solve</span> </a>
                    </li>
                </ul>  
        </div>
    </div>
</div>
</div>
  );
}
