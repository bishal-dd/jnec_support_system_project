import React from "react";

export default function HomeComp() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Submit an Issue</h1>
      <form action="submit.php" method="post" enctype="multipart/form-data">
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
            <option value="bug">Bug</option>
            <option value="feature">Feature Request</option>
            <option value="support">Support Request</option>
            <option value="other">Other</option>
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
        <div className="form-group">
          <label htmlFor="issue-image">Issue Image:</label>
          <input
            type="file"
            id="issue-image"
            name="issue-image"
            className="form-control-file"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Issue
        </button>
      </form>
    </div>
  );
}
