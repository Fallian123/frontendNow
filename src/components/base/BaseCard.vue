<script setup lang="ts">
/** Generische Container-Karte (Base-Schicht). */
</script>

<template>
  <section class="card">
    <slot />
  </section>
</template>

<style scoped>
.card {
  padding: var(--space-lg);
  background-color: var(--color-surface-raised);
  border: var(--border-width-default) solid var(--color-border-subtle);
  border-radius: var(--radius-control);
}
</style>
