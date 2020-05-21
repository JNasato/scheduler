# Interview Scheduler
Scheduler is an SPA that allows for the booking, editing, and cancelling of interviews.

Front-end: React, JSX, JS, SASS, axios
Testing: Jest, Storybook, Cypress
Database: Postgresql

## Screenshots

!["Screenshot of empty appointments"](https://raw.githubusercontent.com/JNasato/scheduler/master/docs/empty_appointments.png)
!["Screenshot of appointment form being filled in with a name and chosen interviewer"](https://raw.githubusercontent.com/JNasato/scheduler/master/docs/appointment_form_filled_in.png)
!["Screenshot of booked interviews, as well as one appointment in the process of being deleted"](https://raw.githubusercontent.com/JNasato/scheduler/master/docs/booked_appointments.png)

## Heroku and Netlify Deployment

To access deployed version of app:

1. https://scheduler-jnasato.herokuapp.com/api/appointments
2. https://wonderful-mirzakhani-ec1dbe.netlify.app/

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress

```sh
npm run cypress
```

## Features
- Book an interview appointment with a name and selected interviewer and add it to the database
- Edit an already booked appointment by changing the name and/or interviewer
- Cancel an interview and remove it from the database
- Helpful 'Saving' and 'Deleting' components to notify user of process
- 'Spots remaining' is updated automatically after database request is made
