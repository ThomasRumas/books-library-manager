<script setup>
import { ref, watch, onUnmounted } from 'vue';

// Props
const { type, message, duration } = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) =>
      ['success', 'danger', 'warning', 'info'].includes(value),
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

// State and Refs
const visible = ref(false);
const alertRef = ref(null);

// Methods
let timeout;

watch(
  () => message,
  (newMessage) => {
    if (newMessage) {
      visible.value = true;

      // Automatically close the alert after the specified duration
      clearTimeout(timeout); // Clear any previous timeout
      timeout = setTimeout(() => {
        visible.value = false; // Hide the alert
      }, duration);
    }
  }
);

onUnmounted(() => {
  // Cleanup timeout when component is unmounted
  clearTimeout(timeout);
});
</script>

<template>
  <div
    ref="alertRef"
    class="alert floating-alert"
    :class="[
      `alert-${type}`,
      'alert-dismissible',
      'fade',
      visible ? 'show' : 'd-none',
    ]"
    role="alert"
  >
    <strong>{{ message }}</strong>
  </div>
</template>

<style scoped lang="scss">
@import '../../node_modules/bootstrap/scss/functions';
@import '../../node_modules/bootstrap/scss/mixins';
@import '../../node_modules/bootstrap/scss/variables';
@import '../../node_modules/bootstrap/scss/alert';

.floating-alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 3;
}
</style>
