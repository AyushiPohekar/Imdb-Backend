// Function to generate a unique movieId
const generateUniqueMovieId = () => {

  const timestamp =  Math.floor(new Date().getTime() / 1000);
  return timestamp;
};



//get All movies

import actorModel from "../models/actorModel.js";
import movieModel from "../models/movieModel.js";
import producerModel from "../models/producerModel.js";

export const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel
      .find({})
      .populate("actors")
      .populate("producer");

    res.status(200).send({
      success: true,
      counTotal: movies.length,
      message: "AllMovies ",
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting movies",
      error: error.message,
    });
  }
};

// get single movie
export const getAllMoviesById = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    //console.log(id)

    const movie = await movieModel
      .findOne({movieId: movieId })
      .populate("actors")
      .populate("producer");
    res.status(200).send({
      success: true,
      message: "Single Movie Fetched",
      movie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getitng single movie",
      error,
    });
  }
};

// // POST /movies
export const createMovies=async(req,res)=>{
  try {
    const { genres, original_language, original_title, overview, poster_path, releaseDate, status, vote_average, producer, actors } = req.body;
      // Generate a unique movieId
    const movieId = generateUniqueMovieId();

    // Create the movie object
    const movie = new movieModel({
      movieId,
      genres,
      original_language,
      original_title,
      overview,
      poster_path,
      releaseDate,
      status,
      vote_average,
      actors: [],
      producer: null
    });


    // Save the movie document
    const savedMovie = await movie.save();

    // Iterate through the actors array and add/update actors
    for (const actorData of actors) {
      let actor;

      // Check if actor already exists in the database based on a unique identifier
      const existingActor = await actorModel.findOne({ name: actorData.name });

      if (existingActor) {
        // Update the existing actor document
        actor = existingActor;
        actor.dob = actorData.dob;
        actor.bio = actorData.bio;
        actor.gender = actorData.gender;
      } else {
        // Create a new actor document
        actor = new actorModel({
          name: actorData.name,
          gender :actorData.gender,
          dob: actorData.dob,
          bio: actorData.bio,
          
        });
      }

      // Add the movie reference to the actor document
      actor.movies.push(savedMovie._id);

      // Save the actor document
      await actor.save();

      // Add the actor reference to the movie document
      savedMovie.actors.push(actor._id);
    }

    // Check if the producer already exists in the database based on a unique identifier
    const existingProducer = await producerModel.findOne({ name: producer.name });
    let producerDocument;

    if (existingProducer) {
      // Update the existing producer document
      producerDocument = existingProducer;
      producerDocument.gender = producer.gender;
      producerDocument.dob = producer.dob;
      producerDocument.bio = producer.bio;
    } else {
      // Create a new producer document
      producerDocument = new producerModel({
        name: producer.name,
        gender:producer.gender,
        dob: producer.dob,
        bio: producer.bio
      });
    }

    // Add the movie reference to the producer document
    producerDocument.movies.push(savedMovie._id);

    // Save the producer document
    await producerDocument.save();

    // Add the producer reference to the movie document
    savedMovie.producer = producerDocument._id;

    // Save the updated movie document with actor and producer references
    await savedMovie.save();

    res.status(201).json({ message: 'Movie created successfully', movie: savedMovie });
  
  
  
  
  
  } catch (error) {
    console.log(error)
  }
}

export const deleteMovieController = async (req, res) => {
  const movieId = req.params.movieId;

  try {
    // Find the movie to be deleted
    const movie = await movieModel.findOne({movieId:movieId});
   console.log(movie)
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Remove movie reference from actors
    await actorModel.updateMany(
      { movies: movie._id },
      { $pull: { movies: movie._id} }
    );

    // Remove movie reference from producer
    await producerModel.updateMany(
      { movies: movie._id },
      { $pull: { movies: movie._id} }
    );

    // Delete the movie
    await movieModel.deleteOne({ _id: movie._id });

    return res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
  console.log(error)
  }
};

const updateMovieController = async (req, res) => {
  const movieId = req.params.movieId;
  const updates = req.body;

  try {
    // Find the movie to be updated
    const movie = await movieModel.findOne({movieId:movieId});

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Update the movie with the new data
    const updatedMovie = await movieModel.findByIdAndUpdate(
      movie._id,
      updates,
      { new: true }
    );

    return res.status(200).json({ movie: updatedMovie });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default updateMovieController;

