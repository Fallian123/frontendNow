/**
 * Typen für den geteilten Datensatz conference-data.json.
 * Der Datensatz ist normalisiert: Sessions verweisen per ID auf Tracks, Räume und Speaker.
 */

/** Reihenfolge = fachliche Reihenfolge (für Filter-Dropdown); der Typ wird daraus abgeleitet. */
export const SESSION_LEVELS = ['Einsteiger', 'Fortgeschritten', 'Experte'] as const
export type SessionLevel = (typeof SESSION_LEVELS)[number]
export type SessionFormat = 'Vortrag' | 'Workshop' | 'Podium'

export interface ConferenceInfo {
  name: string
  tagline: string
  dates: string[]
  location: string
  timezone: string
}

export interface Track {
  id: string
  name: string
}

export interface Room {
  id: string
  name: string
  capacity: number
}

export interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  /** Redundant zu Session.speakerIds – Quelle der Wahrheit ist Session.speakerIds. */
  sessionIds: string[]
}

export interface Session {
  id: string
  title: string
  abstract: string
  trackId: string
  speakerIds: string[]
  /** ISO-Datum, z. B. "2026-09-15" */
  day: string
  /** "HH:MM", lokale Zeit laut conference.timezone */
  startTime: string
  endTime: string
  roomId: string
  level: SessionLevel
  format: SessionFormat
}

export interface ConferenceData {
  conference: ConferenceInfo
  tracks: Track[]
  rooms: Room[]
  speakers: Speaker[]
  sessions: Session[]
}
