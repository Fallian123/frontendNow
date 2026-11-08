<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import SessionCard from '@/components/features/SessionCard.vue'
import SessionFilter from '@/components/features/SessionFilter.vue'
import TrackOverview from '@/components/features/TrackOverview.vue'
import { useConferenceData } from '@/composables/useConferenceData'

const { conference, sessions, speakers, tracks, isLoading, error } = useConferenceData()
const selectedTrack = ref('')
const selectedDay = ref('')
const selectedLevel = ref('')

const dateFormat = new Intl.DateTimeFormat('de-AT', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
})

const dateRange = computed(() => {
  const dates = conference.value?.dates ?? []
  if (dates.length === 0) return ''
  return dates.map((d) => dateFormat.format(new Date(d))).join(' & ')
})

const filteredSessions = computed(() =>
  sessions.value.filter(
    (s) =>
      (!selectedTrack.value || s.trackId === selectedTrack.value) &&
      (!selectedDay.value || s.day === selectedDay.value) &&
      (!selectedLevel.value || s.level === selectedLevel.value),
  ),
)
</script>

<template>
  <div class="home">
    <p v-if="isLoading" role="status">Fahrplan wird geladen …</p>
    <p v-else-if="error" role="alert" class="error">{{ error.message }}</p>

    <template v-else-if="conference">
      <section class="hero">
        <p class="hero__meta">{{ dateRange }} · {{ conference.location }}</p>
        <h1>{{ conference.name }}</h1>
        <p class="hero__tagline">{{ conference.tagline }}</p>
      </section>

      <!-- Funktionsnachweis: Daten aus conference-data.json -->
      <div class="stats">
        <BaseCard>
          <p class="stat__value" data-testid="session-count">{{ sessions.length }}</p>
          <p class="stat__label">Sessions</p>
        </BaseCard>
        <BaseCard>
          <p class="stat__value">{{ speakers.length }}</p>
          <p class="stat__label">Speaker:innen</p>
        </BaseCard>
        <BaseCard>
          <p class="stat__value">{{ tracks.length }}</p>
          <p class="stat__label">Linien</p>
        </BaseCard>
      </div>

      <section>
        <h2>Liniennetz</h2>
        <TrackOverview />
      </section>

      <section class="program">
        <h2>Programm</h2>
        <SessionFilter
          v-model:track="selectedTrack"
          v-model:day="selectedDay"
          v-model:level="selectedLevel"
        />

        <p role="status" data-testid="result-count">
          {{ filteredSessions.length }} von {{ sessions.length }} Sessions
        </p>

        <ul v-if="filteredSessions.length" class="session-list">
          <li v-for="session in filteredSessions" :key="session.id">
            <SessionCard :session="session" />
          </li>
        </ul>
        <p v-else class="empty">Keine Session erfüllt alle gewählten Filter.</p>
      </section>
    </template>
  </div>
</template>

<style scoped>
.home {
  display: grid;
  gap: var(--space-2xl);
}

.hero {
  display: grid;
  gap: var(--space-sm);
}

.hero h1 {
  font-size: var(--font-size-display);
}

.hero__meta {
  color: var(--color-accent);
  font-weight: var(--font-weight-label);
}

.hero__tagline {
  color: var(--color-text-secondary);
  font-size: var(--font-size-heading-sm);
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
  gap: var(--space-md);
}

.stat__value {
  font-size: var(--font-size-heading-lg);
  font-weight: var(--font-weight-heading);
  line-height: var(--line-height-heading);
}

.stat__label {
  color: var(--color-text-secondary);
}

section > h2 {
  margin-bottom: var(--space-md);
}

.error {
  color: var(--color-danger);
}

.program {
  display: grid;
  gap: var(--space-md);
}

.session-list {
  display: grid;
  gap: var(--space-md);
  padding: 0;
  list-style: none;
}

.empty {
  color: var(--color-text-secondary);
}
</style>
