import { DesktopAccessDisabled } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

const DesktopMessage = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
        handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    isDesktop && (
        <div className='flex items-center justify-center h-[100vh]'>
            <div className="text-center ">
                <DesktopAccessDisabled className='text-xl'/>
                <p>Note: This page is not optimized for desktop view. Please use a tablet or mobile device.</p>
            </div>
        </div>
    )
  );
};

export default DesktopMessage;
