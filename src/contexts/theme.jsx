import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error({ e });
  }
};


const getLocalStorage = (key, initialValue) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    return initialValue;
  }
};

const ThemeContext = createContext(undefined);

const DARK = "DARK";
const LIGHT = "LIGHT";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getLocalStorage("theme", { mode: LIGHT }));

  const toggleThemeMode = useCallback(() => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      mode: prevTheme.mode === LIGHT ? DARK : LIGHT,
    }));

  }, []);

  useEffect(() => {
    setLocalStorage("theme", theme)
  }, [theme])


  const value = useMemo(
    () => ({ toggleThemeMode, theme }),
    [theme, toggleThemeMode]
  );
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be within ThemeProvider!");

  return context;
};

export { ThemeProvider, DARK, LIGHT, useTheme };