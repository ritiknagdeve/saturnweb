import React, { useEffect, useState } from 'react';
import Transcription from './Transcription';
import { useTranscription } from '../context/TranscriptionContext';
import tIcon from '../assets/T icons.svg';

const MeetingTranscript = () => {
  // Use the context to get data and functions
  const { 
    transcriptData, 
    isTranscriptVisible, 
    toggleTranscriptVisibility 
  } = useTranscription();
  
  // Track screen size with a state variable
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  
  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isTranscriptVisible) {
    // CTA button view when collapsed - exact Figma styling
    return (
      <button 
        onClick={toggleTranscriptVisibility}
        className={`flex items-center gap-2 bg-white border border-[#D9D9D9] shadow-sm ${isSmallScreen ? 'mobile-round-button' : 'py-3 px-6'}`}
        style={{ 
          width: isSmallScreen ? '44px' : 'min(223px, 100%)', 
          minWidth: isSmallScreen ? '44px' : '180px',
          maxWidth: '100%',
          borderRadius: '4px 0px 0px 4px'
        }}
        aria-label="View meeting transcript"
      >
        <img 
          src={tIcon} 
          alt="" 
          className="w-4 h-4 text-[#7F7F7F]" 
        />
        {!isSmallScreen && (
          <>
        <span className="font-dm-sans font-medium text-sm text-[#7F7F7F]">Meeting transcript</span>
        <img 
          src="/images/chevrons-right-icon.svg" 
          alt="" 
              className="w-4 h-4 ml-auto text-[#7F7F7F] transform rotate-180" 
        />
          </>
        )}
      </button>
    );
  }

  // Expanded view with full transcript - styled to match Figma design exactly
  return (
    <div 
      className="overflow-hidden bg-white shadow-sm transition-all duration-300"
      style={{ 
        width: isSmallScreen ? 'calc(100vw - 32px)' : '320px', 
        minWidth: isSmallScreen ? 'auto' : '320px',
        maxWidth: isSmallScreen ? 'calc(100vw - 32px)' : '320px',
        height: isSmallScreen ? 'auto' : '100%',
        maxHeight: isSmallScreen ? '85vh' : '100%',
        transform: isTranscriptVisible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        borderRadius: '4px 0 0 4px',
        border: '1px solid var(--Cronos-Border-Seprator-Secondary, #D9D9D9)'
      }}
    >
      {/* Header with title and close button */}
      <div className="py-8 px-5 border-b border-[#E8E8E8] flex justify-center items-center relative">
          <button 
          onClick={toggleTranscriptVisibility}
          className="absolute left-5 p-1 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Close transcript"
          >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-180">
            <path d="M11 17L6 12L11 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 17L13 12L18 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        
        <h2 className="font-roc-grotesk font-normal text-base text-black" style={{ lineHeight: '1.5em' }}>Transcription</h2>
      </div>
      
      {/* Use the Transcription component for the content with context data */}
      <div className={isSmallScreen ? 'max-h-[60vh]' : 'h-[calc(100%-97px)]'}>
        <Transcription transcript={transcriptData} />
      </div>
    </div>
  );
};

export default MeetingTranscript; 