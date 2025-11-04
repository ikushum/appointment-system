const dayOfWeeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]

function parseTimeToDate(baseDate, timeStr) {
  const trimmed = String(timeStr).trim()
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(AM|PM)$/i)

  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3]

  if (period === 'AM') {
    if (hours === 12) hours = 0
  } else {
    if (hours !== 12) hours += 12
  }
  const d = new Date(baseDate)
  d.setHours(hours, minutes, 0, 0)
  return d
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60 * 1000)
}

export function useDoctor(doctor) {
  function isAvailableOnDate(date) {
    const availableDayOfWeeksNames = Object.keys(doctor.shifts)
    const availableDayOfWeeksNumbers = availableDayOfWeeksNames
      .map(name => dayOfWeeks.indexOf(name))

    const dayOfWeek = date.getDay()
    return availableDayOfWeeksNumbers.includes(dayOfWeek)
  }

  function getSlotsForDate(date) {
    const dayOfWeek = date.getDay()
    const dayOfWeekName = dayOfWeeks[dayOfWeek]
    const shift = doctor.shifts[dayOfWeekName]

    if (!shift) return []

    const startTime = parseTimeToDate(date, shift.available_at)
    const endBoundary = parseTimeToDate(date, shift.available_until)

    const slots = []
    let currentStart = new Date(startTime)
    while (true) {
      const currentEnd = addMinutes(currentStart, 30)
      if (currentEnd > endBoundary) break
      slots.push({ start: new Date(currentStart), end: new Date(currentEnd) })
      if (currentEnd.getTime() === endBoundary.getTime()) break
      currentStart = currentEnd
    }

    return slots
  }

  return {
    isAvailableOnDate,
    getSlotsForDate
  }
}
