import React, { useState, useEffect } from 'react';
import TranscriptSearchBar from './TranscriptSearchBar';
import TranscriptList from './TranscriptList';

const Transcription = ({ transcript }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTranscript, setFilteredTranscript] = useState(transcript);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  // Update filtered transcript when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTranscript(transcript);
      return;
    }
    
    const filtered = transcript.filter(entry => 
      entry.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.speaker.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredTranscript(filtered);
  }, [searchTerm, transcript]);

  // Check for screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <TranscriptSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* Search and actions bar */}
      <div className="px-5  border-b border-[#E8E8E8]">
        {searchTerm && (
          <div className="text-xs text-[#64748B]">
            Showing {filteredTranscript.length} of {transcript.length} entries
          </div>
        )}
      </div>
      
      {/* Transcript content */}
      <div className="flex-1 pb-6">
        <TranscriptList
          filteredTranscript={filteredTranscript}
          searchTerm={searchTerm}
          isSmallScreen={isSmallScreen}
        />
      </div>
    </div>
  );
};

export default Transcription; 