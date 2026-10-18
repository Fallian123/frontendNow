<script setup lang="ts">
import { useConferenceData } from '@/composables/useConferenceData'

const { conference } = useConferenceData()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <span>Linie F · Studienprojekt „NextGen Web Frontends“ 2026</span>
      <span v-if="conference">{{ conference.name }} · {{ conference.location }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: var(--space-3xl);
  border-top: var(--border-width-default) solid var(--color-border-subtle);
  color: var(--color-text-secondary);
  font-size: var(--font-size-caption);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-sm);
  max-width: 72rem;
  margin: 0 auto;
  padding: var(--space-lg);
}
</style>
