<template>
    <div class="container">
        <div class="row mb-4">
            <div class="col">
                <h1>Juego: {{this.$route.params.id}}</h1>
                <div class="btn-group" role="group" aria-label="Barra de herramientas">
                    <button class="btn btn-primary" type="button"><font-awesome-icon icon="share-alt" /></button>
                    <button :class="'btn '+(this.audio ? 'btn-primary' : 'btn-danger')" type="button" @click="this.audio = !this.audio"><font-awesome-icon :icon="this.audio ? 'volume-up': 'volume-mute'" /></button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-xl-7 mb-4">
                <div class="row">
                    <h2>{{this.left.length}}-{{this.played.length}}</h2>
                    <h1 style="font-size: 10rem;">{{ this.game.last }}</h1>
                </div>
                <div class="row">
                    <div class="col">
                        <button type="button" class="btn btn-primary" @click="playNumber()">Decir Número</button>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-danger" @click="newGame()">Nuevo Juego</button>
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
export default {
    name: 'Game',
    data() {
        return {
            letters: {'B':[1,15],'I':[16,30],'N':[31,45],'G':[46,60],'O':[61,75]},
            played: [],
            left: [],
            audio: true,
            game: {last: 'B00',numbers: {1: false,2: false,3: false,4: false,5: false,6: false,7: false,8: false,9: false,10: false,11: false,12: false,13: false,14: false,15: false,16: false,17: false,18: false,19: false,20: false,21: false,22: false,23: false,24: false,25: false,26: false,27: false,28: false,29: false,30: false,31: false,32: false,33: false,34: false,35: false,36: false,37: false,38: false,39: false,40: false,41: false,42: false,43: false,44: false,45: false,46: false,47: false,48: false,49: false,50: false,51: false,52: false,53: false,54: false,55: false,56: false,57: false,58: false,59: false,60: false,61: false,62: false,63: false,64: false,65: false,66: false,67: false,68: false,69: false,70: false,71: false,72: false,73: false,74: false,75: false}}
        }
    },
    mounted(){
        this.newGame();
    },
    created() {
        window.addEventListener('keypress', this.onKeyPress);
    },
    beforeUnmount() {
        window.removeEventListener('keypress', this.onKeyPress);
    },
    methods: {
        onKeyPress: function(e){
            if(e.key == 'Enter' || e.key == ' '){
                this.playNumber();
            }
        },
        newGame: function(){
            this.left = [];
            this.played = [];
            this.game.last = 'B00';
            for (const [letter,numbers] of Object.entries(this.letters)){
                for (let i = numbers[0]; i <= numbers[1]; i++) {
                    this.left.push(letter+String(i))
                    this.game.numbers[i] = false;
                }
            }
        },
        playNumber: function(){
            var index = Math.floor(Math.random() * this.left.length);
            const n = this.left[index];
            this.played.push(n);
            this.left.splice(index,1);
            this.game.last = n;
            this.game.numbers[parseInt(n.substring(1))] = true;
            if(this.audio){
                this.sayNumber(n);
            }
        },
        sayNumber: function(number){
            var msg = new SpeechSynthesisUtterance();
            msg.text = number;
            msg.lang = 'es';
            window.speechSynthesis.speak(msg);
        }
    }
}
</script>

<style>

</style>