<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useConferenceData } from '@/composables/useConferenceData'
import { useSchedule } from '@/composables/useSchedule'

const { loadData } = useConferenceData()
const { init } = useSchedule()
const ready = ref(false)

onMounted(async () => {
  await loadData() // 1. Konferenzdaten laden
  init() // 2. „Mein Programm“ aus localStorage rehydrieren
  ready.value = true // 3. Views freigeben
})
</script>

<template>
  <AppHeader />
  <main class="main">
    <RouterView v-if="ready" />
    <p v-else role="status">Fahrplan wird geladen …</p>
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
