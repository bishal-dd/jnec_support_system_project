import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./homecomp.css";

export default function HomeComp() {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    issue_image: null,
    issue_type: "",
    issue_summary: "",
  };

  const [state, setState] = useState(initialState);
  const [showInstruction, setShowInstruction] = useState(false);

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
      await axios
        .post(`${process.env.REACT_APP_URL}/issue`, formData)
        .then((result) => {
          if (result.data === "Issue submitted") {
            toast.success("Issue Submitted");
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

  const toggleInstruction = () => {
    setShowInstruction(!showInstruction);
  };

  const { name, email, phone, issue_type, issue_summary } = state;

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <div className="row">
        <div className="col p-3" id="home_form">
          <h1 className="mb-4 text-center">Submit an Issue</h1>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="form-border shadow p-4 rounded-3">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control rounded bg-light "
                  placeholder="Enter your name"
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
                  className="form-control rounded bg-light"
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
                  className="form-control rounded bg-light"
                  pattern="[0-9]{8}"
                  placeholder="00000000"
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
                  className="form-control rounded bg-light"
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
                  className="form-control rounded bg-light"
                  onChange={handleChange}
                  placeholder="please mention the location if required for your issue"
                  value={issue_summary}
                  required
                ></textarea>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="issue_image">Issue Image:</label>
                <input
                  type="file"
                  id="issue_image"
                  name="issue_image"
                  accept="image/*"
                  className="form-control-file p-2 rounded"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button
                  type="submit"
                  className="btn btn-primary mt-3 rounded-2"
                >
                  Submit Issue
                </button>
              </div>
              <div className="col">
                {" "}
                <p className="mt-4">
                  <span onClick={toggleInstruction} className="text-primary">
                    Instruction--
                  </span>
                </p>
              </div>
            </div>
          </form>
          {showInstruction ? (
            <div className="border border-dark p-3 mt-3 rounded-3">
              Instruction
              <br />
              <ul>
                <li>
                  You can enter the information like name,email and number so
                  that we can keep you updated.
                </li>
                <li>Then you choose the most appropriate issue type:</li>
                <ul>
                  <li>
                    <b>ICT</b> for anything related to computers, laptops and
                    network.
                  </li>
                  <li>
                    <b>Estate</b> for anything relating to electrical, plumbing,
                    masonry, carpentry etc...
                  </li>
                  <li>
                    <b>Academic</b> for anything related to your studies.
                  </li>
                </ul>
                <li>Then you can provide a detailed summary of the issue.</li>
                <li>
                  Finally you can provide a image {"(if any)"} , so that we can
                  get a clear picture of your issue.
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
