<template>
    <b-container>
        <b-button variant="danger" class="exit" @click="exitGame">Quit</b-button>
        <TimerVue :timeLeft="timeLeft" />
        <h1>Question {{number}}</h1>
        <div class="question-area">
            <h4>Q{{number}}. {{data.question}}</h4>
        </div>
        <div class="answers">
            <p
            v-for="answer in data.answers" 
            :key="answer.answer"
            @click="selectElement(answer.answer)"
            :class="{'selected': selected === answer.answer && !isCompleted, 'correct' : isCompleted && answer.isCorrect, 'incorrect': selected == answer.answer && isCompleted && !answer.isCorrect}"
            >
                {{answer.answer}}
            </p>
        </div>
        <b-button variant="success" v-if="selected !== '' && !isCompleted" @click="submitQuestion">Submit</b-button>
        <b-button variant="success" v-if="isCompleted" @click="nextQuestion">Next</b-button>
    </b-container>
</template>

<script>
import TimerVue from "../Timer.vue"

export default {
    name: "Questions",
    components: {
        TimerVue
    },
    props: ["number", 'data'],
    data() {
        return {
            timeout: null,
            timeLimit: 30,
            timePassed: 0,
            timerInterval: null,
            selected: '',
            isCompleted: false,
            isCorrect: null,
            randomArray: []
        }
    },
    computed: {
        timeLeft() {
            return this.timeLimit - this.timePassed
        },
    },
    mounted() {
        //get random array
        let currentAnswers = this.data.answers
        let currentIndex = this.data.answers.length, randomIndex;

        while(currentIndex != 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            //swap
            [currentAnswers[currentIndex], currentAnswers[randomIndex]] = [currentAnswers[randomIndex], currentAnswers[currentIndex]];
        }

        this.randomArray = currentAnswers;

        //start timer
        this.startTimer();
        //make timeout
        this.timeout = setTimeout(() => {
            clearInterval(this.timerInterval);
            console.log('time is out');
            this.isCompleted = true;
            this.$emit('points', 0);
        }, this.timeLimit*1000);
    },
    methods: {
        submitQuestion() {
            //clean all intervals
            clearTimeout(this.timeout);
            clearInterval(this.timerInterval);
            //mark as completed
            this.isCompleted = true;
            //check selected answer
            for(let i = 0; i < this.data.answers.length; i++) {
                let answer = this.data.answers[i];

                if(this.selected === answer.answer) {
                    if(answer.isCorrect){
                        this.$emit('points', 1);
                    }else{
                        this.$emit('points', 0);
                    }
                    break;
                }
            }
        },
        startTimer() {
            this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
        },
        nextQuestion() {
            this.$emit("next", this.number);
        },
        selectElement(selected) {
            if(!this.isCompleted) {
                this.selected = selected;
            }
        },
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

<style scoped lang="scss">
    .container{
        position: absolute;
        background-color: lightcyan;
        border-radius: 30px;
        width: 60%;
        height: 60vh;
        top: 25vh;
        left: 20%;
        overflow: auto;

        h1, h4 {
            margin: 15px auto;
        }

        .question-area {
            height: 20vh;
            overflow: auto;
        }

        button {
            width: 120px;
            position: absolute;
            bottom: 20px;
            left: calc(50% - 60px);
        }

        .exit {
            margin: 0 !important;
            position: absolute;
            height: 40px;
            left: 80%;
            top: 3vh;
        }
    }

    .selected {
        color: black;
        background-color: orange;
    }

    .correct {
        color: black;
        background-color: lightgreen;
    }

    .incorrect {
        background-color: red;
    }

    p {
        margin: 5px auto;
        cursor: pointer;
        font-size: 20px;
        background-color: gray;
        color: white;
        
        &:hover {
            color: black;
            background-color: lightgray;
        }
    }
</style>