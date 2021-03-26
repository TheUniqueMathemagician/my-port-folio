import { createContext, FunctionComponent, useState, useContext } from "react";

enum Theme {
  Light = "light",
  Dark = "dark"
}

type ThemeContextType = [Theme, (Theme: Theme) => void];

const ThemeContext = createContext<ThemeContextType>([
  Theme.Dark,
  (theme: Theme) => {}
]);

const useTheme = () => useContext(ThemeContext);

const ThemeProvider: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Dark);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme, Theme };
export default ThemeProvider;
