<template>
    <b-container>
        <b-button variant="danger" class="exit" @click="exitGame">Quit</b-button>
        <h2>Game over!</h2>
        <h4>You have scored {{score}}/20</h4>
    </b-container>
</template>

<script>
export default {
    name: "EndGame",
    props: ['score'],
    methods: {
        exitGame() {
            if(confirm('Are you sure you want to exit the game?')){
                clearTimeout(this.timeout);
                clearInterval(this.timerInterval);
                this.$emit('exit', true);
            }
        }
    },
}
</script>

<style lang="scss">
    .container {
        position: absolute;
        background-color: lightcyan;
        border-radius: 30px;
        width: 60% !important;
        height: 50vh;
        top: 25vh !important;
        left: 20% !important;

        h4 {
            margin-top: 20vh;
        }

        .exit {
            margin: 0 !important;
            position: absolute;
            height: 40px;
            left: 80%;
            top: 3vh;
        }
    }
</style>