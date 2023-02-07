const app = new Vue({
    el: "#app",
    data: {
        numberToGuess: 1987,
        guess: '',
        attempts: 7,
        resultMessage: '',
        showForm: false,
        playerName: '',
        results: []
  
    },
    methods: {
        checkGuess() {
            if (this.guess == this.numberToGuess) {
              this.resultMessage = "Felicidades, adivinaste el número";
              this.showForm = true;
            } else if (this.attempts > 1) {
              this.attempts--;
              this.resultMessage = "Incorrecto, intenta de nuevo";
            } else {
              this.resultMessage = "Se acabaron los intentos";
              this.showForm = true;
            }
          },
          saveResult() {
            this.results.push({ name: this.playerName, attempts: 7 - this.attempts });
            localStorage.setItem('results', JSON.stringify(this.results));
            this.resetGame();
          },
          resetGame() {
            this.guess = '';
            this.attempts = 7;
            this.resultMessage = '';
            this.showForm = false;
            this.playerName = '';
          },
          mounted() {
            if (localStorage.getItem('results')) {
              this.results = JSON.parse(localStorage.getItem('results'));
            }
          }
    }
  });