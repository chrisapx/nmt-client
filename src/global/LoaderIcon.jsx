import React from 'react';

const LoaderIcon = ({ color }) => {
  return (
    <div className={`w-6 h-6 border-4 border-${color ? color : 'white'} border-b-transparent rounded-full inline-block box-border animate-spin`}></div>
  );
};

export default LoaderIcon;