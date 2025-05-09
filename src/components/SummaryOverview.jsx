import React from 'react';
import Overview from './Overview';

const SummaryOverview = ({
  isOverviewVisible,
  isCollapsedLayout,
  activeSection,
  onSectionSelect,
  toggleOverviewVisibility
}) => (
  <>
    {/* Document outline toggle - only show when in collapsed layout and overview is hidden */}
    {isCollapsedLayout && !isOverviewVisible && (
      <div className="relative left-4 top-[24px] z-10 overview-toggle-container">
        <button 
  className="flex flex-col items-start justify-center py-2 px-2 pr-4"
  aria-label="Document outline"
  style={{ width: '56px', paddingLeft: '10px' }}
  disabled={true}
>
          {/* Summary section - full line */}
          <div className={`w-full outline-stroke mb-2 h-[2px] ${activeSection === 0 ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
          {/* Relationship Building section - slightly shorter */}
          <div className={`w-5/6 outline-stroke mb-2 h-[2px] ${activeSection === 1 ? 'bg-gray-400' : 'bg-gray-200'}`}></div>
          {/* Financial Plans section - medium length */}
          <div className={`w-4/6 outline-stroke mb-2 h-[2px] ${activeSection === 2 ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
          {/* Vulnerabilities section - full line */}
          <div className={`w-full outline-stroke mb-2 h-[2px] ${activeSection === 3 ? 'bg-gray-400' : 'bg-gray-200'}`}></div>
          {/* Risks section - medium-long length */}
          <div className={`w-3/4 outline-stroke h-[2px] ${activeSection >= 4 ? 'bg-gray-400' : 'bg-gray-300'}`}></div>
        </button>
      </div>
    )}
    
    {/* Overview component - show as side panel or overlay depending on layout mode */}
    {(!isCollapsedLayout || isOverviewVisible) && (
      <div 
        className={`flex-shrink-0 overview-container ${isCollapsedLayout && isOverviewVisible ? 'absolute z-10 left-0 top-0 h-full shadow-lg bg-white' : 'relative'}`} 
        style={{ 
          width: '250px', 
          maxWidth: '250px',
          display: 'block'
        }}
      >
        <Overview 
          isSmallScreen={isCollapsedLayout && isOverviewVisible}
          activeSection={activeSection}
          onSectionSelect={onSectionSelect}
        />
      </div>
    )}
  </>
);

export default SummaryOverview; 