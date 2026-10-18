<script setup lang="ts">
/**
 * Generisches Badge (Base-Schicht): kennt keine Konferenzlogik.
 * Die Farbe wird von außen als CSS-Wert übergeben, z. B. var(--color-track-ai-dx).
 */
defineProps<{
  color?: string
}>()
</script>

<template>
  <span class="badge" :style="color ? { '--badge-color': color } : undefined">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  --badge-color: var(--color-accent);

  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-badge);
  background-color: var(--badge-color);
  color: var(--color-text-on-accent);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-label);
  line-height: 1;
  white-space: nowrap;
}
</style>
