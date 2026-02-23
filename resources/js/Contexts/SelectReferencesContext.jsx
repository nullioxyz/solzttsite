import React, {createContext, useContext} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { trackActionEvent } from '@/helpers/tracking';

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
    const alreadyAdded = selectedReferences.some(
      (ref) => ref.id === data.id && ref.type === data.type
    );
    if (alreadyAdded) return;

    setSelectedReferences(prevSelectedReferences => [...prevSelectedReferences, { ...data }]);

    const referenceType = data?.type === 'available_design' ? 'available_design' : 'portfolio';
    const payload = {
      reference_type: referenceType,
      reference_id: String(data?.id ?? ''),
      reference_name: data?.name ?? '',
    };

    trackActionEvent('reference_added', payload);
    trackActionEvent(`reference_added_${referenceType}`, payload);
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
