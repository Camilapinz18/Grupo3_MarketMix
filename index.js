const app = Vue.createApp({
  data() {
    return {
      arrayDatos: [
        {
          id: 1,
          nombre: "Pepito",
          año: 1967,
        },
        {
          id: 2,
          nombre: "Andrea",
          año: 1876,
        },
        {
          id: 3,
          nombre: "Carlos",
          año: 2001,
        },
        {
          id: 4,
          nombre: "Maria",
          año: 1997,
        },
        {
          id: 5,
          nombre: "Pedro",
          año: 1912,
        },
      ],
      añoIngresado: null,
      añoAleatorio: null,
      diferencia: null,
      pistas: [
        { diferencia: 1, periodo: "año" },
        { diferencia: 2, periodo: "bienio" },
        { diferencia: 3, periodo: "trienio" },
        { diferencia: 4, periodo: "cuatrienio" },
        { diferencia: 5, periodo: "lustro" },
        { diferencia: 6, periodo: "sexenio" },
        { diferencia: 7, periodo: "septenio" },
        { diferencia: 8, periodo: "octenio" },
        { diferencia: 9, periodo: "novenio" },
        { diferencia: 10, periodo: "decada" },
        { diferencia: 11, periodo: "oncenio" },
        { diferencia: 12, periodo: "docenio" },
        { diferencia: 20, periodo: "dicenio" },
        { diferencia: 50, periodo: "decalustro" },
        { diferencia: 60, periodo: "dodecalustro" },
        { diferencia: 100, periodo: "siglo" },
        { diferencia: 1000, periodo: "milenio" },
      ],
      isInicioJuego: false,
      isAdivinarAño: false,
      isTablaResultados: false,
      numAdivinar: 1987,
      adivinar: "",
      intentos: 7,
      resultadoMensaje: "",
      mostrarForm: false,
      mostrarMensaje: false,
      nombreJugador: "",
      resultados : JSON.parse(localStorage.getItem("resultados"))
    };
  },

  methods: {
    alCargarPagina() {
      localStorage.setItem("arrayData", JSON.stringify(this.arrayDatos));
      localStorage.setItem('resultados', localStorage.getItem("resultados"));
      this.isInicioJuego = true; 
    },
    /*************** */
    registroAleatorio() {
      if (this.resultados === null){
        this.resultados = []
      }
      this.resultados.push({ nombre: this.nombreJugador, intentos: "" });
      localStorage.setItem("resultados", JSON.stringify(this.resultados));
      const maximo = this.arrayDatos.length - 1;
      const numero = Math.round(Math.random() * maximo);
      this.añoAleatorio = this.arrayDatos[numero].año;
      console.log("Año aleatorio", this.añoAleatorio);
      localStorage.setItem("añoAleatorio", JSON.stringify(this.añoAleatorio));
      this.isAdivinarAño = true;
      this.isInicioJuego = false;
    },
    verificarAño() {
      console.log("Veriricar año");
      if(this.añoIngresado<=1000){
        Swal.fire('Recuerde seleccionar un año mayor al año 1000 DC');
        return
      }
      if(this.añoIngresado>2023){
        Swal.fire('Es imposible que alguien ya haya nacido después del 2023');
        return
      }
      if (this.añoIngresado != this.añoAleatorio) {
        
        this.diferencia = Math.abs(this.añoIngresado - this.añoAleatorio);

        if (this.añoIngresado < this.añoAleatorio) {
          this.diferencia = Math.abs(this.añoIngresado - this.añoAleatorio);
        } else if (this.añoIngresado > this.añoAleatorio) {
          this.diferencia = Math.abs(this.añoIngresado - this.añoAleatorio);
        }
        this.intentos--;
      } else {
        this.diferencia = Math.abs(this.añoIngresado - this.añoAleatorio);
        this.intentos--;
        // alert('Has acertado!')
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Has acertado!",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.removeItem("añoAleatorio");

        this.isAdivinarAño = false;
        this.isTablaResultados = true;
      } 
      if(this.intentos === 0){
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Has perdido!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.intentos = 7;
        this.nombreJugador = '';
        this.isTablaResultados = false;
        this.isInicioJuego=true;
        this.isAdivinarAño=false
        
      }
      const localResultados = JSON.parse(localStorage.getItem("resultados"));
      const jugador = localResultados.find(
        (j) => j.nombre === this.nombreJugador
      );
      const jugadorLocal = this.resultados.find(
        (j) => j.nombre === this.nombreJugador
      );
      const objeto = {
        nombre: jugador.nombre,
        intentos: 7 - this.intentos,
      };
      Object.assign(jugador, objeto);
      Object.assign(jugadorLocal, objeto);
      console.log("JUGADOR", jugador);
      localStorage.setItem("resultados", JSON.stringify(localResultados));

      this.añoIngresado = "";
      this.devolverPista();
      
    },
    mostrarResultados(){
      this.isInicioJuego=false
      this.isTablaResultados=true
    },
    reiniciarJuego() {
      this.intentos = 7;
      this.nombreJugador = '';
      this.isTablaResultados = false;
      this.isInicioJuego=true
    },
    
    devolverPista() {
      
      for (let i = 0; i < this.pistas.length; i++) {
        if (this.diferencia === this.pistas[i].diferencia) {
          //   alert(`Hay una diferencia de un ${this.pistas[i].periodo}`)
          Swal.fire(
            "¿Quieres una pista?",
            `Hay una diferencia de un ${this.pistas[i].periodo}`,
            "question"
          );
        } else if (
          this.diferencia > this.pistas[i].diferencia &&
          this.diferencia < this.pistas[i + 1].diferencia
        ) {
          //   alert(`Hay una diferencia de mas de un ${this.pistas[i].periodo}`)
          Swal.fire(
            "¿Quieres una pista?",
            `Hay una diferencia de mas de un ${this.pistas[i].periodo}`,
            "question"
          );
        }
      }
    },
  },

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
  created: function () {
    this.alCargarPagina();
  },
});

app.mount("#app");
