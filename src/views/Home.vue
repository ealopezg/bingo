<template>
  <div class="home">
    <h1>Bingo !</h1>
    <div class="container">
      <div class="row mb-3">
        <div class="col-12 col-lg-4 mb-3">
          <button type="button" class="btn btn-primary" @click="this.$router.push('/game')">Nuevo Juego</button>
        </div>
        <div class="col-12 col-lg-4 mb-3">
          <button type="button" class="btn btn-primary" @click="this.$router.push('/game/'+last_game_id)" >Continuar Juego</button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-primary" @click="this.connect_game_modal.show()">Conectarse a Juego</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="connect_game_modal" tabindex="-1">
      <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title">Conectarse a juego</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">#</span>
              <input type="text" class="form-control" placeholder="Id de juego" aria-label="Id" aria-describedby="addon-wrapping" v-model="this.form_game_id">
            </div>
            <p class="mt-3">También puede escanear el código QR desde otro dispositivo para conectarse</p>
              
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-primary" @click="this.connect_game_modal.hide();this.$router.push('/game/'+this.form_game_id)">Conectarse</button>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
import {Modal} from 'bootstrap'
export default {
  name: 'Home',
  data() {
    return {
      connect_game_modal: null,
      form_game_id: ''
    }
  },
  mounted(){
    this.connect_game_modal = new Modal(document.getElementById('connect_game_modal'));
  },
  computed: {
    last_game_id () {
      return this.$store.state.last_game;
    }
  }
}
</script>
