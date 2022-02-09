<template>
    <b-container>
        <p class="question" @mouseover="showRules = true" @mouseleave="showRules = false">?</p>
        <p class="rules" v-if="showRules">
            This game is best out of 20. Select any category and answer all of the questions within 30s each. If you manage to get 20 questions right you win!
        </p>
        <h2>Quiz game</h2>
        <h4>Please select the category below:</h4>
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <p class="error" v-if="error !== ''">{{error}}</p>
        <b-button variant="success" @click="startGame">Start Game</b-button>
    </b-container>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            selected: "",
            options: [
                {value: null, text: "Please select one of the categories"},
                {value: "all", text: "All"},
                {value: "food_and_drink", text: "Food and drink"},
                {value: "geography", text: "Geography"},
                {value: "general_knowledge", text: "General Knowledge"},
                {value: "literature", text: "Art and Literature"},
                {value: "movies", text: "Movies"},
                {value: "history", text: "History"},
                {value: "music", text: "Music"},
                {value: "science", text: "Science"},
                {value: "society_and_culture", text: "Society and Culture"},
                {value: "sport_and_leisure", text: "Sport and Leisure"},
            ],
            error: "",
            showRules: false
        }
    },
    methods: {
        startGame() {
            if(this.selected === "") {
                return this.error = "Please select one of the category before starting the game"
            } else {
                this.$emit("clicked", this.selected);
            }
        }
    },
}
</script>

<style scoped lang="scss">
    @keyframes animate_title {
        0% { transform: scale(1); }
        50% { transform: scale(1.5); }
        100% { transform: scale(1); }
    }
    .container{
        position: absolute;
        background-color: lightcyan;
        border-radius: 30px;
        width: 60%;
        height: 50vh;
        top: 25vh;
        left: 20%;

        h2 {
            color: white;
            margin-top: 10px;
            font-size: 42px;
            font-weight: 900px;
            letter-spacing: 2px;
            text-shadow: 1px 1px 10px black;
            font-family: italic;
            background: rgba(255, 253, 160, 1);
            background: -webkit-linear-gradient( left, #a57a42 0%, #be5e10 25%, #be4f22 50%, #ff1e00 100%) repeat;
            -webkit-background-clip: text;
            -ms-background-clip: text;
            -moz-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            -ms-text-fill-color: transparent;
            -moz-text-fill-color: transparent;
            text-fill-color: transparent;
            animation-name: masked-animation;
            animation-duration: 50s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }

        h4 {
            margin-top: 20px;
        }

        select {
            cursor: pointer;
            margin-top: 10vh;
            border-radius: 30px;
        }

        button {
            width: 120px;
            position: absolute;
            bottom: 20px;
            left: calc(50% - 60px);
        }
    }

    .error {
        color: red;
    }

    .rules {
        position: absolute;
        width: 150px;
        right: 2%;
        top: 40px;
        background-color: gray;
        padding: 10px;
        border-radius: 30px;
        color: white;
        box-shadow: 2px 2px 15px black;
        transition: .3s;
        animation-name: animate-rules;
        animation-duration: 1s;
        animation-iteration-count: 1;
        animation-timing-function: linear;
    }

    .question {
        font-size: 20px;
        position: absolute;
        right: 5%;
        top: 10px;
        color: red;
        cursor: pointer;
        transition: .3;

        &:hover {
            font-size: 26;
            font-weight: 700;

            & ~ .rules {
                display: relative;
            }
        }
    }

@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -8000px -3000px;
  }
}

@keyframes animate-rules {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>