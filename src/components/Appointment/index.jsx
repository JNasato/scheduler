import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from '../../hooks/useVisualMode';

import "./styles.scss";

//Props: key(id), id, time, interview, interviewers, bookInterview(fn), cancelInterview(fn)
export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function cancel() {
    back();
  }

  function save(name, interviewer) {
    const interview = {
      student: name, 
      interviewer
    };
    transition(SAVING);
    
    props.bookInterview(props.id, interview, mode)
    .then(() => transition(SHOW))
    .catch((error) => transition(ERROR_SAVE, true))
  }

  function destroy() {
    transition(DELETING, true);

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true))
  }

 

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={cancel}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={cancel}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onConfirm={destroy} onCancel={cancel} />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={cancel} />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={cancel} />}
    </article>
  );
}