/* mapbox global */
//mapbox setup

mapboxgl.accessToken = 'pk.eyJ1IjoibWVhbm1vZGVtb2RhIiwiYSI6ImNrd2duY203YzBxaDQyeHA4YmNqOWk4dWQifQ.p3OGSJeE4eG9XEkDwXEoxw';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/meanmodemoda/ckwgsd5uk04cs14o9pjd72is7', // style URL
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});

