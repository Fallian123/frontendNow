<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BookmarkToggle from '@/components/features/BookmarkToggle.vue'
import SessionMeta from '@/components/features/SessionMeta.vue'
import { useConferenceData } from '@/composables/useConferenceData'
import type { Session, Speaker } from '@/types/conference'

const props = defineProps<{ session: Session }>()

const { trackById, speakerById } = useConferenceData()

const track = computed(() => trackById.value.get(props.session.trackId))
const speakers = computed(() =>
  props.session.speakerIds
    .map((id) => speakerById.value.get(id))
    .filter((s): s is Speaker => s !== undefined),
)
</script>

<template>
  <BaseCard class="session">
    <BaseBadge v-if="track" :color="`var(--color-track-${track.id})`">{{ track.name }}</BaseBadge>

    <h3 class="session__title">
      <RouterLink :to="{ name: 'session', params: { id: session.id } }">
        {{ session.title }}
      </RouterLink>
    </h3>

    <SessionMeta :session="session" />

    <p v-if="speakers.length" class="session__speakers">
      <template v-for="(speaker, index) in speakers" :key="speaker.id">
        <span v-if="index > 0">, </span>
        <RouterLink :to="{ name: 'speaker', params: { id: speaker.id } }">
          {{ speaker.name }}
        </RouterLink>
      </template>
    </p>
    <div>
      <BookmarkToggle :session-id="session.id" />
    </div>

  </BaseCard>
</template>

<style scoped>
.session {
  display: grid;
  gap: var(--space-sm);
  justify-items: start;
}
</style>