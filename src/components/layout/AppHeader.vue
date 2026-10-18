<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSchedule } from '@/composables/useSchedule'

const { count } = useSchedule()
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <RouterLink to="/" class="brand" aria-label="Linie F – zur Startseite">
        <span class="brand__bullet" aria-hidden="true">F</span>
        <span class="brand__name">Linie F</span>
      </RouterLink>

      <nav class="nav" aria-label="Hauptnavigation">
        <RouterLink to="/" class="nav__link">Programm</RouterLink>
        <RouterLink to="/mein-programm" class="nav__link">
          Mein Programm <span class="nav__count">{{ count }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--color-surface-raised);
  border-bottom: var(--border-width-line) solid var(--color-accent);
}

.header__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  max-width: 72rem;
  margin: 0 auto;
  padding: var(--space-md) var(--space-lg);
}

.brand {
  display: inline-flex;
  white-space: nowrap;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-text-primary);
  text-decoration: none;
}

.brand__bullet {
  display: grid;
  place-items: center;
  width: var(--space-xl);
  height: var(--space-xl);
  border-radius: var(--radius-control);
  background-color: var(--color-accent);
  color: var(--color-text-on-accent);
  font-weight: var(--font-weight-heading);
}

.brand__name {
  font-size: var(--font-size-heading-sm);
  font-weight: var(--font-weight-heading);
}

.nav {
  display: flex;
  gap: var(--space-md);
}

.nav__link {
  white-space: nowrap;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-label);
  text-decoration: none;
}

.nav__link:hover,
.nav__link.router-link-exact-active {
  color: var(--color-text-primary);
  text-decoration: underline;
  text-decoration-color: var(--color-accent);
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}

.nav__count {
  display: inline-block;
  min-width: 1.5em;
  padding: 0 var(--space-xs);
  border-radius: var(--radius-badge);
  background-color: var(--color-text-primary);
  color: var(--color-surface);
  font-size: var(--font-size-caption);
  text-align: center;
}
</style>
