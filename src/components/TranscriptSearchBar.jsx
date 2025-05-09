import React from 'react';

const TranscriptSearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="px-3 py-2">
    <input
      type="text"
      className="w-full p-3 border border-gray-300 bg-white text-[#7F7F7F] placeholder-[#7F7F7F] text-sm"
      style={{ borderRadius: '4px' }}
      placeholder="Search transcript..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  </div>
);

export default TranscriptSearchBar; 