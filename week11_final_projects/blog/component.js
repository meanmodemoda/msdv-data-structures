/*global Vue */
/*global fetch*/


const filmBlock = Vue.defineComponent ({
  name: 'FilmBlock',
  props: ['title','description','rt_score'],
  template: `
    
    <div id="films">
   
    <h2 style="font-family:'Fredoka One';"> {{$props.title}}</h2>
    <p style="color: orange;"><b>Rotten Tomatoes Rating:</b> {{$props.rt_score+'%'}}</p>
    <p>{{$props.description}}</p>
   
    </div>
  `
})

export default filmBlock;