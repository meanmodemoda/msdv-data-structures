/*global Vue */
/*global fetch*/

import filmBlock from './component.js'


const app = Vue.createApp({
  components: {
    filmBlock
  },
  data: 
   function (){
    return {
      films: [],
      searchQuery: null,
      searchQueryInput: ''
      }
  },
  
  methods: {
    searchFilms: function (event) {
      console.log(event);
      event.preventDefault();
      this.searchQuery = this.searchQueryInput;
    },
    
    reset(){
      this.searchQuery = null;
    }
  },
  
  computed: {
    resultQuery(){
      if(this.searchQuery){
      return this.films.filter((film)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => (film.title.toLowerCase().includes(v))||
        (film.description.toLowerCase().includes(v)))
      })
      }else{
        return this.films;
      }
    }
  },
  
 mounted () {
   fetch('https://ghibliapi.herokuapp.com/films')
   .then (response => response.json())
   .then (json => {
     this.films=json;
     
   })
 }
  
})


app.mount('#app')