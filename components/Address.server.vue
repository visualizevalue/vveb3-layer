<template>
  <span>
    {{ display }}
    <slot />
  </span>
</template>

<script setup>
import shortAddress from '~/utils/short-address'

const props = defineProps({
  address: String,
})

const address = computed(() => props.address)

const display = computed(() => shortAddress(address.value))
</script>
