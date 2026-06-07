export const WEEKDAYS = [
  { value: 0, label: 'Domingo', short: 'Dom' },
  { value: 1, label: 'Segunda-feira', short: 'Seg' },
  { value: 2, label: 'Terça-feira', short: 'Ter' },
  { value: 3, label: 'Quarta-feira', short: 'Qua' },
  { value: 4, label: 'Quinta-feira', short: 'Qui' },
  { value: 5, label: 'Sexta-feira', short: 'Sex' },
  { value: 6, label: 'Sábado', short: 'Sáb' }
];

export function createEmptyWeekSchedule() {
  return WEEKDAYS.map((day) => ({
    weekday: day.value,
    enabled: false,
    startTime: '09:00',
    endTime: '18:00'
  }));
}

export function mergeScheduleWithDefaults(slots) {
  const week = createEmptyWeekSchedule();
  slots.forEach((slot) => {
    const day = week.find((d) => d.weekday === slot.weekday);
    if (day) {
      day.enabled = true;
      day.startTime = slot.startTime;
      day.endTime = slot.endTime;
    }
  });
  return week;
}

export function weekScheduleToSlots(week) {
  return week
    .filter((day) => day.enabled)
    .map(({ weekday, startTime, endTime }) => ({ weekday, startTime, endTime }));
}

export function getWeekdayFromDateStr(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).getDay();
}

export function formatWorkingDays(slots) {
  if (!slots.length) return '';
  const labels = slots
    .slice()
    .sort((a, b) => a.weekday - b.weekday)
    .map((slot) => WEEKDAYS.find((d) => d.value === slot.weekday)?.short)
    .filter(Boolean);
  return labels.join(', ');
}
