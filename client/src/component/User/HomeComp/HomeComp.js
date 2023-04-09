import React from "react";

export default function HomeComp() {
  return (
    <div
      className="container border border-2 rounded-4 p-4 mt-5"
      style={{ maxWidth: "600px" }}
    >
      <h1 className="mb-4">Submit an Issue</h1>
      <form method="post" enctype="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="issue-type">Issue Type:</label>
          <select id="issue-type" name="issue-type" className="form-control">
            <option value="">Select a department...</option>
            <option value="ICT">ICT</option>
            <option value="estate">Estate</option>
            <option value="eletrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="issue-summary">Issue Summary:</label>
          <textarea
            id="issue-summary"
            name="issue-summary"
            rows="4"
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="issue-image">Issue Image:</label>
          <input
            type="file"
            id="issue-image"
            name="issue-image"
            className="form-control-file"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit Issue
        </button>
      </form>
    </div>
  );
}
