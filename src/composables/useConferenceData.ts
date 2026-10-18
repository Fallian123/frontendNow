import { computed, ref, shallowRef } from 'vue'
import type { ConferenceData, Room, Session, Speaker, Track } from '@/types/conference'

/*
 * Zustand im Modul-Scope: Alle Komponenten, die useConferenceData() aufrufen,
 * teilen sich denselben Datensatz. Er wird genau einmal geladen.
 */

// shallowRef: Der Datensatz ist zur Laufzeit unveränderlich -> keine tiefe Proxy-Reaktivität nötig.
const data = shallowRef<ConferenceData | null>(null)
const isLoading = ref(false)
const error = ref<Error | null>(null)
let loadPromise: Promise<void> | null = null

const conference = computed(() => data.value?.conference ?? null)
const sessions = computed<Session[]>(() => data.value?.sessions ?? [])
const tracks = computed<Track[]>(() => data.value?.tracks ?? [])
const rooms = computed<Room[]>(() => data.value?.rooms ?? [])
const speakers = computed<Speaker[]>(() => data.value?.speakers ?? [])

// Lookups nach ID, um die Referenzen (trackId, roomId, speakerIds) aufzulösen.
function toMap<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]))
}
const sessionById = computed(() => toMap(sessions.value))
const trackById = computed(() => toMap(tracks.value))
const roomById = computed(() => toMap(rooms.value))
const speakerById = computed(() => toMap(speakers.value))

/**
 * Lädt conference-data.json (per dynamischem Import -> eigener Chunk, asynchron).
 * Mehrfache Aufrufe lösen nur einen einzigen Ladevorgang aus.
 */
function loadData(): Promise<void> {
  if (data.value) return Promise.resolve()
  if (loadPromise) return loadPromise

  isLoading.value = true
  error.value = null

  loadPromise = import('@/data/conference-data.json')
    .then((mod) => {
      data.value = mod.default as ConferenceData
    })
    .catch((err: unknown) => {
      error.value = err instanceof Error ? err : new Error('Fehler beim Laden der Konferenzdaten')
      loadPromise = null // erneuter Versuch möglich
    })
    .finally(() => {
      isLoading.value = false
    })

  return loadPromise
}

export function useConferenceData() {
  return {
    conference,
    sessions,
    tracks,
    rooms,
    speakers,
    sessionById,
    trackById,
    roomById,
    speakerById,
    isLoading,
    error,
    loadData,
  }
}
