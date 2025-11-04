<template>
    <v-row class="mt-sm-8" justify="center">
      <v-col
        v-for="(doctor) in doctors"
        :key="doctor.name"
        class="mt-8 text-center"
        cols="6"
        md="3"
        sm="4"
      >
        <v-avatar
          size="80"
          color="primary"
          variant="tonal"
          class="text-h6"
          :text="getInitials(doctor.name)"
        />

        <v-list-item
          class="mt-2"
          :subtitle="doctor.timezone"
          :title="doctor.name"
        />

        <v-btn
          variant="text"
          rounded="pill"
          color="primary"
          class="text-none"
          @click="selectDoctor(doctor)"
        >
          Select
        </v-btn>
      </v-col>
    </v-row>
</template>

<script setup>
const props = defineProps({
  doctors: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-doctor'])

function selectDoctor(doctor) {
  emit('select-doctor', doctor)
}

const getInitials = (name) => {
  return name
    .replace('Dr.', '')
    .trim().split(' ')
    .slice(0, 2)
    .map(n => n[0]).join('')
    .toUpperCase()
}
</script>
