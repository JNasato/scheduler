export default function getAppointmentsForDay(state, day) {
  let result = [];
  const selectedDay = state.days.find(d => d.name === day);

  for (const app in state.appointments) {
    if(selectedDay && selectedDay.appointments.includes(Number(app))) {
      result.push(state.appointments[app]);
    }
  }
  return result;
}
