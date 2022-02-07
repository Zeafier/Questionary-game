<template>
<div class="container">
  <Nav />
  <HomePage />
</div>
</template>

<script>
// @ is an alias to /src
import HomePage from '../components/HomePage.vue'
import Nav from '../components/Nav.vue'

export default {
  name: 'Home',
  components: {
    HomePage,
    Nav
  }
}
</script>
