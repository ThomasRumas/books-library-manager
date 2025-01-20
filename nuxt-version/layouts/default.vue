<script setup>
    import NavigationComponent from '@/components/navigation/navigation.vue';
</script>  

<template>
    <header>
        <NavigationComponent />
    </header>
    <main className="col-12">
        <slot></slot>
    </main>
</template>