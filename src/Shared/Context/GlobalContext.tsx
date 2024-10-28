'use client';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
// Define the shape of the context
interface GlobalContextType {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

// Create context with a default value
const GlobalContext = createContext<GlobalContextType | null>(null);

// Create a provider
export function GlobalProvider({ children }: any) {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook to access context
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === null) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}
