<template>
    <div class="container">
        <div class="row mb-4">
            <div class="col">
                <h1>Juego: {{this.$route.params.id}}</h1>
                <div class="btn-group" role="group" aria-label="Barra de herramientas">
                    <button class="btn btn-primary" type="button" @click="copyUrl()"><font-awesome-icon icon="share-alt" /></button>
                    <button :class="'btn '+(this.audio ? 'btn-primary' : 'btn-danger')" type="button" @click="this.audio = !this.audio"><font-awesome-icon :icon="this.audio ? 'volume-up': 'volume-mute'" /></button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-xl-7 mb-4">
                <div class="row">
                    <h2>{{75-this.played}}-{{this.played}}</h2>
                    <h1 style="font-size: 10rem;">{{ this.game.last }}</h1>
                </div>
                <div class="row">
                    <div class="col">
                        <button type="button" class="btn btn-primary" @click="playNumber()">Decir Número</button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-danger" @click="resetGame()">Reiniciar Juego</button>
                    </div>
                    
                </div>
                
            </div>
            <div class="col">
                <div class="container">
                    <div class="row align-items-center" v-for="(numbers,letter) in letters" :key="letter">
                        <div class="col-1">
                            <h1 class="title">{{ letter }}</h1>
                        </div>
                        <div class="col">
                            <span v-for="number in Object.keys(this.game.numbers).slice(numbers[0]-1,numbers[1])" :key="letter+number"><span :class="this.game.numbers[number] ? 'fw-bold fs-5' : ''">{{ number+' ' }}</span> </span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
       
        
    </div>
</template>

<script>
import { db,functions } from '@/firebase'
import { httpsCallable } from "firebase/functions";
import { ref, get,set, onValue} from "firebase/database";

export default {
    name: 'Game',
    data() {
        return {
            letters: {'B':[1,15],'I':[16,30],'N':[31,45],'G':[46,60],'O':[61,75]},
            played: 0,
            audio: true,
            game: {last: 'B00',numbers: {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false,12: false,13: false,14: false,15: false,16: false,17: false,18: false,19: false,20: false,21: false,22: false,23: false,24: false,25: false,26: false,27: false,28: false,29: false,30: false,31: false,32: false,33: false,34: false,35: false,36: false,37: false,38: false,39: false,40: false,41: false,42: false,43: false,44: false,45: false,46: false,47: false,48: false,49: false,50: false,51: false,52: false,53: false,54: false,55: false,56: false,57: false,58: false,59: false,60: false,61: false,62: false,63: false,64: false,65: false,66: false,67: false,68: false,69: false,70: false,71: false,72: false,73: false,74: false,75: false}}
        }
    },
    mounted(){
        this.vueInsomnia().on();
        if(this.$route.params.id != ""){
            this.getGame(this.$route.params.id);
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
        window.addEventListener('keypress', this.onKeyPress);
        this.sayNumber("        ");
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
                            this.game = new_val;
                            if(this.audio){
                                this.sayNumber(this.game.last);
                            }
                            this.played = this.played+1;
                            if(this.game.last == "B00"){
                                this.played = 0;
                            }
                        }
                        
                    })
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
        resetGame: function(){
            this.game.last = 'B00';
            this.game.numbers = {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false,12: false,13: false,14: false,15: false,16: false,17: false,18: false,19: false,20: false,21: false,22: false,23: false,24: false,25: false,26: false,27: false,28: false,29: false,30: false,31: false,32: false,33: false,34: false,35: false,36: false,37: false,38: false,39: false,40: false,41: false,42: false,43: false,44: false,45: false,46: false,47: false,48: false,49: false,50: false,51: false,52: false,53: false,54: false,55: false,56: false,57: false,58: false,59: false,60: false,61: false,62: false,63: false,64: false,65: false,66: false,67: false,68: false,69: false,70: false,71: false,72: false,73: false,74: false,75: false};
            this.played = 0;
            this.setGame();
        },
        playNumber: function(){
            var left_numbers = Object.keys(Object.fromEntries(Object.entries(this.game.numbers).filter(([,played]) => !played)));
            if(left_numbers.length > 0){
                var index = Math.floor(Math.random() * left_numbers.length);
                const n = left_numbers[index];
                this.game.numbers[n] = true;
                this.game.last = this.getLetter(n)+String(n);
                if(this.audio){
                    this.sayNumber(this.game.last);
                }
                this.played = this.played+1;
                this.setGame();
            }
            
        },
        sayNumber: function(number){
            var msg = new SpeechSynthesisUtterance();
            msg.text = number;
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