import React from 'react';

const OverviewSectionItem = ({
  section,
  sectionIndex,
  activeSection,
  collapsed,
  toggleSection,
  scrollToSection,
  scrollToSubSection
}) => (
  <div className="mb-5 w-full" key={sectionIndex}>
    <div 
      className={`w-full flex items-center justify-between py-2 px-2 text-sm hover:bg-gray-50 cursor-pointer rounded group ${
        activeSection === sectionIndex ? 'bg-gray-50' : ''
      }`}
    >
      <span 
        className={`flex-1 text-sm font-light break-words pr-2 min-w-0 text-left transition-colors duration-200 ${
          activeSection === sectionIndex 
            ? 'text-gray-800' 
            : 'text-gray-500 group-hover:text-gray-800'
        }`}
        style={{ width: "calc(100% - 20px)" }}
        onClick={(e) => scrollToSection(sectionIndex, e)}
      >
        {section.header}
      </span>
      <button
        type="button"
        className="ml-1"
        onClick={(e) => {
          e.stopPropagation();
          toggleSection(sectionIndex, e);
        }}
        aria-label={collapsed ? 'Expand section' : 'Collapse section'}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ${
            collapsed ? 'rotate-180' : ''
          } ${
            activeSection === sectionIndex ? 'text-gray-800' : 'text-gray-400'
          }`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="1.5"
          style={{ width: "16px", flexShrink: 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
    {/* Subsections */}
    {!collapsed && section.sections && (
      <div className="ml-2 mt-3 w-[calc(100%-8px)]">
        {section.sections.map((subSection, subSectionIndex) => (
          <div 
            key={`${sectionIndex}-${subSectionIndex}`}
            className={`py-2 px-2 text-sm font-light hover:bg-gray-50 cursor-pointer rounded break-words text-left transition-colors duration-200 ${
              activeSection === sectionIndex 
                ? 'text-gray-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={(e) => scrollToSubSection(sectionIndex, subSectionIndex, e)}
          >
            {subSection.name}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default OverviewSectionItem; 