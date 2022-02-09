<template>
    <main>
        <Dashboard v-if="tab === 0" @clicked="changeTab"/>
        <div class="tab" v-for="q in questions" :key="q">
            <QuestionsVue 
            v-if="tab !== 0 && tab === q" 
            @next="nextQuestion" 
            @points="countPoints" 
            @exit="exitGame"
            :number="tab" 
            :data="data[q-1]" />
        </div>

        <EndGameVue v-if="tab > 20" @exit="exitGame" :score="score" />
    </main>   
</template>

<script>
import Dashboard from "../components/game/Dashboard.vue"
import QuestionsVue from "../components/game/Questions.vue"
import EndGameVue from "../components/game/EndGame.vue"
import userService from '../store/user.service'

export default {
    name: "Game",
    components: {
        Dashboard,
        QuestionsVue,
        EndGameVue
    },
    data() {
        return {
            category: "",
            tab: 0,
            questions: [
                1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
            ],
            data: [],
            gameFinished: false,
            score: 0,
        }
    },
    methods: {
        changeTab(selected){
            this.data = [];
            userService.questions(selected).then(
                result => {
                    for (let k = 0; k < result.data.length; k++) {
                        let res = result.data[k];
                        //array for answers
                        let answers = [];
                        //incorrect answers
                        let incorrectAnswers = res.incorrectAnswers;
                        //push correct answer to array
                        answers.push({
                            answer: res.correctAnswer,
                            isCorrect: true
                        });
                        //loop through wrong answers
                        let currentIndex = incorrectAnswers.length, randomIndex;
                        while(currentIndex != 0){
                            //pick random
                            randomIndex = Math.floor(Math.random() * currentIndex);
                            //make 0 if array bigger than 3
                            if(answers.length >= 3) {
                                currentIndex = 0;
                            }else{
                                currentIndex --;
                            }
                            //push to array
                            answers.push({
                                answer: incorrectAnswers[randomIndex],
                                isCorrect: false
                            });
                            //remove from incorrect answers
                            incorrectAnswers.splice(randomIndex, 1);
                        }

                        //push to data
                        this.data.push({
                            question: res.question,
                            answers: answers
                        })
                    }

                    if(this.data.length === 20){
                        this.tab ++;
                    }
                },
                err => {
                    console.log(err.response.data);
                }
            )
        },
        exitGame(clean) {
            if(clean){
                this.tab = 0;
                this.score = 0;
                this.category = "";
            }
        },
        nextQuestion(number) {
            if(number > 20) {
                this.gameFinished = true;
            } else if(this.tab === number) {
                this.tab ++;
            }
        },
        countPoints(point) {
            this.score += point;
        }
    },
}
</script>

<style scoped lang="scss">

</style>