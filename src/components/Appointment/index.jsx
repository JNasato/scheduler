import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from '../../hooks/useVisualMode';

import "./styles.scss";

export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function add() {
    transition(CREATE);
  }

  function cancel() {
    back();
  }

  function edit() {
    transition(EDIT);
  }

  function save(name, interviewer) {
    const interview = {
      student: name, 
      interviewer
    };
    props.consoleLOG();
    transition(SAVING);
    
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((err) => console.log(err))
  }
  
  function confirmDelete() {
    transition(CONFIRM);
  }

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch((err) => console.log(err))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={add} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit}
          onDelete={confirmDelete}
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
      {mode === CONFIRM && <Confirm message={"Deleting"} onConfirm={deleteInterview} onCancel={cancel} />}
    </article>
  );
}