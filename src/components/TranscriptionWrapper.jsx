import React from 'react';
import { TranscriptionProvider } from '../context/TranscriptionContext';
import MeetingTranscript from './MeetingTranscript';

// This component wraps the MeetingTranscript with the context provider
// It can be used in MainSection.jsx instead of directly using MeetingTranscript
const TranscriptionWrapper = () => {
  return (
    <TranscriptionProvider>
      <MeetingTranscript />
    </TranscriptionProvider>
  );
};

export default TranscriptionWrapper; 