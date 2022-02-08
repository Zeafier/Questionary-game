<template>
    <b-container>
        <TimerVue :timeLeft="timeLeft" />
        <h1>Question {{number}}</h1>
        <b-button @click="nextQuestion">Next</b-button>
    </b-container>
</template>

<script>
import TimerVue from "../Timer.vue"

export default {
    name: "Questions",
    components: {
        TimerVue
    },
    props: ["number"],
    data() {
        return {
            timeout: null,
            timeLimit: 30,
            timePassed: 0,
            timerInterval: null
        }
    },
    computed: {
        timeLeft() {
            return this.timeLimit - this.timePassed
        }
    },
    mounted() {
        //start timer
        this.startTimer();
        //make timeout
        this.timeout = setTimeout(() => {
            clearInterval(this.timerInterval);
            console.log('time is out');
            this.$emit("next", this.number);
        }, this.timeLimit*1000)
    },
    methods: {
        nextQuestion(){
            clearTimeout(this.timeout);
            clearInterval(this.timerInterval)
            this.$emit("next", this.number);
        },
        startTimer() {
            this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
        }
    },
}
</script>

<style scoped lang="scss">
    .container{
        position: absolute;
        background-color: lightcyan;
        border-radius: 30px;
        width: 60%;
        height: 50vh;
        margin-top: 25vh;
        margin-left: 20%;
    }
</style>