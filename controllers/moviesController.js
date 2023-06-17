import axios from "axios";



//  TMDB API key 
const apiKey = process.env.API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';


// Function to fetch the top 20 movies
async function fetchTopMovies() {
    const url = `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&include_adult=false&page=1&language=en-US`;
    const response = await axios.get(url);
    const movies = response.data.results;
   console.log(movies) ;
  }

  export default fetchTopMovies;
  