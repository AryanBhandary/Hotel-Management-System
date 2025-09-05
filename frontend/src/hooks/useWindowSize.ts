import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (): WindowSize => {
  // Initialize state with current window size
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update state when window resizes
    const handleResize = () => setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array → runs once on mount

  // Return the current window size so components can use it
  return windowSize;
};
