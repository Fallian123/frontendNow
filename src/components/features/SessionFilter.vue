<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { useConferenceData } from '@/composables/useConferenceData'
import { SESSION_LEVELS } from '@/types/conference'
import { formatDay } from '@/utils/format'

/**
 * Feature-Komponente: Filterleiste für die Programmübersicht.
 * Rein darstellend: Der Filterzustand gehört der aufrufenden View und wird über
 * drei v-model-Bindings gelesen und geschrieben. Leerer String = „Alle“ (kein Filter).
 */
const track = defineModel<string>('track', { default: '' })
const day = defineModel<string>('day', { default: '' })
const level = defineModel<string>('level', { default: '' })

const { tracks, conference } = useConferenceData()

function reset(): void {
  track.value = ''
  day.value = ''
  level.value = ''
}
</script>

<template>
  <form class="filter" role="search" aria-label="Sessions filtern" @submit.prevent>
    <label class="filter__field">
      Linie
      <select v-model="track">
        <option value="">Alle Linien</option>
        <option v-for="t in tracks" :key="t.id" :value="t.id">{{ t.name }}</option>
      </select>
    </label>

    <label class="filter__field">
      Tag
      <select v-model="day">
        <option value="">Beide Tage</option>
        <option v-for="d in conference?.dates ?? []" :key="d" :value="d">{{ formatDay(d) }}</option>
      </select>
    </label>

    <label class="filter__field">
      Level
      <select v-model="level">
        <option value="">Alle Level</option>
        <option v-for="l in SESSION_LEVELS" :key="l" :value="l">{{ l }}</option>
      </select>
    </label>

    <BaseButton variant="ghost" @click="reset">Filter zurücksetzen</BaseButton>
  </form>
</template>

<style scoped>
.filter {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: var(--space-md);
}

.filter__field {
  display: grid;
  gap: var(--space-xs);
  font-weight: var(--font-weight-label);
}

.filter__field select {
  min-height: var(--space-2xl);
  padding: var(--space-sm);
  border: var(--border-width-default) solid var(--color-border-strong);
  border-radius: var(--radius-control);
  background-color: var(--color-surface-raised);
  color: var(--color-text-primary);
  font: inherit;
  font-weight: var(--font-weight-body);
}
</style>