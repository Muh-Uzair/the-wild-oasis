import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Props validation
DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// DarkModeContext
export const DarkModeContext = createContext();

// COMPONENT START///////////////////////////////////////////////
export default function DarkModeProvider({ children }) {
  // STATE & VARIABLES
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode === true) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);

  // FUNCTIONS
  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  // JSX//////////////////////////////////////////
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
  // JSX//////////////////////////////////////////
}
// COMPONENT END/////////////////////////////////////////////////
