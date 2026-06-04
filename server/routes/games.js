import { isLoggedIn } from "../service/auth.js";
import express from "express";
import GameService from "../service/games.js";
import ValidationError from '../errors/ValidationError.js';

const router = express.Router();

router.get(
    "/",
    isLoggedIn,
    async (req, res) => {
        try{
            const games = await GameService.getResultsById(req.user.user_id);
            return res.status(200).json(games);
        }catch(err){
            return res.status(500).json({ error: err.message });
        }
    }
);

router.post(
    "/result",
    isLoggedIn,
    async (req, res) => {
        try{
            const games = await GameService.createGame(req.user.user_id, req.body);
            return res.status(201).json(games);
        }catch(err){

            if(err instanceof ValidationError){
                return res.status(400).json({ error: err.message });
            }

            return res.status(500).json({ error: err.message });
        }
    }
);


export default router;
