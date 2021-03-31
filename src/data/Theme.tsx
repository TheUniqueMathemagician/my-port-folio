import { createContext, FunctionComponent, useState, useContext } from "react";
import Theme from "../shared/Theme";

type ThemeContextType = [Theme, (Theme: Theme) => void];

const ThemeContext = createContext<ThemeContextType>([
  Theme.dark,
  (theme: Theme) => {}
]);

const useTheme = () => useContext(ThemeContext);

const ThemeProvider: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.dark);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme, Theme };
export default ThemeProvider;
