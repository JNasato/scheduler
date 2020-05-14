export function getAppointmentsForDay(state, day) {
  let result = [];
  const selectedDay = state.days.find(d => d.name === day);

  for (const app in state.appointments) {
    if(selectedDay && selectedDay.appointments.includes(Number(app))) {
      result.push(state.appointments[app]);
    }
  }
  return result;
}

export function getInterview(state, interview) {

  for (let i in state.interviewers) {
    const interviewer = state.interviewers[i];
    if (interview && interviewer.id === interview.interviewer) {

      return {
        student: interview.student,
        interviewer: {
          id: interviewer.id,
          name: interviewer.name,
          avatar: interviewer.avatar
        }
      }

    }
  }
  return null;
}
