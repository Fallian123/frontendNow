/* Reine Formatierungs-Helfer ohne Zustand und ohne Konferenzlogik. */
const dayFormat = new Intl.DateTimeFormat('de-AT', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
})

/** "2026-09-15" -> "Dienstag, 15. September" */
export function formatDay(isoDate: string): string {
  return dayFormat.format(new Date(isoDate))
}