<template>
    <main>
        <b-button varian="danger" @click="exitGame" v-if="tab > 0">Quit</b-button>
        <Dashboard v-if="tab === 0" @clicked="changeTab"/>
        <div class="tab" v-for="q in questions" :key="q">
            <QuestionsVue v-if="tab > 0 && tab === q" @next="nextQuestion" :number="tab" />
        </div>

        <EndGameVue v-if="tab > 20" />
    </main>   
</template>

<script>
import Dashboard from "../components/game/Dashboard.vue"
import QuestionsVue from "../components/game/Questions.vue"
import EndGameVue from "../components/game/EndGame.vue"

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
            console.log(selected);
            this.tab ++;
        },
        exitGame() {
            this.tab = 0;
            this.score = 0;
        },
        nextQuestion(number) {
            if(number > 20) {
                this.gameFinished = true;
            } else if(this.tab === number) {
                this.tab ++;
            }
        }
    },
}
</script>

<style lang="sass">

    
</style>