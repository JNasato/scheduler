import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
    }
    setHistory(history => [...history, newMode]);
    setMode(newMode);
  }
  
  function back() {
    if (history.length > 1) {
      history.pop();
      const lastMode = history.slice(-1)[0];
      setMode(lastMode);
    }
  }
  
  return { mode, transition, back }
}