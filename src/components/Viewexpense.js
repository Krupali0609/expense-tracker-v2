import React from 'react'
import './Viewexpense.css';

const Viewexpense = ({ expenses, members }) => {
  return (
    <div className="viewexpense-container">
      <h1 className="viewexpense-title">Expenses</h1>

      {expenses.length === 0 ? (
        <p className="no-expense">No expenses added yet</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense-item">
              <h3 className="expense-name">{expense.title}</h3>

              <p className="expense-detail">
                <span className="expense-label">Amount:</span>{" "}
                {expense.amount}
              </p>

              <p className="expense-detail">
                <span className="expense-label">Paid By:</span>{" "}
                {members.find((m) => String(m.id) === String(expense.paidby))?.name ?? "Unknown"}
              </p>

              <p className="expense-detail">
                <span className="expense-label">Split Between:</span>{" "}
                {expense.splitbetween
                  .map((id) => members.find((m) => String(m.id) === String(id))?.name)
                  .join(", ")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Viewexpense