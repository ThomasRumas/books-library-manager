<script setup>
import { useCookie } from '#app';

const userId = useState('login', () => null);
const userCookie = useCookie('user');
userId.value = userCookie.value;

// Logout function
async function logout() {
  try {
    const userCookie = useCookie('user');
    userCookie.value = null;
    userId.value = null;
  } catch (error) {
    console.error('Error during logout:', error);
  }
}
</script>

<template>
  <div class="nav">
    <nav class="container">
      <div class="row">
        <!-- Navigation Links -->
        <div class="col-8">
          <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/search">Search</NuxtLink></li>
          </ul>
        </div>
        <!-- User Actions -->
        <div class="col-4 txt-right">
          <ul>
            <li v-if="userId">
              <a href="#" @click.prevent="logout">Logout</a>
            </li>
            <template v-else>
              <li>
                <NuxtLink to="/login">Login</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/register">Register</NuxtLink>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  background-color: #02543c;
  padding: 30px 0;

  ul {
    list-style-type: none;
    padding-left: 0;

    li {
      display: inline-block;
      margin-right: 20px;

      a {
        font-size: 18px;
        font-weight: bold;
        color: white;
        text-decoration: none;

        &:hover {
          color: red;
        }
      }
    }
  }

  .txt-right {
    text-align: right;
  }
}
</style>
