import React from 'react';

const ParticipantsList = ({ participants }) => {
  return (
    <div className="meeting-tag">
      <div class="flex items-center justify-center w-6 h-6 rounded bg-white border text-xs font-medium">A</div>
      <span>{participants.join(' + ')}</span>
    </div>
  );
};

export default ParticipantsList; 