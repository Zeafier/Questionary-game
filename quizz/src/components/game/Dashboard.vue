<template>
    <b-container>
        <h2>Welcome in quiz game</h2>
        <h4>Please select the category below:</h4>
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <p class="error" v-if="error !== ''">{{error}}</p>
        <b-button varian="success" @click="startGame">Start Game</b-button>
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
                {value: "all", text: "All questions"},
                {value: "sport", text: "Sport"},
                {value: "history", text: "History"},
            ],
            error: ""
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
    .container{
        position: absolute;
        background-color: lightcyan;
        border-radius: 30px;
        width: 60%;
        height: 50vh;
        margin-top: 25vh;
        margin-left: 20%;
    }

    .error {
        color: red;
    }
</style>