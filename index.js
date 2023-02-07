const app = Vue.createApp({
  data () {
    return {
      arrayDatos: [
        {
          id: 1,
          nombre: 'Pepito',
          año: 1967
        },
        {
          id: 2,
          nombre: 'Andrea',
          año: 1876
        },
        {
          id: 3,
          nombre: 'Carlos',
          año: 2001
        },
        {
          id: 4,
          nombre: 'Maria',
          año: 1997
        },
        {
          id: 5,
          nombre: 'Pedro',
          año: 1912
        }
      ],
      añoIngresado: null,
      añoAleatorio: null,
      diferencia: null,
      pistas: [
        { diferencia: 1, periodo: 'año', pista: '(1 / 1)' },
        { diferencia: 2, periodo: 'bienio', pista: '((1 + 1) * 1)' },
        { diferencia: 3, periodo: 'trienio', pista: '((1 + 2) * 1)' },
        { diferencia: 4, periodo: 'cuatrienio', pista: '((6 / 2) + (2 / 2))' },
        { diferencia: 5, periodo: 'lustro', pista: '(x + 2 = 7)' },
        { diferencia: 6, periodo: 'sexenio', pista: '(x - 2 = 4)' },
        { diferencia: 7, periodo: 'septenio', pista: '(x + 6 = 13)' },
        { diferencia: 8, periodo: 'octenio', pista: '(x + 7 = 15)' },
        { diferencia: 9, periodo: 'novenio', pista: '(x / 2 = 4.5)' },
        { diferencia: 10, periodo: 'decada', pista: '(4 * 2 + 2)' },
        { diferencia: 11, periodo: 'oncenio', pista: '(6 * 2 - 1)' },
        { diferencia: 12, periodo: 'docenio', pista: '((4 * 3)/1)' },
        { diferencia: 20, periodo: 'dicenio', pista: '( ( (15 + 5) / 2 ) * 2 )' },
        { diferencia: 50, periodo: 'decalustro', pista: '( ( (10 * 5) + 10) - 10)' },
        { diferencia: 60, periodo: 'dodecalustro', pista: '(x - 2 = 58)' },
        { diferencia: 100, periodo: 'siglo', pista: '(x + 99 = 199)' },
        { diferencia: 1000, periodo: 'milenio', pista: '(x - 2 = 998)' }
      ],
      isInicioJuego: false,
      isAdivinarAño: false,
      isTablaResultados: false,

      adivinar: '',
      intentos: 7,
      resultadoMensaje: '',
      mostrarForm: false,
      mostrarMensaje: false,
      nombreJugador: '',
      resultados: []
    }
  },

  methods: {
    alCargarPagina () {
      localStorage.setItem('arrayData', JSON.stringify(this.arrayDatos))
      localStorage.setItem('resultados', localStorage.getItem('resultados'))
      // || localStorage.setItem('resultados', JSON.stringify(this.resultados))
      this.isInicioJuego = true
    },
    /*************** */
    registroAleatorio () {
      this.resultados.push({ nombre: this.nombreJugador, intentos: '' })
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
      const maximo = this.arrayDatos.length - 1
      const numero = Math.round(Math.random() * maximo)
      this.añoAleatorio = this.arrayDatos[numero].año
      console.log('Año aleatorio', this.añoAleatorio)
      localStorage.setItem('añoAleatorio', JSON.stringify(this.añoAleatorio))
      this.isAdivinarAño = true
      this.isInicioJuego = false
    },
    verificarAño () {
      console.log('Veriricar año')
      if (this.añoIngresado <= 1000) {
        Swal.fire('Recuerde seleccionar un año mayor al año 1000 DC')
        return
      }
      if (this.añoIngresado > 2023) {
        Swal.fire('Es imposible que alguien ya haya nacido después del 2023')
        return
      }
      if (this.añoIngresado != this.añoAleatorio) {
        this.diferencia = Math.abs(this.añoIngresado - this.añoAleatorio)

        if (this.añoIngresado < this.añoAleatorio) {
          this.diferencia = Math.abs(this.añoIngresado - this.añoAleatorio)
        } else if (this.añoIngresado > this.añoAleatorio) {
          this.diferencia = Math.abs(this.añoIngresado - this.añoAleatorio)
        }
        this.intentos--
      } else {
        this.diferencia = Math.abs(this.añoIngresado - this.añoAleatorio)
        this.intentos--
        // alert('Has acertado!')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Has acertado!',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.removeItem('añoAleatorio')
        this.añoIngresado = ''
        this.isAdivinarAño = false
        this.isTablaResultados = true
      }
      if (this.intentos === 0) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Has perdido!',
          showConfirmButton: false,
          timer: 1500
        })
        this.intentos = 7
        this.nombreJugador = ''
        this.isTablaResultados = false
        this.isInicioJuego = true
        this.isAdivinarAño = false
        this.añoIngresado = ''
      }
      const localResultados = JSON.parse(localStorage.getItem('resultados'))
      const jugador = localResultados.find(j => j.nombre === this.nombreJugador)
      const jugadorLocal = this.resultados.find(
        j => j.nombre === this.nombreJugador
      )
      const objeto = {
        nombre: jugador.nombre,
        intentos: 7 - this.intentos
      }
      Object.assign(jugador, objeto)
      Object.assign(jugadorLocal, objeto)
      console.log('JUGADOR', jugador)
      localStorage.setItem('resultados', JSON.stringify(localResultados))
      console.log('LOCAL RESULTADOS', localResultados)

      this.devolverPista()
    },
    mostrarResultados () {
      this.isInicioJuego = false
      this.isTablaResultados = true
    },
    reiniciarJuego () {
      this.intentos = 7
      this.nombreJugador = ''
      this.isTablaResultados = false
      this.isInicioJuego = true
    },

    devolverPista () {
      for (let i = 0; i < this.pistas.length; i++) {
        if (this.diferencia === this.pistas[i].diferencia) {
          //   alert(`Hay una diferencia de un ${this.pistas[i].periodo}`)
          Swal.fire(
            '¿Quieres una pista?',
            `Hay una diferencia de un ${this.pistas[i].periodo}.
            Un ${this.pistas[i].periodo}, son ${this.pistas[i].pista} años`,
            'question'
          )
        } else if (
          this.diferencia > this.pistas[i].diferencia &&
          this.diferencia < this.pistas[i + 1].diferencia
        ) {
          //   alert(`Hay una diferencia de mas de un ${this.pistas[i].periodo}`)
          Swal.fire(
            '¿Quieres una pista?',
            `Hay una diferencia de mas de un ${this.pistas[i].periodo}.
            Un ${this.pistas[i].periodo}, son ${this.pistas[i].pista} años.`,
            'question'
          )
        }
      }
    }
  },

  comprobaAdivi () {
    if (this.adivinar == this.numAdivinar) {
      this.resultadoMensaje = 'Felicidades, adivinaste el número'
      this.mostrarForm = true
      this.mostrarMensaje = true
    } else if (this.intentos > 1) {
      this.intentos--
      this.resultadoMensaje = 'Incorrecto, intenta de nuevo'
      this.mostrarMensaje = true
    } else {
      this.resultadoMensaje = 'Se acabaron los intentos'
      this.mostrarForm = true
      this.mostrarMensaje = true
    }
  },
  created: function () {
    this.alCargarPagina()
  }
})

app.mount('#app')
