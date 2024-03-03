// import { createContext, useContext, useState, ReactNode } from 'react';

// // Define the type for the context value
// interface ThemeContextType {
//   theMode: boolean;
//   toggleTheme: () => void;
// }

// const themeContext = createContext<ThemeContextType | undefined>(undefined);

// export const MyContextProvider = ({ children }: { children: ReactNode }) => {
//   const [theMode, setTheMode] = useState(false);

//   const toggleTheme = () => {
//     setTheMode(prevMode => !prevMode);
//   };

//   return (
//     <themeContext.Provider value={{ theMode, toggleTheme }}>
//       {children}
//     </themeContext.Provider>
//   );
// };

// // Create a custom hook to use the theme context
// export const useThemeContext = () => {
//   const context = useContext(themeContext);
//   if (!context) {
//     throw new Error('useThemeContext must be used within a MyContextProvider');
//   }
//   return context;
// };
