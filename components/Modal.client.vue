<template>
  <Dialog
    v-model:open="open"
    class="modal"
    :x-close="xClose"
  >
    <slot />
  </Dialog>
</template>

<script setup>
import { useEventListener } from '@vueuse/core'

const open = defineModel('open', { required: true })

const props = defineProps({
  xClose: {
    type: Boolean,
    default: true,
  },
})
</script>

