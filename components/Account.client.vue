<template>
  <slot :display="display" :is-current="isCurrent">
    <span>{{ isCurrent ? `You` : display }}</span>
  </slot>
</template>

<script setup>
import { useAccount, useEnsName } from '@wagmi/vue'

const props = defineProps({
  address: String
})

const address = computed(() => props.address?.value || props.address)

const { address: currentAddress } = useAccount()
const isCurrent = computed(() => currentAddress.value?.toLowerCase() === address.value.toLowerCase())

const { data: ens } = useEnsName({
  address,
  chainId: 1,
})

const display = computed(() => ens.value || shortAddress(address.value))
</script>
