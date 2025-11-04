<template>
  <v-data-table :items="appointments" :headers="headers">
    <template #item.date="{ item }">
      {{ item.date }}
    </template>
  </v-data-table>
</template>

<script setup>
import { useAppointmentStore } from '@/stores/appointments'

const appointmentStore = useAppointmentStore()

const appointments = computed(() => appointmentStore.appointments)

const headers = [
  { title: 'Date', key: 'date' },
  { title: 'Doctor', key: 'doctor' },
]
</script>
