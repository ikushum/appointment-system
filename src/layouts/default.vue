<template>
  <v-main>
    <router-view v-if="doctorStore.doctors" />
  </v-main>
</template>

<script setup>
import { useDoctorStore } from '@/stores/doctor'

const doctorStore = useDoctorStore()

onMounted(() => {
  doctorStore.fetchDoctors()
})
</script>
