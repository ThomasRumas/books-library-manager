<script setup>
import { ref } from 'vue';
import BooksComponent from '../book/book.vue';

// State variables
const books = ref([]);
const search = ref('');
const isLoading = ref(false);

async function performSearch() {
  isLoading.value = true;
  books.value = [];
  try {
    const response = await fetch(`/api/search?q=${search.value}`);
    const data = await response.json();
    books.value = data?.docs || [];
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <!-- Search Input -->
      <div class="col-8">
        <div class="form-floating mb-3">
          <input
            id="search"
            v-model="search"
            type="text"
            class="form-control"
            placeholder="name@example.com"
          />
          <label for="search">Enter your research</label>
        </div>
      </div>
      <!-- Search Button -->
      <div class="col-4">
        <button type="button" class="btn btn-primary" @click="performSearch">
          Search!
        </button>
      </div>
    </div>

    <!-- Spinner -->
    <div v-if="isLoading" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <!-- Book List -->
    <BooksComponent
      v-if="books.length > 0"
      :books="books"
      :search-result="true"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '../../node_modules/bootstrap/scss/functions';
@import '../../node_modules/bootstrap/scss/mixins';
@import '../../node_modules/bootstrap/scss/variables';
@import '../../node_modules/bootstrap/scss/forms';
@import '../../node_modules/bootstrap/scss/buttons';
@import '../../node_modules/bootstrap/scss/spinners';
</style>
