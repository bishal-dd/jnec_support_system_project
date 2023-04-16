import React from "react";

export default function DeleteWorkerComp() {
  return (
    <div id="editcontainer" className="">
      <table
        className="edit-container text-center 
        rounded-4 bg-light shadow"
      >
        <thead className="edit-items p-2 ">
          <tr>
            <th>SL No:</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Technician 1</td>

            <button className="btn btn-primary mb-2 mt-2 ">Remove</button>
          </tr>
          <tr>
            <td>2</td>
            <td>Technician 2</td>

            <button className="btn btn-primary mb-2 mt-2 ">Remove</button>
          </tr>
          <tr>
            <td>3</td>
            <td>Technician 3</td>

            <button className="btn btn-primary mb-2 mt-2 ">Remove</button>
          </tr>
          <tr>
            <td>4</td>
            <td>Technician 4</td>

            <button className="btn btn-primary mb-2 mt-2 ">Remove</button>
          </tr>
          <tr>
            <td>5</td>
            <td>Technician 5</td>

            <button className="btn btn-primary mb-2 mt-2 ">Remove</button>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}
