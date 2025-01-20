<script setup>
import SearchComponent from '../components/search/search.vue';
import BooksComponent from '../components/book/book.vue';

const userId = useState('login', () => null);
const userCookie = useCookie('user');
userId.value = userCookie.value;

let books = [];

if (userId.value) {
  const response = await $fetch('/api/library?userId=' + userId.value);
  books = response.books;
}
</script>

<template>
  <div>
    <div class="hero">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-6">
            <h1>Manage your book library easily</h1>
            <p>
              This simple website will allow you to search and manage your books
              collection using Open Book API
            </p>
          </div>
          <div class="col-6 txt-right">
            <img src="/public/hero.webp" alt="" width="500" height="500" />
          </div>
        </div>
      </div>
    </div>
    <template v-if="books.length > 0">
      <div class="container margin-top">
        <div class="row">
          <div class="col-12">
            <h2 class="mb-4">Your Library</h2>
          </div>
        </div>
        <div className="row">
          <div class="col-12">
            <BooksComponent :books="books" :search-result="false" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        <div class="margin-top container">
          <div class="row">
            <div class="col-12">
              <h2>Your library seems to be empty or you are not logged in</h2>
            </div>
          </div>
        </div>
        <SearchComponent />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  background-color: #02543c;

  h1 {
    font-size: 50px;
    font-weight: bold;
    text-transform: uppercase;
    color: #f7323f;
  }

  p {
    color: white;
    font-size: 24px;
  }
}

.txt-right {
  text-align: right;
}

.margin-top {
  margin-top: 50px;
}
</style>
