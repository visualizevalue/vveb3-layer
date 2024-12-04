<template>
  <Teleport to="body">
    <div
      popover
      ref="popover"
      class="popover"
      @cancel="dismiss"
    >
      <button v-if="xClose" class="close" @click="dismiss">
        <Icon type="close" />
      </button>

      <slot />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  id: String,
  class: String,
  xClose: {
    type: Boolean,
    default: true,
  },
})
const open = defineModel('open', { required: true })
const popover = ref(null)

const show = () => popover.value?.showPopover()
const hide = () => {
  return new Promise((resolve) => {
    const keyFrame = new KeyframeEffect(
      popover.value,
      [{ translate: '0 var(--spacer)', opacity: '0' }],
      { duration: 300, easing: 'ease', direction: 'normal' }
    )

    const animation = new Animation(keyFrame, document.timeline)

    animation.onfinish = () => {
      popover.value.hidePopover()
      resolve()
    }
    animation.play()
  })
}
const dismiss = () => {
  open.value = false
}

// Keep track of the open/hide state
watchEffect(() => open.value ? show() : hide())
</script>

<style>
[popover] {
  position: fixed;
  padding: calc(var(--spacer)*2);
  max-width: var(--dialog-width);
  width: 100%;
  background: var(--background);
  color: var(--color);
  border: var(--border);
  overscroll-behavior: contain;
  height: min-content;
  opacity: 0;
  pointer-events: none;
  align-content: center;

  &::backdrop {
    background: transparent;
    backdrop-filter: none;
    pointer-events: none;
  }

  &:popover-open {
    animation: fade-in var(--speed);
    opacity: 1;
    pointer-events: all;

    &::backdrop {
      background: var(--popover-background-color);
      backdrop-filter: var(--popover-backdrop-filter);
      pointer-events: none;
    }
  }

  > .close {
    position: absolute;
    top: var(--spacer);
    right: var(--spacer);
    width: var(--spacer);
    height: var(--spacer);
    padding: 0;
    z-index: 10;
  }

  > h1 {
    padding-right: var(--size-6);
    font-family: var(--font-family-ui);
    font-size: var(--font-lg);
    text-transform: var(--text-transform);
    margin-bottom: var(--size-3);
  }

  > .actions {
    margin-top: var(--spacer);
    display: flex;
    gap: var(--spacer);
    justify-content: flex-end;
  }
}

html:has(dialog[open]),
body:has(dialog[open]) {
  overflow: hidden;
}
</style>

