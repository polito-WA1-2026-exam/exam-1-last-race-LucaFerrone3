import { isLoggedIn } from "../service/auth.js";
import express from "express";
import GameService from "../service/games.js";

const router = express.Router();

router.get(
    "/",
    isLoggedIn,
    async (req, res) => {
        try{
            const games = await GameService.getResultsById(req.user.id);
            return res.status(200).json(games);
        }catch(err){
            return res.status(500).json({ error: err.message });
        }
    }
);


export default router;
