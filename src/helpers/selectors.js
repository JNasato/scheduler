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

export function getInterviewersForDay(state, day) {
  let result = [];
  const selectedDay = state.days.find(d => d.name === day);

  for (const int in state.interviewers) {
    if(selectedDay && selectedDay.interviewers.includes(Number(int))) {
      result.push(state.interviewers[int]);
    }
  }
  return result;
}

export function getInterview(state, interview) {
  for (let int in state.interviewers) {
    const interviewer = state.interviewers[int];
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
