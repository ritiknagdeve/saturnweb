import React from 'react';

const ParticipantsList = ({ participants }) => {
  return (
    <div className="meeting-tag">
      <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
      <span>{participants.join(' + ')}</span>
    </div>
  );
};

export default ParticipantsList; 