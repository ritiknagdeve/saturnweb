import React, { createContext, useContext, useState } from 'react';
import { transcriptData as initialTranscriptData } from '../data/transcriptData';

// Create context
const TranscriptionContext = createContext();

// Custom hook to use the context
export const useTranscription = () => {
  const context = useContext(TranscriptionContext);
  if (!context) {
    throw new Error('useTranscription must be used within a TranscriptionProvider');
  }
  return context;
};

// Provider component
export const TranscriptionProvider = ({ children }) => {
  const [transcriptData, setTranscriptData] = useState(initialTranscriptData);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);

  // Toggle transcript visibility
  const toggleTranscriptVisibility = () => {
    setIsTranscriptVisible(prev => !prev);
  };

  // Update transcript data
  const updateTranscriptData = (newData) => {
    setTranscriptData(newData);
  };

  // Clear search highlights or perform other common operations
  const clearHighlights = () => {
    // Implementation could be added later
  };

  // Value object to be provided to consumers
  const value = {
    transcriptData,
    updateTranscriptData,
    isTranscriptVisible,
    toggleTranscriptVisibility,
    clearHighlights
  };

  return (
    <TranscriptionContext.Provider value={value}>
      {children}
    </TranscriptionContext.Provider>
  );
};

export default TranscriptionContext; 