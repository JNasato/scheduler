import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData() {

  //Attempt at websocket connectivity
  const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
  useEffect(() => {
    ws.onopen = event => {
      ws.onmessage = event => {
        const msg = JSON.parse(event.data);
        console.log("Message Received:", msg)
      }
    }
    const cleanup = () => ws.close();
    return cleanup;
  });


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //Fetch all database data and set it as state when the page first loads
  useEffect(() => {  
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ])
    .then((all) => 
    setState(prev => ({ day: "Monday", days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    );
  }, []);
  
  const setDay = day => setState({ ...state, day });

  async function bookInterview(id, interview, mode) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //wait until axios request is finished before updating state locally
    const axiosRequest = await axios.put(`/api/appointments/${id}`, appointment)

    //update and rerender interview spots when booking (not on edit)
    const days = state.days.map(day => {
      if(mode === "CREATE" && day.name === state.day) {
        return {
          ...day,
          spots: day.spots - 1
        }
      } else {
        return day;
      }
    });
    
    setState({ ...state, appointments, days });

    return axiosRequest;
  }

  async function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    //wait until axios request is finished before updating state locally
    const axiosRequest = await axios.delete(`/api/appointments/${id}`)

    //update and rerender interview spots when cancelling
    const days = state.days.map(day => {
      if(day.name === state.day) {
        return {
          ...day,
          spots: day.spots + 1
        }
      } else {
        return day;
      }
    });
    
    setState({ ...state, appointments, days });

    return axiosRequest;
  }


  return { state, setDay, bookInterview, cancelInterview }
}