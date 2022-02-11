# Questionary game

This application is an simple Vue application which using VueJS as JS framework and API calls from fetching questions

# Components:

- Game components:
  - Dashboard: Main page of the application which displaying rules of the game and questions. Component is passing selected question the Game view in order to fetch selected questions;
  - EndGame: Last page of the application which displaying information about user's score;
  - Questions: Component used to display question from array list and show to user which of the question is correct. Questions is using Timer component which displaying time left to user;
    Times: Timer component which displaying information about current time to user.

# Views:

- App: Main view of the application
- Game: Main view of the game which rendering dashboard, endgame and questions components depending on user input

# Others:

- store/user.service - fetching information from API and returning data to caller.
