<template>
  <v-container>
    <v-responsive class="text-center mb-10">
      <p class="font-weight-bold text-h4 mt-8">
        Our Doctors
      </p>

      <p class="mt-2 text-subtitle-1 text-medium-emphasis">
        Please select a doctor to book an appointment.
      </p>
    </v-responsive>

    <DoctorsList
      v-if="doctorStore.doctors.length > 0"
      :doctors="doctorStore.doctors"
      @select-doctor="gotoAppointmentPage"
    />

    <v-progress-circular v-else indeterminate color="primary" />

    <v-divider class="my-16" />

    <v-responsive class="text-center">
      <p class="font-weight-bold text-h4">
        My Appointments
      </p>

      <p class="mt-2 text-subtitle-1 text-medium-emphasis">
        These are your upcoming appointments.
      </p>
    </v-responsive>

    <AppointmentList hide-default-footer class="my-10" />
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useDoctorStore } from '@/stores/doctor'
import DoctorsList from '@/components/Doctors/DoctorList.vue'
import AppointmentList from '@/components/Doctors/AppointmentList.vue'

const router = useRouter()
const doctorStore = useDoctorStore()

function gotoAppointmentPage (doctor) {
  router.push(`/appointments/${doctor.name}`)
}
</script>
