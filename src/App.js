import React, { useState, useEffect } from 'react';
import './App.css';
import AccountSection from './AccountSection';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import jsonData from './data.json';

function App() {
  const [budget] = useState(1980000); // Static budget of 19.8 lakhs
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);
  const [sections, setSections] = useState(jsonData.sections);

  // Function to handle expense submission
  const addExpense = (expense) => {
    setSections((prevSections) => {
      return prevSections.map((s) => {
        if (s.name === selectedSection.name) {
          const updatedSubsection = s.subsections.find(
            (subsection) => subsection.name === selectedSubsection.name
          );

          // Calculate the total amount spent and balance for this subsection
          const expensesForSubsection = s.expenses.filter(
            (exp) => exp.subsection === selectedSubsection.name
          );
          const totalAmountSpent = expensesForSubsection.reduce(
            (total, exp) => total + exp.amount,
            0
          );
          updatedSubsection.totalAmountSpent = totalAmountSpent;
          updatedSubsection.balance = updatedSubsection.budget - totalAmountSpent;

          // Create a new array of expenses with the new expense and return the modified section
          const updatedExpenses = [...s.expenses, expense];
          return { ...s, expenses: updatedExpenses };
        }
        return s;
      });
    });
  };

  // Function to handle updating an expense
  const updateExpense = (updatedExpense) => {
    setSections((prevSections) => {
      return prevSections.map((s) => {
        if (s.name === selectedSection.name) {
          const updatedSubsection = s.subsections.find(
            (subsection) => subsection.name === selectedSubsection.name
          );

          // Find the expense to update and replace it with the updatedExpense
          const updatedExpenses = s.expenses.map((expense) =>
            expense.id === updatedExpense.id ? updatedExpense : expense
          );

          // Update the subsection's total amount spent and balance
          const totalAmountSpent = updatedExpenses
            .filter((exp) => exp.subsection === selectedSubsection.name)
            .reduce((total, exp) => total + exp.amount, 0);
          updatedSubsection.totalAmountSpent = totalAmountSpent;
          updatedSubsection.balance = updatedSubsection.budget - totalAmountSpent;

          return { ...s, expenses: updatedExpenses };
        }
        return s;
      });
    });
  };

  // Function to handle deleting an expense
  const deleteExpense = (expenseId) => {
    setSections((prevSections) => {
      return prevSections.map((s) => {
        if (s.name === selectedSection.name) {
          const updatedSubsection = s.subsections.find(
            (subsection) => subsection.name === selectedSubsection.name
          );

          // Remove the expense with the matching id from the expenses array
          const updatedExpenses = s.expenses.filter(
            (expense) => expense.id !== expenseId
          );

          // Update the subsection's total amount spent and balance
          const totalAmountSpent = updatedExpenses
            .filter((exp) => exp.subsection === selectedSubsection.name)
            .reduce((total, exp) => total + exp.amount, 0);
          updatedSubsection.totalAmountSpent = totalAmountSpent;
          updatedSubsection.balance =
            updatedSubsection.budget - totalAmountSpent;

          return { ...s, expenses: updatedExpenses };
        }
        return s;
      });
    });
  };

  useEffect(() => {
    // Ensure selectedSection is not null
    if (!selectedSection) {
      return;
    }

    // Recalculate section totals whenever sections or their expenses change
    const updatedSections = sections.map((section) => {
      if (section.name === selectedSection.name) {
        const totalAmountSpent = section.expenses
          .filter((expense) => expense.subsection === selectedSubsection?.name)
          .reduce((total, expense) => total + expense.amount, 0);

        return {
          ...section,
          totalAmountSpent,
          balance: section.budget - totalAmountSpent,
        };
      }
      return section;
    });

    setSections(updatedSections);
  }, [sections, selectedSection, selectedSubsection?.name]);

  const handleSubsectionSelected = (subsection) => {
    setSelectedSubsection(subsection);
  };

  return (
    <div className="App">
      <h1>CSBS Expense Tracker</h1>
      <h2>Total Department Budget: ₹{budget}</h2>

      {/* Render AccountSection */}
      <div className="section-selection">
      <select
  onChange={(e) => {
    const selectedValue = e.target.value;
    const selectedSection = sections.find((section) => section.name === selectedValue);
    setSelectedSection(selectedSection);
  }}
>
  <option value="">Select an Account Section</option>
  {sections.map((section, index) => (
    <option key={index} value={section.name}>
      {section.name}
    </option>
  ))}
</select>

        <hr class='style-two'></hr>
      </div>

      {/* Display subsection selection dropdown when an account section is selected */}
      {selectedSection && (
        <div>
          <h3>{selectedSection.name}</h3>
          <p>Allocated Budget: ₹{selectedSubsection?.budget}</p>
          <ExpenseForm
            section={selectedSection}
            selectedSubsection={selectedSubsection}
            onSubsectionSelected={handleSubsectionSelected}
            onExpenseSubmit={addExpense}
          />
          <ExpenseTable
            key={selectedSubsection?.name} // Add a key to trigger re-render
            section={selectedSection}
            selectedSubsection={selectedSubsection}
            expenses={sections
              .find((section) => section.name === selectedSection.name)
              .expenses.filter(
                (expense) => expense.subsection === selectedSubsection?.name
              )}
            onUpdateExpense={updateExpense} // Pass the updateExpense function
            onDeleteExpense={deleteExpense} // Pass the deleteExpense function
          />
        </div>
      )}
    </div>
  );
}

export default App;
