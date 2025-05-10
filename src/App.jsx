import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainSection from './components/MainSection';
import { TranscriptionProvider } from './context/TranscriptionContext';

function App() {
  const [isShifted, setIsShifted] = useState(false);

  const handleToggleShift = (shiftState) => {
    setIsShifted(shiftState);
  };

  return (
    <div className="flex flex-row w-full h-screen overflow-hidden bg-background gap-2">
      {/* Sidebar component - fixed width */}
      <Sidebar isShifted={isShifted} />
      
      {/* Main section component - flexible width */}
      <TranscriptionProvider>
        <MainSection onToggleShift={handleToggleShift} />
      </TranscriptionProvider>
    </div>
  );
}

export default App;