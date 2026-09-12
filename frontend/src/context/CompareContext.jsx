"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareItems, setCompareItems] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('khoj_compare_items');
      if (saved) {
        setCompareItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveToStorage = (items) => {
    try {
      localStorage.setItem('khoj_compare_items', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const addToCompare = (product) => {
    const id = product._id || product.id;
    if (compareItems.some(item => (item._id || item.id) === id)) {
      return { success: false, message: 'Item already in comparison' };
    }
    if (compareItems.length >= 4) {
      return { success: false, message: 'You can compare up to 4 items at once' };
    }
    const updated = [...compareItems, product];
    setCompareItems(updated);
    saveToStorage(updated);
    return { success: true, message: 'Added to comparison matrix' };
  };

  const removeFromCompare = (id) => {
    const updated = compareItems.filter(item => (item._id || item.id) !== id);
    setCompareItems(updated);
    saveToStorage(updated);
  };

  const clearCompare = () => {
    setCompareItems([]);
    saveToStorage([]);
    setIsCompareOpen(false);
  };

  const isCompared = (id) => {
    return compareItems.some(item => (item._id || item.id) === id);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompared,
        isCompareOpen,
        setIsCompareOpen
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
