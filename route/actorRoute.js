import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { addActorToMovie, createActor, deleteActor, getActorById, getAllActors } from "../controllers/actorControllers.js";


//router object
const router = express.Router();

router.get("/",getAllActors);
router.get("/:id",getActorById);
router.delete("/:id",requireSignIn,deleteActor);
router.post("/",requireSignIn,createActor);
router.post("/movies/:movieId/actors/:actorId",requireSignIn,addActorToMovie);




 export default router;