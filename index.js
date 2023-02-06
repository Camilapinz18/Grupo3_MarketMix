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
        { diferencia: 2, periodo: 'bienio' },
        { diferencia: 3, periodo: 'trienio' },
        { diferencia: 4, periodo: 'cuatrienio' },
        { diferencia: 5, periodo: 'lustro' },
        { diferencia: 6, periodo: 'sexenio' },
        { diferencia: 7, periodo: 'septenio' },
        { diferencia: 8, periodo: 'octenio' },
        { diferencia: 9, periodo: 'novenio' },
        { diferencia: 10, periodo: 'decada' },
        { diferencia: 11, periodo: 'oncenio' },
        { diferencia: 12, periodo: 'docenio' },
        { diferencia: 20, periodo: 'dicenio' },
        { diferencia: 50, periodo: 'decalustro' },
        { diferencia: 60, periodo: 'dodecalustro' },
        { diferencia: 100, periodo: 'siglo' },
        { diferencia: 1000, periodo: 'milenio' }
      ]
    }
  },

  methods: {
    registroAleatorio () {
      const maximo = this.arrayDatos.length - 1
      const numero = Math.round(Math.random() * maximo)
      this.añoAleatorio = this.arrayDatos[numero].año
      console.log('Numero', this.añoAleatorio)
    },
    verificarAño () {
      // this.añoIngresado

      if (this.añoIngresado != this.añoAleatorio) {
        this.diferencia = Math.abs(this.añoIngresado - this.añoAleatorio)
        console.log('Es distinto', this.diferencia)

        if (this.añoIngresado < this.añoAleatorio) {
          this.diferencia = Math.abs(this.añoIngresado - this.añoAleatorio)
          console.log('Es menor', this.diferencia)
        } else if (this.añoIngresado > this.añoAleatorio) {
          this.diferencia = Math.abs(this.añoIngresado - this.añoAleatorio)
          console.log('Es mayor', this.diferencia)
        }
      } else {
        console.log('Es igual')
      }

      this.añoIngresado = ''

      this.devolverPista()
    },
    devolverPista () {
      this.pistas.map(pista => {
        pista.diferencia === this.diferencia
          ? alert(`Hay una diferencia de un ${pista.periodo}`)
          : null
      })
    }
  },
  created: function () {
    // this.onLoadPage()
  }
})

app.mount('#app')
