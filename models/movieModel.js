import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  original_language: {
    type: String,
    required: true,
  },
  original_title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
 
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'producers',
   
  },
  actors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'actors'
  }]
});

export default mongoose.model("movies", movieSchema);


