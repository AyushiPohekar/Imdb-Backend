import express from "express";
import { createProducer, deleteProducer, getAllProducers, getProducerById } from "../controllers/producerController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";



//router object
const router = express.Router();


router.get("/",getAllProducers);
router.get("/:id",getProducerById);
router.delete("/:id",requireSignIn,deleteProducer);
router.post("/",requireSignIn,createProducer);


 export default router;
