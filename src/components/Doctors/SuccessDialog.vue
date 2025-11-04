<template>
  <v-card class="pa-5 rounded-xl">
    <v-card-title class="text-center">Appointment Booked</v-card-title>

    <v-card-text class="text-center">
      Your 30 minute appointment is booked for <br />
      <div class="text-h6 text-primary">
        {{ props.date.toLocaleString() }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        variant="flat"
        rounded="pill"
        color="primary"
        class="text-none mx-auto px-10"
        @click="emit('go-home')"
      >
        Home
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
})

const emit = defineEmits(['go-home'])
</script>
