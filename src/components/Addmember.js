import React, { useState } from "react";
import "./Addmember.css";
import { FaUser } from "react-icons/fa";

const AddMember = ({ onaddmember, members }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    onaddmember(name);
    setName("");
  };

  return (
    <div className="addmember-container">
      <form onSubmit={handleSubmit} className="addmember-form">
        <h1 className="addmember-title">Add Member</h1>
        <input
          type="text"
          value={name}
          placeholder="Enter member name"
          onChange={(e) => setName(e.target.value)}
          className="addmember-input"
        />
        <button type="submit" className="addmember-button">
          Add Member
        </button>
      </form>

      <div className="member-list-container">
        <h3>Member List:</h3>
        <ul className="member-list">
          {members.map((member) => (
            <li key={member.id}><FaUser className="member-icon" /> {member.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddMember;