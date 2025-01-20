<template>
  <Button v-if="isConnected" @click="disconnect" :class="className">
    <slot>{{ $t('disconnect_action') }}</slot>
  </Button>
</template>

<script setup>
import { useAccount, useDisconnect } from '@wagmi/vue'

const props = defineProps(['className'])

const { isConnected } = useAccount()
const { disconnect } = useDisconnect()
</script>

<style scoped>
.wallet-options {
  display: flex;
  gap: var(--spacer);
  flex-wrap: wrap;
  justify-content: center;
}
.choose-connector-button {
  img {
    width: var(--size-5);
  }
}
</style>
