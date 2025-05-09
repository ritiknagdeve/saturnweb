import React, { useEffect, useState, useRef } from 'react';
import mockData from '../data/mockData.json';
import OverviewLoadingSkeleton from './OverviewLoadingSkeleton';
import OverviewSectionList from './OverviewSectionList';

const Overview = ({ isSmallScreen, activeSection = -1, onSectionSelect }) => {
  const [sectionsData, setSectionsData] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const lastActiveSection = useRef(-1);

  // Monitor screen width to adapt styles
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Check if we're in compact mode (screen width < 1512px)
  const isCompactMode = screenWidth < 1512;
  
  // Determine if we're in tablet mode (between 768px and 1024px)
  const isTabletMode = screenWidth >= 768 && screenWidth < 1024;

  useEffect(() => {
    // Extract sections data from mockData
    if (mockData && mockData.sections) {
      setSectionsData(mockData.sections);
      
      // Initialize all sections as expanded (not collapsed)
      const initialCollapsedState = {};
      mockData.sections.forEach((section, index) => {
        initialCollapsedState[index] = false;
      });
      setCollapsedSections(initialCollapsedState);
      
      // Delay setting isLoaded to prevent layout shifts
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    }
  }, []);

  // Ensure active section is expanded
  useEffect(() => {
    if (
      activeSection >= 0 &&
      collapsedSections[activeSection] &&
      lastActiveSection.current !== activeSection
    ) {
      setCollapsedSections(prevState => ({
        ...prevState,
        [activeSection]: false
      }));
    }
    lastActiveSection.current = activeSection;
  }, [activeSection, collapsedSections]);

  // Toggle section collapse state
  const toggleSection = (index, event) => {
    // Stop event propagation to prevent scrolling when clicking the toggle
    event.stopPropagation();
    
    setCollapsedSections(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  // Scroll to section in SummarySection without causing layout shifts
  function scrollToSection(index, event, attempt = 0) {
    if (event) event.preventDefault();
    if (onSectionSelect) {
      onSectionSelect(index);
    }
    const sectionElement = document.getElementById(`section-${index}`);
    // Get the correct scrollable container - directly accessing the scrollContainer via querySelector
    const scrollContainerParent = document.querySelector('.mx-auto.h-full');
    const scrollContainer = scrollContainerParent ? scrollContainerParent.querySelector('.overflow-y-auto') : null;
    
    if (sectionElement && scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = sectionElement.getBoundingClientRect();
      const relativePosition = elementRect.top - containerRect.top + scrollContainer.scrollTop;
      scrollContainer.scrollTop = relativePosition - 24;
    } else if (attempt < 10) {
      setTimeout(() => scrollToSection(index, null, attempt + 1), 100);
    }
  }

  // Scroll to subsection in SummarySection without causing layout shifts
  const scrollToSubSection = (sectionIndex, subSectionIndex, event) => {
    // Prevent default behavior to stop any automatic scrolling
    event.preventDefault();
    
    // Call the parent's onSectionSelect to update the active section
    if (onSectionSelect) {
      onSectionSelect(sectionIndex);
    }
    
    const subSectionElement = document.getElementById(`subsection-${sectionIndex}-${subSectionIndex}`);
    if (subSectionElement) {
      // Get the correct scrollable container using the same approach as scrollToSection
      const scrollContainerParent = document.querySelector('.mx-auto.h-full');
      const scrollContainer = scrollContainerParent ? scrollContainerParent.querySelector('.overflow-y-auto') : null;
      
      if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = subSectionElement.getBoundingClientRect();
        const relativePosition = elementRect.top - containerRect.top + scrollContainer.scrollTop;
        
        scrollContainer.scrollTop = relativePosition - 24; // Adjust for top padding
      }
    }
  };

  // Add a classname for desktop vs collapsed layout with responsive support
  const containerClasses = `h-full overflow-y-auto flex flex-col minimal-scrollbar 
    ${isSmallScreen || isCompactMode ? 'w-full collapsed-overview' : ''}
    ${isTabletMode ? 'tablet-overview' : ''}`;

  return (
    <div className={containerClasses}>
      <div className={`pt-8 px-4 w-full ${isSmallScreen || isCompactMode ? 'pb-8' : ''}`}>
        {/* Overview header for Notion-like mobile/compact view */}
        {(isSmallScreen || isCompactMode) && (
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <h2 className="text-sm font-light text-gray-800">Document Overview</h2>
            {onSectionSelect && (
              <button 
                onClick={() => onSectionSelect(activeSection)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close overview"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
      
        {/* Overview container */}
        <div className="w-full">
          {/* Placeholder with fixed dimensions while loading */}
          {!isLoaded && <OverviewLoadingSkeleton />}
          
        {/* Overview sections - using actual data from mockData.json */}
          {isLoaded && (
            <OverviewSectionList
              sectionsData={sectionsData}
              activeSection={activeSection}
              collapsedSections={collapsedSections}
              toggleSection={toggleSection}
              scrollToSection={scrollToSection}
              scrollToSubSection={scrollToSubSection}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview; 