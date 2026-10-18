<script setup lang="ts">
import { computed } from 'vue'
import { useConferenceData } from '@/composables/useConferenceData.ts'

const props = defineProps<{ id: string }>()

const { sessionById } = useConferenceData()
const session = computed(() => sessionById.value.get(props.id))
</script>

<template>
  <section class="detail">
    <template v-if="session">
      <h1>{{ session.title }}</h1>
      <p>{{ session.abstract }}</p>
      <p class="hint">Platzhalter – die vollständige Detailseite folgt in Schritt 2.</p>
    </template>
    <p v-else>Diese Session wurde nicht gefunden.</p>
  </section>
</template>

<style scoped>
.detail {
  display: grid;
  gap: var(--space-md);
}

.hint {
  color: var(--color-text-secondary);
}
</style>
