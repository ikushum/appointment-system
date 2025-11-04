<template>
  <v-card class="pa-10" rounded="xl" width="100%">
    <v-row class="h-100">
      <v-col cols="12" md="4">
        <h6 class="text-h6 mb-5">Appointment Details</h6>

        <v-list-item
          prepend-icon="mdi-account-outline"
          title="Doctor Name"
          :subtitle="props.doctorDetails.name"
          class="mb-5"
        />

        <v-list-item
          prepend-icon="mdi-clock-outline"
          title="Time"
          subtitle="30 minutes"
        />
      </v-col>

      <v-divider :vertical="$vuetify.display.mdAndUp" class="my-5" />

      <v-col cols="12" md="4" class="text-md-center">
        <h6 class="text-h6 mb-5">Select appointment date</h6>

        <v-date-picker
          v-model="selectedDate"
          hide-header
          class="mx-auto"
          color="primary"
          :allowed-dates="doctor.isAvailableOnDate"
        />
      </v-col>

      <v-divider :vertical="$vuetify.display.mdAndUp" class="my-5" />

      <v-col cols="12" md="4" class="d-flex flex-column text-md-center">
        <h6 class="text-h6 mb-5">Select appointment time</h6>

        <div v-if="!selectedDate" class="text-medium-emphasis my-10">
          Please select an appointment date first.
        </div>

        <v-chip-group
          v-model="selectedTime"
          v-else
          :disabled="!selectedDate"
          column
          variant="outlined"
          selected-class="bg-primary text-white"
        >
          <v-chip
            v-for="slot in timeSlots"
            :key="slot.start.getTime()"
            class="ma-2"
            :value="slot.start"
          >
            <v-card-text>
              {{ slot.start.toLocaleTimeString() }}
            </v-card-text>
          </v-chip>
        </v-chip-group>

        <div class="mt-auto">
          <v-btn
            v-if="selectedTime"
            block
            variant="flat"
            color="primary"
            rounded="pill"
            class="text-none mt-10"
            @click="confirmAppointment"
          >
            Confirm Appointment
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { useDoctor } from '@/composables/useDoctor'

const props = defineProps({
  doctorDetails: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close', 'confirm'])

const doctor = useDoctor(props.doctorDetails)

const selectedDate = ref(null)
const selectedTime = ref(null)

const timeSlots = computed(() => {
  if (!selectedDate.value) return []

  return doctor.getSlotsForDate(selectedDate.value)
})

function confirmAppointment() {
  emit('confirm', selectedTime.value)
}
</script>
