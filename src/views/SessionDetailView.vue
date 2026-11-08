<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BookmarkToggle from '@/components/features/BookmarkToggle.vue'
import SessionMeta from '@/components/features/SessionMeta.vue'
import { useConferenceData } from '@/composables/useConferenceData'
import type { Speaker } from '@/types/conference'

const props = defineProps<{ id: string }>()

const { sessionById, trackById, speakerById, error } = useConferenceData()

const session = computed(() => sessionById.value.get(props.id))
const track = computed(() =>
  session.value ? trackById.value.get(session.value.trackId) : undefined,
)

const speakers = computed(() =>
  (session.value?.speakerIds ?? [])
    .map((id) => speakerById.value.get(id))
    .filter((s): s is Speaker => s !== undefined),
)
</script>

<template>
  <section class="detail">
    <p><RouterLink :to="{ name: 'home' }">← Zurück zum Programm</RouterLink></p>

    <p v-if="error" role="alert" class="error">{{ error.message }}</p>

    <template v-else-if="session">
      <div v-if="track">
        <BaseBadge :color="`var(--color-track-${track.id})`">{{ track.name }}</BaseBadge>
      </div>

      <h1>{{ session.title }}</h1>
      <SessionMeta :session="session" />
      <p class="abstract">{{ session.abstract }}</p>

      <section v-if="speakers.length">
        <h2>{{ speakers.length > 1 ? 'Speaker:innen' : 'Speaker:in' }}</h2>
        <ul class="speakers">
          <li v-for="speaker in speakers" :key="speaker.id">
            <RouterLink :to="{ name: 'speaker', params: { id: speaker.id } }">
              {{ speaker.name }}
            </RouterLink>
            – {{ speaker.title }}, {{ speaker.company }}
          </li>
        </ul>
      </section>

      <div>
        <BookmarkToggle :session-id="session.id" />
      </div>
    </template>

    <p v-else>Diese Session wurde nicht gefunden.</p>
  </section>
</template>

<style scoped>
.detail {
  display: grid;
  gap: var(--space-md);
}

.speakers {
  display: grid;
  gap: var(--space-xs);
  padding: 0;
  list-style: none;
}

.error {
  color: var(--color-danger);
}
</style>