import React from 'react'

const Viewexpense = ({expenses,members}) => {
  return (
    <div className='viewexpense'>
      <h1>Expenses</h1>
      {expenses.length===0 ?
      (<p>No expenses added yet</p>):(
      <ul>
        {expenses.map((expense)=>(
          <li key={expense.id}>{expense.title}
          <p><span>Amount:</span> 
          {expense.amount}
          </p>
          <p className="expense-detail">
                <span className="expense-label"> Paid By:</span>{" "}  
               { console.log(members.find((m) => m.id ===  (expense.paidby))?.name )}
                {console.log("Expense:", expense)}
                {console.log("Members:", members)  } 

                {members.find((m) => m.id ===  (expense.paidby))?.name ?? "Unknown"}
              </p>
          <p>
            <span>
            Split between:
            
            </span>
            {expense.splitbetween.map((id) => members.find((m) => m.id === id)?.name)
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