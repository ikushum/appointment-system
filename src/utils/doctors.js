export function toDoctorsShiftsList(doctors) {
  if (!Array.isArray(doctors)) return []

  const grouped = {}

  for (const doctor of doctors) {
    const name = doctor && doctor.name
    if (!name) continue

    if (!grouped[name]) {
      grouped[name] = {
        name,
        timezone: doctor.timezone,
        shifts: {}
      }
    }

    grouped[name].shifts[doctor.day_of_week] = {
      available_at: doctor.available_at,
      available_until: doctor.available_until,
      day_of_week: doctor.day_of_week,
    }
  }

  return Object.values(grouped)
}


