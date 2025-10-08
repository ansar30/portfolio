import React from 'react';

const BackgroundEffects = () => {

  // Completely simplified - no canvas particles to avoid any overflow issues

  return (
    <>
      {/* Ultra Minimal Background - No animations that could cause overflow */}
      <div className="fixed inset-0 pointer-events-none z-0 w-screen h-screen overflow-hidden">
        {/* Simple static gradient - no moving parts */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/5 dark:via-transparent dark:to-purple-900/5 opacity-50" />
      </div>
    </>
  );
};

export default BackgroundEffects; 