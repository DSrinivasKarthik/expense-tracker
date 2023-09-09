import React, { useState } from 'react';

function ExpenseForm({ section, selectedSubsection, onSubsectionSelected, onExpenseSubmit }) {
  const [particulars, setParticulars] = useState('');
  const [billNo, setBillNo] = useState('');
  const [billDate, setBillDate] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [sectionInCharge, setSectionInCharge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      particulars,
      billNo,
      billDate,
      amount: parseFloat(billAmount),
      sectionInCharge,
      subsection: selectedSubsection.name, // Add the subsection name to the expense
    };
    onExpenseSubmit(expense);

    // Clear form fields
    setParticulars('');
    setBillNo('');
    setBillDate('');
    setBillAmount('');
    setSectionInCharge('');
  };

  return (
    <div>
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Particulars:
          <br></br>
          <input
            type="text"
            value={particulars}
            onChange={(e) => setParticulars(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Subsection:
          <br></br>

          <select
            value={selectedSubsection ? selectedSubsection.name : ''}
            onChange={(e) => {
              const selectedSubsection = section.subsections.find(
                (subsection) => subsection.name === e.target.value
              );
              onSubsectionSelected(selectedSubsection);
            }}
            required
          >
            <option value="" disabled>
              Select a Subsection
            </option>
            {section.subsections.map((subsection, index) => (
              <option key={index} value={subsection.name}>
                {subsection.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Bill No:          <br></br>

          <input
            type="text"
            value={billNo}
            onChange={(e) => setBillNo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Bill Date:          <br></br>

          <input
            type="date"
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>          <br></br>

          Bill Amount (in Rupees):          <br></br>

          <input
            type="number"
            step="0.01"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Section In-Charge:          <br></br>

          <input
            type="text"
            value={sectionInCharge}
            onChange={(e) => setSectionInCharge(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
