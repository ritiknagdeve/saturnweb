import React from 'react';

const BackButton = () => {
  return (
    <div className="flex items-center gap-2 bg-background py-2 px-3 rounded-[4px]">
      <div className="bg-white">
        <svg width="15" height="7" viewBox="0 0 15 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.31395 0.523256L0.523256 3.31395M0.523256 3.31395L3.31395 6.10465M0.523256 3.31395L14.4767 3.31395" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span style={{ 
        color: '#000',
        textAlign: 'center',
        fontFeatureSettings: "'ss01' on, 'ss03' on",
        fontFamily: '"Roc Grotesk"',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '20px'
      }}>
        Back to home
      </span>
    </div>
  );
};

export default BackButton; 