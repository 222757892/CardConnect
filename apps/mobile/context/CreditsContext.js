import React, { createContext, useState } from "react";

export const CreditsContext = createContext({
  credits: 0,
  addCredits: () => {},
  deductCredits: () => {},
});

export function CreditsProvider({ children }) {
  const [credits, setCredits] = useState(20); // Default starting credits

  const addCredits = (amount) => {
    setCredits((prev) => prev + parseFloat(amount));
  };

  const deductCredits = (amount) => {
    setCredits((prev) => Math.max(0, prev - parseFloat(amount)));
  };

  return (
    <CreditsContext.Provider value={{ credits, addCredits, deductCredits }}>
      {children}
    </CreditsContext.Provider>
  );
}
