<template>
    <div class="spinner-border m-5 text-primary" role="status" v-if="this.loading">
        <span class="visually-hidden">Loading...</span>
    </div>
    <div class="container" v-else>
        <div class="row mb-4">
            <div class="col">
                <div class="d-flex">
                    <div class="">
                        <h1>Bingo: {{this.$route.params.id}}</h1>
                    </div>
                    <div class="ms-auto">
                        <div class="btn-group" role="group" aria-label="Barra de herramientas">
                            <button class="btn btn-primary" type="button" @click="this.$router.push('/')"><font-awesome-icon icon="home"/></button>
                            <button class="btn btn-primary" type="button" @click="this.qr_modal.show()"><font-awesome-icon icon="qrcode"/></button>
                            <button class="btn btn-primary" type="button" @click="copyUrl()"><font-awesome-icon icon="copy"/></button>
                            <button :class="'btn '+(this.audio ? 'btn-primary' : 'btn-danger')" type="button" @click="this.audio = !this.audio"><font-awesome-icon :icon="this.audio ? 'volume-up': 'volume-mute'" /></button>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-6 mb-4">
                <div class="row">
                    <div class="col">
                        <h1 style="font-size: 10rem;" v-if="this.game.last != 'B00'">{{ this.game.last }}</h1><h1 v-else>No iniciado</h1>
                        <h2>Jugados: {{this.played}} Restantes: {{75-this.played}}</h2>
                    </div>
                    
                </div>
                <div class="row mt-4">
                    <div class="col">
                        <button type="button" class="btn btn-primary" @click="playNumber()">Jugar Número</button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-danger" @click="this.reset_modal.show()">Reiniciar Juego</button>
                    </div>
                    
                </div>
                
            </div>
            <div class="col">
                <div class="row">
                    <div class="container">
                        <div class="row align-items-center" v-for="(numbers,letter) in letters" :key="letter">
                            <div class="col-12 col-md-1">
                                <h1 class="title mb-0">{{ letter }}</h1>
                            </div>
                            <div class="col mb-3">
                                <div class="d-flex flex-wrap justify-content-between align-items-center ">     
                                    <div v-for="number in Object.keys(this.game.numbers).slice(numbers[0]-1,numbers[1])" :key="letter+number" :class="'number p-1 fs-5 '+(this.game.numbers[number] ? 'fw-bold' : '')+' '+(number == this.game.last.substring(1) ? 'text-primary': '')">{{ number+' ' }}</div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
                <div class="row mt-4" v-if="this.last_five.length > 0">
                    <div class="col">
                        <h4 class="mb-1">Ultimos 5</h4>
                        <div class="p-4 d-flex justify-content-between align-items-center">
                            <h1 class="title mb-0" v-for="(lf,index) in this.last_five" v-bind:key="index">{{ lf }}</h1>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
       
        
    </div>
    <div class="modal fade" id="qr_modal" tabindex="-1" v-if="this.url != ''">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Codigo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Escanea el código en otro dispositivo para abrir el juego</p>
                <QRCodeVue3
                
                :width="200"
                :height="200"
                :value="this.url"
                :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
                :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
                :dotsOptions="{
                    type: 'rounded',
                    color: '#0d6efd',
                    gradient: {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: '#0d6efd' },
                        { offset: 1, color: '#0d6efd' },
                    ],
                    },
                }"
                :backgroundOptions="{ color: '#ffffff' }"
                :cornersSquareOptions="{ type: 'dot', color: '#26819D' }"
                :cornersDotOptions="{ type: undefined, color: '#26819D' }"
                fileExt="png" 
                myclass="my-qur"
                imgclass="img-qr"
                />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="reset_modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Reiniciar Juego</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>¿Está seguro que desea reiniciar el juego? Esta acción no se puede deshacer</p>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" @click="resetGame(); this.reset_modal.hide()">Reiniciar juego</button>
            </div>
            </div>
        </div>
    </div>

</template>

<script>
import { db,functions } from '@/firebase'
import { httpsCallable } from "firebase/functions";
import { ref, get,set, onValue} from "firebase/database";
import {Modal} from 'bootstrap'
import QRCodeVue3 from "qrcode-vue3";

export default {
    name: 'Game',
    components: {
        QRCodeVue3
    },
    data() {
        return {
            loading: true,
            letters: {'B':[1,15],'I':[16,30],'N':[31,45],'G':[46,60],'O':[61,75]},
            played: 0,
            audio: true,
            last_five: [],
            qr_modal: null,
            reset_modal: null,
            url: '',
            game: {last: 'B00',numbers: {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false,12: false,13: false,14: false,15: false,16: false,17: false,18: false,19: false,20: false,21: false,22: false,23: false,24: false,25: false,26: false,27: false,28: false,29: false,30: false,31: false,32: false,33: false,34: false,35: false,36: false,37: false,38: false,39: false,40: false,41: false,42: false,43: false,44: false,45: false,46: false,47: false,48: false,49: false,50: false,51: false,52: false,53: false,54: false,55: false,56: false,57: false,58: false,59: false,60: false,61: false,62: false,63: false,64: false,65: false,66: false,67: false,68: false,69: false,70: false,71: false,72: false,73: false,74: false,75: false}}
        }
    },
    mounted(){
        this.vueInsomnia().on();
        if(this.$route.params.id != ""){
            this.getGame(this.$route.params.id);
            this.$store.commit('save_last_game',this.$route.params.id);
            this.qr_modal = new Modal(document.getElementById('qr_modal'));
            this.reset_modal = new Modal(document.getElementById('reset_modal'));
        }
        else{
            const genGame = httpsCallable(functions, 'newGame');
            genGame()
            .then((result) => {
                // Read result of the Cloud Function.
                /** @type {any} */
                //const data = result.data;
                this.$router.push('/game/'+result.data.id)
            });
        }
        
    },
    created() {
        this.url = window.location.href;
        window.addEventListener('keypress', this.onKeyPress);
        this.say("        ");
    },
    beforeUnmount() {
        window.removeEventListener('keypress', this.onKeyPress);
    },
    methods: {
        getGame: async function(id){
            get(ref(db,`games/${id}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    this.game = snapshot.val();
                    this.played = Object.keys(Object.fromEntries(Object.entries(this.game.numbers).filter(([,played]) => played))).length;
                    onValue(ref(db,`games/${id}`), (snapshot_n) => {
                        const new_val = snapshot_n.val();
                        if(new_val.last != this.game.last){
                            this.addToLastFive(this.game.last);
                            this.game = new_val;
                            if(this.audio){
                                this.say(this.game.last);
                            }
                            
                            this.played = this.played+1;
                            if(this.game.last == "B00"){
                                this.played = 0;
                                this.last_five = [];
                            }
                        }
                        
                    })
                    this.loading = false;
                } else {
                    this.$router.push('/')
                }
                }).catch((error) => {
                    console.error(error);
            });
        },
        onKeyPress: function(e){
            if(e.key == 'Enter' || e.key == ' '){
                this.playNumber();
            }
        },
        getLetter: function(n){
            for (const [letter, [min_n,max_n]] of Object.entries(this.letters)) {
                if(min_n <= n && max_n >= n){
                    return letter;
                }
            }
        },
        setGame: function(){
            set(ref(db,`games/${this.$route.params.id}`),this.game);
        },
        addToLastFive: function(number){
            if(number != 'B00'){
                this.last_five.push(number);
                if(this.last_five.length > 5){
                    this.last_five.shift()
                }
            }
        },
        resetGame: function(){
            this.game.last = 'B00';
            this.game.numbers = {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false,12: false,13: false,14: false,15: false,16: false,17: false,18: false,19: false,20: false,21: false,22: false,23: false,24: false,25: false,26: false,27: false,28: false,29: false,30: false,31: false,32: false,33: false,34: false,35: false,36: false,37: false,38: false,39: false,40: false,41: false,42: false,43: false,44: false,45: false,46: false,47: false,48: false,49: false,50: false,51: false,52: false,53: false,54: false,55: false,56: false,57: false,58: false,59: false,60: false,61: false,62: false,63: false,64: false,65: false,66: false,67: false,68: false,69: false,70: false,71: false,72: false,73: false,74: false,75: false};
            this.played = 0;
            this.last_five = [];
            this.setGame();
        },
        playNumber: function(){
            var left_numbers = Object.keys(Object.fromEntries(Object.entries(this.game.numbers).filter(([,played]) => !played)));
            if(left_numbers.length > 0){
                var index = Math.floor(Math.random() * left_numbers.length);
                const n = left_numbers[index];
                this.game.numbers[n] = true;
                this.addToLastFive(this.game.last);
                this.game.last = this.getLetter(n)+String(n);
                
                if(this.audio){
                    this.say(this.game.last);
                }
                this.played = this.played+1;
                
                this.setGame();
            }
            
        },
        say: function(message){
            var msg = new SpeechSynthesisUtterance();
            if(message == 'B00'){
                msg.text = 'Juego Reiniciado'
            }
            else{
                msg.text = message;
            }
            msg.lang = 'es';
            window.speechSynthesis.speak(msg);
        },
        copyUrl() {
            const el = document.createElement('textarea');  
            el.value = window.location.href;                                 
            el.setAttribute('readonly', '');                
            el.style.position = 'absolute';                     
            el.style.left = '-9999px';                      
            document.body.appendChild(el);                  
            const selected =  document.getSelection().rangeCount > 0  ? document.getSelection().getRangeAt(0) : false;                                    
            el.select();                                    
            document.execCommand('copy');                   
            document.body.removeChild(el);                  
            if (selected) {                                 
                document.getSelection().removeAllRanges();    
                document.getSelection().addRange(selected);   
            }
        }
    }
}
</script>

<style>
</style>