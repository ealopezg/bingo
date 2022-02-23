<template>
  <router-view/>
</template>
<script>
export default {
  computed: {
    last_game_id () {
      return this.$store.state.last_game;
    }
  },
  mounted() {
        this.$store.commit("initializeStore");
    },
}
</script>

<style>
#app {
  padding: 30px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


@import'~bootstrap/dist/css/bootstrap.css'

</style>
