<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import SessionCard from '@/components/features/SessionCard.vue'
import { useConferenceData } from '@/composables/useConferenceData'

const props = defineProps<{ id: string }>()

const { speakerById, sessions, error } = useConferenceData()

const speaker = computed(() => speakerById.value.get(props.id))
const speakerSessions = computed(() => sessions.value.filter((s) => s.speakerIds.includes(props.id)))
</script>

<template>
  <section class="speaker">
    <p><RouterLink :to="{ name: 'home' }">← Zurück zum Programm</RouterLink></p>

    <p v-if="error" role="alert" class="error">{{ error.message }}</p>

    <template v-else-if="speaker">
      <h1>{{ speaker.name }}</h1>
      <p class="speaker__role">{{ speaker.title }} · {{ speaker.company }}</p>
      <p>{{ speaker.bio }}</p>

      <section>
        <h2>{{ speakerSessions.length === 1 ? 'Session' : 'Sessions' }}</h2>
        <ul class="session-list">
          <li v-for="session in speakerSessions" :key="session.id">
            <SessionCard :session="session" />
          </li>
        </ul>
      </section>
    </template>

    <p v-else>Diese:r Speaker:in wurde nicht gefunden.</p>
  </section>
</template>

<style scoped>
.speaker {
  display: grid;
  gap: var(--space-md);
}

.speaker__role {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-label);
}

.session-list {
  display: grid;
  gap: var(--space-md);
  padding: 0;
  list-style: none;
}

.error {
  color: var(--color-danger);
}
</style>