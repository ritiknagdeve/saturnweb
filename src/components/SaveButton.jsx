import React from 'react';

const SaveButton = ({ onClick }) => {
  return (
    <button 
      className="save-button"
      onClick={onClick}
    >
      <span>Save document</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#FFFFFF" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  );
};

export default SaveButton; 