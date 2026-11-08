<script setup lang="ts">
import { computed } from 'vue'
import { useConferenceData } from '@/composables/useConferenceData'
import type { Session } from '@/types/conference'
import { formatDay } from '@/utils/format'

const props = defineProps<{ session: Session }>()

const { roomById } = useConferenceData()
const roomName = computed(
  () => roomById.value.get(props.session.roomId)?.name ?? props.session.roomId,
)
</script>

<template>
  <ul class="meta">
    <li>{{ formatDay(session.day) }}</li>
    <li>{{ session.startTime }}–{{ session.endTime }} Uhr</li>
    <li>{{ roomName }}</li>
    <li>{{ session.level }}</li>
    <li>{{ session.format }}</li>
  </ul>
</template>

<style scoped>
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs) var(--space-md);
  padding: 0;
  list-style: none;
  color: var(--color-text-secondary);
}
</style>