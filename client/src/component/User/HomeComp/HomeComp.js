import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function HomeComp({ serverUrl }) {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    issue_image: null,
    issue_type: "",
    issue_summary: "",
  };

  const [state, setState] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("email", state.email);
    formData.append("phone", state.phone);
    formData.append("issue_type", state.issue_type);
    formData.append("issue_summary", state.issue_summary);
    formData.append("issue_image", state.issue_image);

    try {
      await axios.post(`${serverUrl}/issue`, formData).then((result) => {
        if (result.data === "issue submited") {
          toast.success("Issue Submited");
        }
      });
      setState(initialState);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "issue_image") {
      setState({ ...state, [name]: files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const { name, email, phone, issue_type, issue_summary } = state;
  return (
    <div
      className="container border border-2 rounded-4 p-4 mt-5"
      style={{ maxWidth: "600px" }}
    >
      <h1 className="mb-4">Submit an Issue</h1>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            pattern="[0-9]{8}"
            value={phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="issue_type">Issue Type:</label>
          <select
            id="issue_type"
            name="issue_type"
            className="form-control"
            value={issue_type}
            onChange={handleChange}
            required
          >
            <option value="">Select a type...</option>
            <option value="ICT">ICT</option>
            <option value="estate">Estate</option>
            <option value="academic">Academic</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="issue-summary">Issue Summary:</label>
          <textarea
            id="issue-summary"
            name="issue_summary"
            rows="4"
            className="form-control"
            onChange={handleChange}
            value={issue_summary}
            required
          ></textarea>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="issue-image">Issue Image:</label>
          <input
            type="file"
            id="issue_image"
            name="issue_image"
            className="form-control-file"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Submit Issue
        </button>
      </form>
    </div>
  );
}
