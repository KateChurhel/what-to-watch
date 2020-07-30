// libraries
import React from 'react';

const Loader = ({ isActive, children }) => {
  const containerClass = isActive ? 'loader-overlay-container' : '';

  return (
    <div className={containerClass}>
      {children}
      {isActive && (
        <div className="loader-spinner-wrapper">
          <div className="loader-spinner" />
        </div>
      ) }
    </div>
  );
};

export default Loader;
