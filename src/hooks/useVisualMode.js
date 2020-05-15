import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.pop();
    }
    setHistory(prev => [...prev, newMode]);
    setMode(newMode);
    console.log(history)
  }
  
  function back() {
    if (history.length > 1) {
      history.pop();
      const lastMode = history.slice(-1)[0];
      setMode(lastMode);
    }
    console.log(history)
  }
  
  return { mode, transition, back }
}