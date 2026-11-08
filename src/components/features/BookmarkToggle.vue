<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useSchedule } from '@/composables/useSchedule'

const props = defineProps<{ sessionId: string }>()

const { isBookmarked, toggleBookmark } = useSchedule()
const active = computed(() => isBookmarked(props.sessionId))
</script>

<template>
  <BaseButton :variant="active ? 'primary' : 'secondary'" @click="toggleBookmark(sessionId)">
    {{ active ? 'Im Programm – entfernen' : 'Zum Programm hinzufügen' }}
  </BaseButton>
</template>