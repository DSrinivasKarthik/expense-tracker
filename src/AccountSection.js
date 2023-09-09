import React from 'react';

function AccountSection({ section, onSectionSelected }) {
    const handleClick = () => {
      onSectionSelected(section);
    };
  
    return (
      <div>
        <h3 onClick={handleClick}>{section.name}</h3>
        {section.selected && (
          <div>
            <h4>Subsections:</h4>
            <ul>
              {section.subsections.map((subsection, index) => (
                <li key={index}>{subsection.name} - Budget: {subsection.budget} Lakhs</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  

export default AccountSection;
