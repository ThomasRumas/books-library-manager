<script setup>
import NavigationComponent from '@/components/navigation/navigation.vue';
</script>

<template>
  <div>
    <header>
      <NavigationComponent />
    </header>
    <main className="col-12">
      <slot />
    </main>
  </div>
</template>
