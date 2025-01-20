<script setup>
import { reactive, ref } from 'vue';
import AlertComponent from '../alert/alert.vue';

// Props
const { books, searchResult } = defineProps({
  books: {
    type: Array,
    required: true,
  },
  searchResult: {
    type: Boolean,
    required: true,
  },
});

// State
const bookList = reactive([...books]); // Reactive copy of the passed-in books prop
const alertMessage = ref('');
const alertType = ref('success');

async function addBook(book) {
  try {
    const response = await $fetch('/api/book/add', {
      method: 'POST',
      body: {
        book: book,
      },
    });
    alertMessage.value = `Book added: ${response.book?.title}`;
    alertType.value = 'success';
  } catch (error) {
    console.error(error);
    alertMessage.value = `Error adding book: ${book?.title}, verify you are logged in`;
    alertType.value = 'danger';
  }
}

async function deleteBook(bookId) {
  try {
    const response = await $fetch('/api/book/delete', {
      method: 'DELETE',
      body: {
        bookId: bookId,
      },
    });
    const idToRemove = response.book?.id;
    const index = bookList.findIndex((book) => book.id === idToRemove);
    if (index > -1) {
      bookList.splice(index, 1);
    }
    alertMessage.value = `Book removed: ${response.book?.title}`;
    alertType.value = 'success';
  } catch (error) {
    console.error(error);
    alertMessage.value = `Error removing book: ${bookId}, try later`;
    alertType.value = 'danger';
  }
}
</script>

<template>
  <div>
    <!-- Alert Component -->
    <AlertComponent
      :message="alertMessage"
      :type="alertType"
      :duration="3000"
    />

    <!-- Books Table -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Published</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in bookList" :key="book.id || book.key">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ book.title }}</td>
          <td>{{ book.author_name }}</td>
          <td>{{ book.first_publish_year }}</td>
          <td>
            <button
              v-if="searchResult"
              class="btn btn-success"
              @click="addBook(book)"
            >
              Add
            </button>
            <button v-else class="btn btn-danger" @click="deleteBook(book.id)">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
@import '../../node_modules/bootstrap/scss/functions';
@import '../../node_modules/bootstrap/scss/mixins';
@import '../../node_modules/bootstrap/scss/variables';
@import '../../node_modules/bootstrap/scss/tables';
@import '../../node_modules/bootstrap/scss/buttons';
</style>
