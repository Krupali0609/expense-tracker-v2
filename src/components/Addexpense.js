import React, { useState } from 'react';
import './Addexpense.css';

const Addexpense = ({ onaddexpense, members }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidby, setPaidby] = useState("");
  const [splitbetween, setSplitbetween] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !paidby || splitbetween.length === 0) {
      alert("Please fill all the form values");
      return;
    }

    const expense = { title, amount, paidby, splitbetween };
    onaddexpense(expense)
    setTitle("");
    setAmount("");
    setPaidby("");
    setSplitbetween([]);
  };

  const handleCheckbox = (id) => {
    if (splitbetween.includes(id)) {
      setSplitbetween(splitbetween.filter((item) => item !== id));
    } else {
      setSplitbetween([...splitbetween, id]);
    }
  };

  return (
    <div className="addexpense-container">
      <h1 className="addexpense-title">Add Expense</h1>
      <form onSubmit={handleSubmit} className="addexpense-form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="addexpense-input"
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="addexpense-input"
        />

        <label className="addexpense-label">Paid By:</label>
        <select
          value={paidby}
          onChange={(e) => setPaidby(e.target.value)}
          className="addexpense-select"
        >
          <option value="">Select member</option>
          {members.map((member) => (
            <option key={member.id} value={member.name}>
              {member.name}
            </option>
          ))}
        </select>

        <label className="addexpense-label">Split Between:</label>
        <div className="addexpense-checkbox-group">
          {members.map((member) => (
            <div key={member.id} className="addexpense-checkbox-item">
              <input
                type="checkbox"
                id={member.id}
                value={member.id}
                checked={splitbetween.includes(member.id)}
                onChange={() => handleCheckbox(member.id)}
              />
              <label htmlFor={member.id}>{member.name}</label>
            </div>
          ))}
        </div>

        <button type="submit" className="addexpense-button">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Addexpense;