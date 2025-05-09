import React from 'react';

const MeetingTypeTag = ({ type }) => {
  return (
    <div className="onboarding-tag">
      <span>{type}</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#000000" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

export default MeetingTypeTag; 