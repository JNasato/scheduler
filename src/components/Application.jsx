import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from './DayList';
import Appointment from './Appointment';

import getAppointmentsForDay from '../helpers/selectors';

import "components/Application.scss";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {

    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments'))
    ]).then((all) => 
    setState(prev => ({ day: "Monday", days: all[0].data, appointments: all[1].data })));
    
  }, []);

  const filteredAppointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />

      </section>
      <section className="schedule">
        {filteredAppointments.map(appointment => {
          return (
            <Appointment key={appointment.id} {...appointment} />
          )  
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}