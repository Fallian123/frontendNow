<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import { useConferenceData } from '@/composables/useConferenceData'

/** Feature-Komponente: zeigt alle Tracks als „Linien“ mit Anzahl der Sessions. */
const { tracks, sessions } = useConferenceData()

const lines = computed(() =>
  tracks.value.map((track) => ({
    ...track,
    color: `var(--color-track-${track.id})`,
    sessionCount: sessions.value.filter((s) => s.trackId === track.id).length,
  })),
)
</script>

<template>
  <ul class="lines">
    <li v-for="line in lines" :key="line.id" class="line" :style="{ '--line-color': line.color }">
      <BaseBadge :color="line.color">{{ line.sessionCount }}</BaseBadge>
      <span class="line__name">{{ line.name }}</span>
    </li>
  </ul>
</template>

<style scoped>
.lines {
  display: grid;
  gap: var(--space-sm);
  padding: 0;
  list-style: none;
}

.line {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding-left: var(--space-sm);
  border-left: var(--border-width-line) solid var(--line-color);
}

.line__name {
  font-weight: var(--font-weight-label);
}
</style>
