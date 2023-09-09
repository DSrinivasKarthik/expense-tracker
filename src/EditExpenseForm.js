import React, { useState } from 'react';

function EditExpenseForm({ expense, onUpdateExpense, onClose }) {
  const [updatedExpense, setUpdatedExpense] = useState({ ...expense });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExpense({
      ...updatedExpense,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateExpense(updatedExpense);
    onClose();
  };

  return (
    <div>
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="particulars">Particulars:</label>
          <input
            type="text"
            name="particulars"
            value={updatedExpense.particulars}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount (Rupees):</label>
          <input
            type="number"
            name="amount"
            value={updatedExpense.amount}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditExpenseForm;
