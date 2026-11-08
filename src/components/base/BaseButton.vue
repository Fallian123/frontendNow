<script setup lang="ts">
/* Generischer Button (Base-Schicht): keine Fachlogik. */

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
  }>(),
  { variant: 'secondary' },
)
</script>

<template>
  <button type="button" class="btn" :class="`btn--${variant}`">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  min-height: var(--space-2xl);
  padding: var(--space-sm) var(--space-md);
  border: var(--border-width-default) solid transparent;
  border-radius: var(--radius-control);
  font: inherit;
  font-weight: var(--font-weight-label);
  cursor: pointer;
}

.btn--primary {
  background-color: var(--color-accent);
  color: var(--color-text-on-accent);
}

.btn--primary:hover {
  background-color: var(--color-accent-hover);
}

.btn--secondary {
  background-color: var(--color-surface-raised);
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
}

.btn--secondary:hover {
  border-color: var(--color-text-primary);
}

.btn--ghost {
  background-color: transparent;
  color: var(--color-link);
}

.btn--ghost:hover {
  color: var(--color-accent-hover);
  text-decoration: underline;
}
</style>