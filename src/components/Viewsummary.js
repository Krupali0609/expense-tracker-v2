import React from 'react';
import "./Viewsummary.css"
const EPS = 0.01;

const Viewsummary = ({ members = [], expenses = [] }) => {
  const memberMap = {};
  members.forEach(m => { memberMap[String(m.id)] = m.name; });

  const paidTotals = {};
  const owedTotals = {};
  const owesTo = {};

  const ensureMember = (idRaw) => {
    const id = String(idRaw);
    if (!(id in paidTotals)) {
      paidTotals[id] = 0;
      owedTotals[id] = 0;
      owesTo[id] = {};
      if (!(id in memberMap)) memberMap[id] = id;
    }
    return id;
  };

  members.forEach(m => ensureMember(m.id));

  // Process each expense
  expenses.forEach(exp => {
    const amount = Number(exp.amount) || 0;
    const payerId = ensureMember(exp.paidby);
    const participantsRaw = exp.splitbetween?.length ? exp.splitbetween : members.map(m => m.id);
    const participants = participantsRaw.map(ensureMember);

    if (participants.length === 0) return;

    const share = amount / participants.length;
    paidTotals[payerId] += amount;

    participants.forEach(pid => {
      owedTotals[pid] += share;
      if (pid !== payerId) {
        owesTo[pid][payerId] = (owesTo[pid][payerId] || 0) + share;
      }
    });
  });

  // Summary list
  const summaryList = members.map(m => {
    const id = String(m.id);
    const totalPaid = paidTotals[id] || 0;
    const totalShare = owedTotals[id] || 0;
    const net = totalPaid - totalShare;

    return {
      id,
      name: m.name,
      totalPaid,
      totalShare,
      amountOwes: net < -EPS ? Math.abs(net) : 0,
      amountGetsBack: net > EPS ? net : 0,
      owesDetail: owesTo[id] || {}
    };
  });

  // Flatten owes
  const owesMoneyList = [];
  Object.entries(owesTo).forEach(([debtorId, creditors]) => {
    Object.entries(creditors).forEach(([creditorId, amt]) => {
      if (amt > EPS) {
        owesMoneyList.push({
          fromId: debtorId,
          toId: creditorId,
          fromName: memberMap[debtorId],
          toName: memberMap[creditorId],
          amount: amt
        });
      }
    });
  });

  // Who gets back
  const getsBackMoneyList = members.map(m => {
    const id = String(m.id);
    const amount = owesMoneyList
      .filter(o => o.toId === id)
      .reduce((sum, o) => sum + o.amount, 0);
    return { id, name: m.name, amount };
  }).filter(x => x.amount > EPS);

  // Settlements
  const settlements = owesMoneyList.map(o => ({
    from: o.fromName,
    to: o.toName,
    amount: Number(o.amount.toFixed(2))
  }));

  return (
    <div className="viewsummary-container">
      <h2 className="viewsummary-title">Member Summary</h2>

      {/* Who Owes Money */}
      <div className="owes-money-section">
        <h3 className="section-title">Who Owes Money</h3>
        {owesMoneyList.length === 0 ? (
          <p className="no-expense">🎉 No one owes money!</p>
        ) : (
          <ul className="expense-list">
            {owesMoneyList.map((o, idx) => (
              <li key={idx} className="expense-item">
                <span className="expense-name">{o.fromName}</span> → {o.toName}: 
                <span className="amount"> ${o.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Who Gets Back Money */}
      <div className="gets-back-money-section">
        <h3 className="section-title">Who Gets Back Money</h3>
        {getsBackMoneyList.length === 0 ? (
          <p className="no-expense">🎉 No one needs to get back money!</p>
        ) : (
          <ul className="expense-list">
            {getsBackMoneyList.map((g, idx) => (
              <li key={idx} className="expense-item">
                <span className="expense-name">{g.name}</span> should get back 
                <span className="amount"> ${g.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Suggested Settlements */}
      <div className="settlements-section">
        <h3 className="section-title">Suggested Settlements</h3>
        {settlements.length === 0 ? (
          <p className="no-expense">No transfers needed.</p>
        ) : (
          <ul className="expense-list">
            {settlements.map((s, idx) => (
              <li key={idx} className="expense-item">
                {s.from} pays {s.to}: 
                <span className="amount"> ${s.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Per Member Summary */}
      <div className="summary-list-section">
        <h3 className="section-title">Summary</h3>
        <ul className="expense-list">
          {summaryList.map(s => (
            <li key={s.id} className="expense-item">
              <h4 className="expense-name">{s.name}</h4>
              <p className="expense-detail"><span className="expense-label">Total Paid:</span> ${s.totalPaid.toFixed(2)}</p>
              <p className="expense-detail"><span className="expense-label">Total Share:</span> ${s.totalShare.toFixed(2)}</p>
              <p className="expense-detail"><span className="expense-label">Amount Owes:</span> ${s.amountOwes.toFixed(2)}</p>
              <p className="expense-detail"><span className="expense-label">Amount Gets Back:</span> ${s.amountGetsBack.toFixed(2)}</p>

              {Object.keys(s.owesDetail).length > 0 && (
                <div>
                  <p className="expense-detail"><span className="expense-label">Owes to:</span></p>
                  <ul className="expense-list">
                    {Object.entries(s.owesDetail).map(([credId, amt]) => (
                      <li key={credId} className="expense-item">
                        {memberMap[credId]}: <span className="amount">${amt.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Viewsummary;