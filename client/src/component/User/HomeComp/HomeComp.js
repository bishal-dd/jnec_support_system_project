import React from "react";

export default function HomeComp() {
  return (
    <div class="container mt-5">
      <h1 class="mb-4">Submit an Issue</h1>
      <form action="submit.php" method="post" enctype="multipart/form-data">
        <div class="form-group">
          <label for="issue-type">Issue Type:</label>
          <select id="issue-type" name="issue-type" class="form-control">
            <option value="bug">Bug</option>
            <option value="feature">Feature Request</option>
            <option value="support">Support Request</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="issue-summary">Issue Summary:</label>
          <textarea
            id="issue-summary"
            name="issue-summary"
            rows="4"
            class="form-control"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="issue-image">Issue Image:</label>
          <input
            type="file"
            id="issue-image"
            name="issue-image"
            class="form-control-file"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit Issue
        </button>
      </form>
    </div>
  );
}
