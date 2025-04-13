import React, {createContext, useContext} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const SelectReferencesContext = createContext();

export function SelectReferencesProvider({ children }) {
  
  const [selectedReferences, setSelectedReferences] = useState(() => {
    const stored = localStorage.getItem('selectedReferences');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedReferences', JSON.stringify(selectedReferences));
  }, [selectedReferences]);

  const addAsReference = (data) => {

    const dataArray = [{ ...data }];
    
    setSelectedReferences(prevSelectedReferences => [...prevSelectedReferences, ...dataArray]);
  }

  return (
    <SelectReferencesContext.Provider value={{ selectedReferences, setSelectedReferences, addAsReference }}>
      {children}
    </SelectReferencesContext.Provider>
  )
}

export function useSelectReferences() {
  return useContext(SelectReferencesContext);
}