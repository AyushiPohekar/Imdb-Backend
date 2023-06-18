


import mongoose from "mongoose";
import colors from "colors";
import { data } from "../data.js/MovieData.js";
import movieModel from "../models/movieModel.js";
import producerModel from "../models/producerModel.js";
import actorModel from "../models/actorModel.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB Database ${conn.connection.host}`.bgMagenta.white
    );

    // Iterate over the data array
    for (const jsonObject of data) {
      // Check if the document with the same unique identifier already exists
      const existingMovie = await movieModel.findOne({
        uniqueIdentifier: jsonObject.movie.uniqueIdentifier,
      });

      // If the document already exists, skip saving
      if (existingMovie) {
        console.log(
          `Data already exists for: ${jsonObject.movie.original_title}`
        );
        continue;
      }

      // Create and save the new documents
      const producer = new producerModel(jsonObject.producer);
      await producer.save();

      const movie = new movieModel(jsonObject.movie);
      movie.producer = producer._id;

      const actorReferences = [];

      for (const actorData of jsonObject.actors) {
        const actor = new actorModel(actorData);
        actor.movies.push(movie._id);
        await actor.save();
        actorReferences.push(actor._id);
      }

      movie.actors = actorReferences;
      await movie.save();

      producer.movies.push(movie._id);
      await producer.save();

      console.log('Data saved for:', jsonObject.movie.original_title);
    }

    console.log('All data saved successfully');
  } catch (error) {
    console.log(`Error in MongoDB: ${error}`.bgRed.white);
  }
};

export default connectDB;
