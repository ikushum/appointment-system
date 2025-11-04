<template>
  <v-main class="bg-surface-light h-100">
    <v-container v-if="doctorDetails" class="h-100 d-flex flex-column align-center justify-start">
      <div class="text-center my-10">
        <v-btn
          variant="text"
          color="primary"
          class="text-none"
          prepend-icon="mdi-arrow-left"
          @click="gotoHome"
        >
        Go Back
        </v-btn>

        <p class="font-weight-bold text-h4">
          Appointment Details
        </p>

        <p class="mt-2 text-subtitle-1 text-medium-emphasis">
          Please select an appointment date and time for <b> {{ doctorDetails.name }} </b>
        </p>
      </div>

      <AppointmentSelector
        :doctor-details="doctorDetails"
        class="mb-10"
        @confirm="handleConfirmAppointment"
      />
    </v-container>

    <v-container v-else>
      <v-progress-circular indeterminate color="primary" />
    </v-container>

    <v-dialog v-model="successDialog.isOpen" persistent max-width="450">
      <SuccessDialog
        v-if="successDialog.isOpen"
        :date="successDialog.date"
        @go-home="gotoHome"
      />
    </v-dialog>
  </v-main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useDoctorStore } from '@/stores/doctor'
import SuccessDialog from '@/components/Doctors/SuccessDialog.vue'
import AppointmentSelector from '@/components/Doctors/AppointmentSelector.vue'
import { useAppointmentStore } from '@/stores/appointments'

const defaultSuccessDialog = {
  isOpen: false,
  date: null,
}

const route = useRoute()
const router = useRouter()
const doctorStore = useDoctorStore()
const appointmentStore = useAppointmentStore()

const successDialog = ref({ ...defaultSuccessDialog })
const doctorDetails = computed(() => doctorStore.doctorByName(route.params.doctorName))

function gotoHome() {
  router.push('/')
}

function handleConfirmAppointment(date) {
  appointmentStore.setAppointment({ date, doctor: doctorDetails.value.name })
  openSuccessDialog(date)
}

function openSuccessDialog(date) {
  successDialog.value = {
    isOpen: true,
    date,
  }
}
</script>
