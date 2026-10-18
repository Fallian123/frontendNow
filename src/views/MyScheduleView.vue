<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSchedule } from '@/composables/useSchedule.ts'

const { mySessions, count } = useSchedule()
</script>

<template>
  <section class="schedule">
    <h1>Mein Programm</h1>

    <p v-if="count === 0" class="empty">
      Noch keine Sessions gemerkt. Die Funktion „Zum Programm hinzufügen“ folgt in Schritt 2.
    </p>

    <ul v-else>
      <li v-for="session in mySessions" :key="session.id">
        <RouterLink :to="{ name: 'session', params: { id: session.id } }">
          {{ session.startTime }} · {{ session.title }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.schedule {
  display: grid;
  gap: var(--space-md);
}

.empty {
  color: var(--color-text-secondary);
}
</style>
