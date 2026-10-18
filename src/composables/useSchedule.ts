import { computed, ref, watch } from 'vue'
import type { Session } from '@/types/conference'
import { useConferenceData } from './useConferenceData.ts'

/*
 * Headless-Composable für „Mein Programm“.
 * Gespeichert werden nur Session-IDs; die vollständigen Sessions werden
 * zur Laufzeit aus dem Konferenzdatensatz abgeleitet (Single Source of Truth).
 */

// Versionierter Key: erlaubt später eine Migration, falls sich das Format ändert.
const STORAGE_KEY = 'frontendnow:schedule:v1'

// Modul-Scope -> alle Komponenten teilen denselben Zustand.
const savedSessionIds = ref<string[]>([])
let initialized = false

function readStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    // Nur gültige String-Arrays übernehmen, kaputte Daten verwerfen.
    if (!Array.isArray(parsed)) return []
    return [...new Set(parsed.filter((id): id is string => typeof id === 'string'))]
  } catch {
    return []
  }
}

function writeStorage(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // z. B. Speicher voll oder privater Modus – App bleibt funktionsfähig.
  }
}

// Watch im Modul-Scope (nicht in einer Komponente), damit er nicht beim Unmount
// einer Komponente gestoppt wird. deep: true, weil push/splice das Array mutieren.
watch(savedSessionIds, (ids) => writeStorage(ids), { deep: true })

const { sessionById } = useConferenceData()

/** Gemerkte Sessions als volle Objekte, chronologisch sortiert. Unbekannte IDs werden ignoriert. */
const mySessions = computed<Session[]>(() =>
  savedSessionIds.value
    .map((id) => sessionById.value.get(id))
    .filter((s): s is Session => s !== undefined)
    .sort((a, b) => (a.day + a.startTime).localeCompare(b.day + b.startTime)),
)

/** Paare gemerkter Sessions, die sich zeitlich überschneiden. */
const conflicts = computed<[Session, Session][]>(() => {
  const result: [Session, Session][] = []
  const list = mySessions.value
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i]!
      const b = list[j]!
      if (a.day === b.day && a.startTime < b.endTime && b.startTime < a.endTime) {
        result.push([a, b])
      }
    }
  }
  return result
})

const count = computed(() => mySessions.value.length)

/**
 * Rehydration aus localStorage. Einmal beim App-Start aufrufen,
 * idealerweise nachdem loadData() abgeschlossen ist.
 */
function init(): void {
  if (initialized) return
  initialized = true
  const stored = readStorage()
  // Bereinigung: IDs, die im Datensatz nicht (mehr) existieren, werden entfernt.
  savedSessionIds.value =
    sessionById.value.size > 0 ? stored.filter((id) => sessionById.value.has(id)) : stored
}

function isBookmarked(id: string): boolean {
  return savedSessionIds.value.includes(id)
}

function toggleBookmark(id: string): void {
  const index = savedSessionIds.value.indexOf(id)
  if (index === -1) {
    savedSessionIds.value.push(id)
  } else {
    savedSessionIds.value.splice(index, 1)
  }
}

function clearSchedule(): void {
  savedSessionIds.value = []
}

export function useSchedule() {
  return {
    savedSessionIds,
    mySessions,
    conflicts,
    count,
    init,
    isBookmarked,
    toggleBookmark,
    clearSchedule,
  }
}
