import actorModel from "../models/actorModel.js";
import movieModel from "../models/movieModel.js";
import producerModel from "../models/producerModel.js";

export const getAllProducers = async (req, res) => {
  try {
    const producers = await producerModel.find({}).populate("movies");
    res.status(200).send({
      success: true,
      counTotal: producers.length,
      message: "AllProducers ",
      producers,
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
export const getProducerById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const producer = await producerModel.findOne({ _id: id }).populate("movies");
    res.status(200).send({
      success: true,
      message: "Single Producer Fetched",
      producer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getitng single producer",
      error,
    });
  }
};

//delete actor
export const deleteProducer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProducer = await producerModel.findByIdAndDelete(id);

    if (!deletedProducer) {
      return res.status(404).json({ error: "Producer not found" });
    }

    res.status(200).json({ message: "Producer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete producer" });
  }
};

export const createProducer = async (req, res) => {
  try {
    const { name,gender,dob,bio,movies} = req.body;

    const newActor = new actorModel({
      name,
      gender,
      dob,
      bio,
      movies,
    });

    const createdProducer = await newProducer.save();

    res.status(201).json({ producer:createProducer });
  } catch (error) {
    res.status(500).json({ error: "Failed to create actor" });
  }
};

