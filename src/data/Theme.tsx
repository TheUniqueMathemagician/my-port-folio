import { createContext, FunctionComponent, useState, useContext } from "react";
import EThemeColor from "../types/EThemeColor";

type ThemeContextType = {
  theme: EThemeColor;
  setTheme: (theme: EThemeColor) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: EThemeColor.dark,
  setTheme: (theme: EThemeColor) => {}
});

const useTheme = () => useContext(ThemeContext);

const ThemeProvider: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useState<EThemeColor>(EThemeColor.dark);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme };
export default ThemeProvider;
