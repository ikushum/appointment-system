import { defineStore } from 'pinia'

const localStorageKey = 'appointment'

export const useAppointmentStore = defineStore('appointments', {
  state: () => ({
    appointments: JSON.parse(localStorage.getItem(localStorageKey)) || [],
  }),
  actions: {
    setAppointment(appointment) {
      this.appointments.push(appointment)
      localStorage.setItem(localStorageKey, JSON.stringify(this.appointments))
    }
  },
})
