# Appointment System
This is a appointment system prototype

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
yarn dev
```

## Features
- Lists alll doctors available for appointment.
- Lets user choose data of appointment with a doctor.
- Lets user choose a 30 minute time slot for appointment with a doctor.
- Lets users see a list of appointments they have booked.

## Limitations
- Users can book multiple appoints with the same doctor for the same time slot.
- Cannot delete an appointment.

## Technical notes
- Since Pinia is now the recommended state management library for Vue, I have used Pinia instead of Vuex.
- Uses localStorage to persist list of user's appointments.
- Uses Vuetify for UI components.
- Uses pinia to fetch, parse, store and return data from api using doctor store.
- Uses pinia to store and parse user's appoints via localStorage using appointments store.
- Used useDoctor composable to check 1) if a doctor is available for any specific date and 2) parse 30 minutes time slots for any specific date.
