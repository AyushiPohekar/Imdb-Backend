import actorModel from "../models/actorModel.js";
import movieModel from "../models/movieModel.js";

export const getAllActors = async (req, res) => {
  try {
    const actors = await actorModel.find({}).populate("movies");
    res.status(200).send({
      success: true,
      counTotal: actors.length,
      message: "AllActors ",
      actors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting actors",
      error: error.message,
    });
  }
};

// get single movie
export const getActorById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const actor = await actorModel.findOne({ _id: id }).populate("movies");
    res.status(200).send({
      success: true,
      message: "Single Actor Fetched",
      actor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getitng single actor",
      error,
    });
  }
};

//delete actor
export const deleteActor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedActor = await actorModel.findByIdAndDelete(id);

    if (!deletedActor) {
      return res.status(404).json({ error: "Actor not found" });
    }

    res.status(200).json({ message: "Actor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete actor" });
  }
};

export const createActor = async (req, res) => {
  try {
    const { name, gender,dob,bio,movies } = req.body;

    const newActor = new actorModel({
      name,
      gender,
      dob,
      bio,
      movies,
    });

    const createdActor = await newActor.save();

    res.status(201).json({ actor: createdActor });
  } catch (error) {
    res.status(500).json({ error: "Failed to create actor" });
  }
};

// Add an actor to a movie//if I want to add any actor from database
export const addActorToMovie = async (req, res) => {
  try {
    const { movieId, actorId } = req.params;
    const movie = await movieModel.findById(movieId);
    const actor = await actorModel.findById(actorId);

    if (!movie || !actor) {
      return res.status(404).json({ error: "Movie or actor not found" });
    }
    movie.actors.push(actorId);
    await movie.save();
    res.json({ movie });
  } catch (error) {
    res.status(500).json({ error: "Failed to add actor to movie" });
  }
};
