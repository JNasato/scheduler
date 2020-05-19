import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" }
];

const interview = {
  student: "Jeremy",
  interviewer: {
    id: 3
  }
}

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment key="1" id="1" time="12pm" interview={interview} interviewers={interviewers} />);
  });
});
