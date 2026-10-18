<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useConferenceData } from '@/composables/useConferenceData'
import { useSchedule } from '@/composables/useSchedule'

const { loadData } = useConferenceData()
const { init } = useSchedule()

onMounted(async () => {
  await loadData() // 1. Konferenzdaten laden
  init() // 2. „Mein Programm“ aus localStorage rehydrieren
})
</script>

<template>
  <AppHeader />
  <main class="main">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
.main {
  max-width: 72rem;
  margin: 0 auto;
  padding: var(--space-2xl) var(--space-lg) 0;
}
</style>
