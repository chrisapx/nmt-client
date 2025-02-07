import React from 'react';

const LoaderIcon = ({ color }) => {
  return (
    <div className={`w-5 h-5 border-4 border-${color ? color : 'white'} border-b-transparent rounded-full inline-block box-border animate-spin`}></div>
  );
};

export default LoaderIcon;