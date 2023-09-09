import React, { useState } from 'react';

function ExpenseTable({ section, selectedSubsection, expenses, onUpdateExpense, onDeleteExpense }) {
  const [editableIndex, setEditableIndex] = useState(null);
  const [updatedExpense, setUpdatedExpense] = useState({
    particulars: '',
    billNo: '',
    billDate: '',
    amount: 0,
    sectionInCharge: '',
  });

  const handleEditClick = (index) => {
    setEditableIndex(index);
    setUpdatedExpense(expenses[index]);
  };

  const handleSaveClick = () => {
    onUpdateExpense(updatedExpense);
    setEditableIndex(null);
    setUpdatedExpense({
      particulars: '',
      billNo: '',
      billDate: '',
      amount: 0,
      sectionInCharge: '',
    });
  };

  const handleDeleteClick = (expenseId) => {
    onDeleteExpense(expenseId);
  };

  return (
    <div>
      <h3>Expense Table</h3>
      <table>
        <thead>
          <tr>
            <th>Particulars</th>
            <th>Bill No</th>
            <th>Bill Date</th>
            <th>Bill Amount (Rupees)</th>
            <th>Section In-Charge</th>
            <th>Total Amount Spent (Rupees)</th>
            <th>Balance (Rupees)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>
                {editableIndex === index ? (
                  <input
                    type="text"
                    value={updatedExpense.particulars}
                    onChange={(e) =>
                      setUpdatedExpense({
                        ...updatedExpense,
                        particulars: e.target.value,
                      })
                    }
                  />
                ) : (
                  expense.particulars
                )}
              </td>
              <td>
                {editableIndex === index ? (
                  <input
                    type="text"
                    value={updatedExpense.billNo}
                    onChange={(e) =>
                      setUpdatedExpense({
                        ...updatedExpense,
                        billNo: e.target.value,
                      })
                    }
                  />
                ) : (
                  expense.billNo
                )}
              </td>
              <td>
                {editableIndex === index ? (
                  <input
                    type="text"
                    value={updatedExpense.billDate}
                    onChange={(e) =>
                      setUpdatedExpense({
                        ...updatedExpense,
                        billDate: e.target.value,
                      })
                    }
                  />
                ) : (
                  expense.billDate
                )}
              </td>
              <td>
                {editableIndex === index ? (
                  <input
                    type="number"
                    value={updatedExpense.amount}
                    onChange={(e) =>
                      setUpdatedExpense({
                        ...updatedExpense,
                        amount: e.target.value,
                      })
                    }
                  />
                ) : (
                  expense.amount
                )}
              </td>
              <td>
                {editableIndex === index ? (
                  <input
                    type="text"
                    value={updatedExpense.sectionInCharge}
                    onChange={(e) =>
                      setUpdatedExpense({
                        ...updatedExpense,
                        sectionInCharge: e.target.value,
                      })
                    }
                  />
                ) : (
                  expense.sectionInCharge
                )}
              </td>
              <td>{calculateTotalAmountSpent(expenses, index)}</td>
              <td>{calculateBalance(expenses, index, selectedSubsection)}</td>
              <td>
                {editableIndex === index ? (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => setEditableIndex(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                  
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    &nbsp;
                    <button onClick={() => handleDeleteClick(expense.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Calculate total amount spent for all previous entries
  function calculateTotalAmountSpent(expenses, currentIndex) {
    let total = 0;
    for (let i = 0; i <= currentIndex; i++) {
      total += expenses[i].amount;
    }
    return total;
  }

  // Calculate the balance for the selected subsection based on previous entries
  function calculateBalance(expenses, currentIndex, selectedSubsection) {
    const totalAmountSpent = calculateTotalAmountSpent(expenses, currentIndex);
    return selectedSubsection.budget - totalAmountSpent;
  }
}

export default ExpenseTable;
