import React from 'react';

const TranscriptList = ({ filteredTranscript, searchTerm, isSmallScreen }) => (
  <div className={`overflow-y-auto minimal-scrollbar ${isSmallScreen ? 'max-h-[50vh]' : 'max-h-[60vh]'}`}>
    {filteredTranscript.length > 0 ? (
      filteredTranscript.map((entry, index) => (
        <div key={index} className="py-4 px-5 border-b border-[#E8E8E8] last:border-b-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#64748B] font-dm-sans">{entry.speaker}</span>
            <span className="text-sm text-[#94A3B8] font-dm-sans">{entry.time}</span>
          </div>
          <p className="text-sm text-black font-dm-sans leading-[1.5]">{entry.text}</p>
        </div>
      ))
    ) : (
      <div className="py-4 px-5 text-center text-[#64748B] text-sm">
        No results found for "{searchTerm}"
      </div>
    )}
  </div>
);

export default TranscriptList; 