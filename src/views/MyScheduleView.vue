<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import SessionCard from '@/components/features/SessionCard.vue'
import { useSchedule } from '@/composables/useSchedule'
import { formatDay } from '@/utils/format'

const { mySessions, conflicts, count, clearSchedule } = useSchedule()
</script>

<template>
  <section class="schedule">
    <h1>Mein Programm</h1>

    <p v-if="count === 0" class="empty">
      Noch keine Sessions gemerkt. Im
      <RouterLink :to="{ name: 'home' }">Programm</RouterLink>
      kannst du Sessions hinzufügen.
    </p>

    <template v-else>
      <div class="schedule__bar">
        <p role="status" data-testid="schedule-count">
          {{ count }} {{ count === 1 ? 'Session' : 'Sessions' }} gemerkt
        </p>
        <BaseButton variant="ghost" @click="clearSchedule">Alle entfernen</BaseButton>
      </div>

      <section v-if="conflicts.length" aria-labelledby="conflicts-heading">
        <h2 id="conflicts-heading">Zeitliche Überschneidungen</h2>
        <ul>
          <li v-for="[a, b] in conflicts" :key="a.id + b.id">
            {{ a.title }} und {{ b.title }} ({{ formatDay(a.day) }})
          </li>
        </ul>
      </section>

      <section aria-labelledby="sessions-heading">
        <h2 id="sessions-heading">Gemerkte Sessions</h2>
        <ul class="session-list">
          <li v-for="session in mySessions" :key="session.id">
            <SessionCard :session="session" />
          </li>
        </ul>
      </section>
    </template>
  </section>
</template>

<style scoped>
.schedule {
  display: grid;
  gap: var(--space-md);
}

.schedule__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
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