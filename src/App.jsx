import React from 'react';
import Sidebar from './components/Sidebar';
import MainSection from './components/MainSection';
import { TranscriptionProvider } from './context/TranscriptionContext';

function App() {
  return (
    <div className="flex flex-row w-full h-screen overflow-hidden bg-background gap-2">
      {/* Sidebar component - fixed width */}
      <Sidebar />
      
      {/* Main section component - flexible width */}
      <TranscriptionProvider>
      <MainSection />
      </TranscriptionProvider>
    </div>
  );
}

export default App;