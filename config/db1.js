// import mongoose from "mongoose";
// import colors from "colors";
// import axios from "axios";
// import actorModel from "../models/actorModel.js";
// import producerModel from "../models/producerModel.js";
// import movieModel from "../models/movieModel.js";
// import dotenv from "dotenv";
// dotenv.config();
// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// // Set your TMDB API key and base URL
// const apiKey = "6c868c3f8804d01597b948783258486d"; // Replace 'YOUR_API_KEY' with your actual TMDB API key
// const baseUrl = "https://api.themoviedb.org/3";

// async function fetchMovieDetails(movieId) {
//   try {
//     const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`;
//     const response = await axios.get(url);
//     if (response.data && response.data.credits) {
//     console.log(response.data) ;
//     } else {
//       throw new Error("Unable to fetch movie details or credits.");
//     }
//   } catch (error) {
//     console.error("Error fetching movie details:", error.message);
//     throw error;
//   }
// }


// // Function to fetch the top 20 movies
// async function fetchTopMovies() {
//   const url = `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&include_adult=false&page=1&language=en-US`;
//   const response = await axios.get(url);
//   const movies = response.data.results.slice(0, 20);
//   return movies;
// }

// // Function to store movies, actors, and producers in MongoDB
// async function storeMoviesActorsProducers() {
//   try {
//     const movies = await fetchTopMovies();
   
//     for (let movie of movies) {
//       //console.log(movie)
//       const movieDetails = await fetchMovieDetails(movie.id);

//       const movieActors = [];
//       for (const actorInfo of movieDetails.credits.cast) {
//         const actor = await actorModel.findOne({ name: actorInfo.name });
//         if (actor) {
//           movieActors.push(actor._id);
//         } else {
//           const newActor = new actorModel({
//             name: actorInfo.name,
//             gender: actorInfo.gender,
//             dob:  "1990-01-01T00:00:00.000Z", // Set a default value if dob is missing
//             bio:  "hello", // Set a default value if bio is missing
//           });
          
//           await newActor.save();
//           movieActors.push(newActor._id);
//         }
//       }

//       const movieProducers = [];
//       for (const producerInfo of movieDetails.credits.crew) {
//         if (producerInfo.job === "Producer") {
//           const producer = await producerModel.findOne({ name: producerInfo.name });
//           if (producer) {
//             movieProducers.push(producer._id);
//           } else {
//             const newProducer = new producerModel({
//               name: producerInfo.name,
//               gender: producerInfo.gender,
//               dob:  "1990-01-01T00:00:00.000Z", // Set a default value if dob is missing
//               bio:  "hello",
//               moviesProduced: [],
//             });
//             await newProducer.save();
//             movieProducers.push(newProducer._id);
//           }
//         }
//       }

//       const newMovie = new movieModel({
//         title: movie.title,
//         actors: movieActors,
//         producer: movieProducers,
//         yearOfRelease:movie.release_date,

//       });

//       await newMovie.save();

//       // Update moviesProduced field in producer documents
//       await producerModel.updateMany(
//         { _id: { $in: movieProducers } },
//         { $push: { moviesProduced: newMovie._id } }
//       );
//     }

//     console.log("Movies, actors, and producers stored in MongoDB successfully!");
//     db.close();
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// }

// // Call the storeMoviesActorsProducers function to fetch and store movies, actors, and producers in MongoDB
// storeMoviesActorsProducers();

// export default storeMoviesActorsProducers;







