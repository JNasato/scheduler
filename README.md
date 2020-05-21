# Interview Scheduler
Scheduler is an SPA that allows for the booking, editing, and cancelling of interviews.

Front-end: React, JSX, JS, SASS, axios
Testing: Jest, Storybook, Cypress
Database: Postgresql

## Screenshots

!["Screenshot of desktop view tweets"](https://raw.githubusercontent.com/JNasato/tweeter/master/docs/Tweeter_desktop-view.png)
!["Screenshot of tablet view tweets"](https://raw.githubusercontent.com/JNasato/tweeter/master/docs/Tweeter_tablet-view.png)
!["Screenshot of tweet compose box"](https://raw.githubusercontent.com/JNasato/tweeter/master/docs/Tweeter_tweet-form.png)

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
