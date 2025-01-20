<template>
  <Teleport to="body">
    <dialog ref="dialog" :class="props.class" @cancel.stop.prevent="open = false">
      <button v-if="xClose" class="close unstyled" @click="open = false">
        <Icon type="close" />
      </button>

      <slot />
    </dialog>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  class: String,
  xClose: Boolean,
})
const open = defineModel('open', { required: true })
const dialog = ref(null)

const show = () => dialog.value?.showModal()
const hide = () => {
  return new Promise((resolve) => {
    const keyFrame = new KeyframeEffect(
      dialog.value,
      [{ translate: '0 var(--spacer)', opacity: '0' }],
      { duration: 300, easing: 'ease', direction: 'normal' }
    )

    const animation = new Animation(keyFrame, document.timeline)

    animation.onfinish = () => {
      dialog.value?.close()
      resolve()
    }
    animation.play()
  })
}

// Keep track of the open/hide state
watchEffect(() => open.value ? show() : hide())
</script>

<style>
dialog {
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

  &[open] {
    animation: fade-in var(--speed);
    opacity: 1;
    pointer-events: all;

    &::backdrop {
      background: var(--dialog-background-color);
      backdrop-filter: var(--blur);
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
    z-index: var(--z-index-dialog);

    &:--highlight {
      outline: none;
    }
  }

  > h1 {
    padding-right: var(--size-6);
    font-family: var(--ui-font-family);
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
