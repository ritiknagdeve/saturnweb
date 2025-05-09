import React from 'react';

const OverviewLoadingSkeleton = () => (
  <div className="mb-8 animate-pulse w-full">
    {[1, 2, 3, 4, 5].map((item) => (
      <div key={item} className="mb-5 w-full">
        <div className="w-full h-10 bg-gray-100 rounded mb-2"></div>
        <div className="ml-2 mt-2">
          <div className="w-[90%] h-6 bg-gray-50 rounded mb-2"></div>
          <div className="w-[80%] h-6 bg-gray-50 rounded mb-2"></div>
        </div>
      </div>
    ))}
  </div>
);

export default OverviewLoadingSkeleton; 