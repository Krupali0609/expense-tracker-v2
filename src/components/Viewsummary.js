import React from 'react';

const Viewsummary = ({ members, expenses }) => {
  const balances = {};

  // Initialize balances
  members.forEach(member => {
    balances[member.id] = 0;
  });

  // Total expense
  const totalExpense = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const amountOwedPerPerson = totalExpense / members.length;

  // Credit members who paid
  expenses.forEach(expense => {
    balances[expense.paidBy] += Number(expense.amount);
  });

  // Who owes money
  const owesMoneyList = members
    .map(member => {
      const paid = balances[member.id];
      const amountOwes = amountOwedPerPerson - paid;
      if (amountOwes > 0.01) {
        return { id: member.id, name: member.name, amount: amountOwes };
      }
      return null;
    })
    .filter(item => item !== null);

  // Who gets back money
  const getsBackMoneyList = members
    .map(member => {
      const paid = balances[member.id];
      const amountGetsBack = paid - amountOwedPerPerson;
      if (amountGetsBack > 0.01) {
        return { id: member.id, name: member.name, amount: amountGetsBack };
      }
      return null;
    })
    .filter(item => item !== null);

  // Full summary
  const summaryList = members.map(member => {
    const paid = balances[member.id];
    const amountOwes = amountOwedPerPerson - paid;
    const amountGetsBack = paid - amountOwedPerPerson;
    return {
      id: member.id,
      name: member.name,
      paid,
      amountOwes,
      amountGetsBack,
    };
  });

  return (
    <div>
      <h1>View Summary</h1>

      <h3>Who Owes Money:</h3>
      <ul>
        {owesMoneyList.map(info => (
          <li key={info.id}>
            {info.name} owes ${info.amount.toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Who Gets Back Money:</h3>
      <ul>
        {getsBackMoneyList.map(info => (
          <li key={info.id}>
            {info.name} should get back ${info.amount.toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Summary:</h3>
      <ul>
        {summaryList.map(({ id, name, paid, amountOwes, amountGetsBack }) => (
          <li key={id}>
            <h4>{name}</h4>
            <p>Total Paid: ${paid.toFixed(2)}</p>
            <p>Amount Owes: ${amountOwes > 0 ? amountOwes.toFixed(2) : "0.00"}</p>
            <p>Amount Gets Back: ${amountGetsBack > 0 ? amountGetsBack.toFixed(2) : "0.00"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Viewsummary;