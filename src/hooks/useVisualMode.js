import { useState } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setHistory(prev => {
      const newHistory = [...prev];
      if (replace) {
        newHistory.pop()
      }
      return [...newHistory, newMode]
    });
  }
  
  function back() {
    if (history.length > 1) {
      const newHistory = [...history]
      newHistory.pop();
      setHistory(newHistory);
    }
  }
  
  return { mode: history[history.length - 1], transition, back }
}