import { defineStore } from 'pinia'
import { toDoctorsShiftsList } from '@/utils/doctors'

export const useDoctorStore = defineStore('doctor', {
  state: () => ({
    allShifts: [],
  }),
  getters: {
    doctors: (state) => toDoctorsShiftsList(state.allShifts),
    doctorByName() {
      return (name) => this.doctors.find(doctor => doctor.name === name)
    },
  },
  actions: {
    async fetchDoctors() {
      const url = 'https://raw.githubusercontent.com/suyogshiftcare/jsontest/main/available.json'
      const response = await fetch(url)
      this.allShifts = await response.json()
      return this.allShifts
    }
  },
})
