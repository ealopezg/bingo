<template>
  <div class="home">
    <div class="container">
      <div class="row mb-3">
        <div class="col">
          <button type="button" class="btn btn-primary" @click="this.$router.push('/game')">Nuevo Juego</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button type="button" class="btn btn-primary">Conectarse a Juego</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
