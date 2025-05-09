import React from 'react';
import OverviewSectionItem from './OverviewSectionItem';

const OverviewSectionList = ({
  sectionsData,
  activeSection,
  collapsedSections,
  toggleSection,
  scrollToSection,
  scrollToSubSection
}) => (
  <div className="mb-8 w-full">
    {sectionsData.map((section, sectionIndex) => (
      <OverviewSectionItem
        key={sectionIndex}
        section={section}
        sectionIndex={sectionIndex}
        activeSection={activeSection}
        collapsed={collapsedSections[sectionIndex]}
        toggleSection={toggleSection}
        scrollToSection={scrollToSection}
        scrollToSubSection={scrollToSubSection}
      />
    ))}
  </div>
);

export default OverviewSectionList; 