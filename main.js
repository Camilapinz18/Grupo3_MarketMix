const app = new Vue({
    el: "#app",
    data: {
        numAdivinar: 1987,
        adivinar: '',
        intentos: 7,
        resultadoMensaje: '',
        mostrarForm: false,
        mostrarMensaje: false,
        nombreJugador: '',
        resultados: []
  
    },
    methods: {
        comprobaAdivi() {
            if (this.adivinar == this.numAdivinar) {
              this.resultadoMensaje = "Felicidades, adivinaste el número";
              this.mostrarForm = true;
              this.mostrarMensaje = true;
            } else if (this.intentos > 1) {
              this.intentos--;
              this.resultadoMensaje = "Incorrecto, intenta de nuevo";
              this.mostrarMensaje = true;
            } else {
              this.resultadoMensaje = "Se acabaron los intentos";
              this.mostrarForm = true;
              this.mostrarMensaje = true;
            }
          },
          guardarResultados() {
            this.resultados.push({ nombre: this.nombreJugador, intentos: 8 - this.intentos });
            localStorage.setItem('resultados', JSON.stringify(this.resultados));
            this.reiniciarJuego();
          },
          reiniciarJuego() {
            this.adivinar = '';
            this.intentos = 7;
            this.resultadoMensaje = '';
            this.mostrarForm = false;
            this.nombreJugador = '';
          },
          subida() {
            if (localStorage.getItem('resultados')) {
              this.resultados = JSON.parse(localStorage.getItem('resultados'));
            }
          }
    }
  });