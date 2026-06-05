import { isLoggedIn } from "../service/auth.js";
import express from "express";
import EventService from "../service/events.js";

const router = express.Router();

router.get(
    "/",
    isLoggedIn,
    async (req, res) => {
        try{
            const steps = req.query.steps;
            if (!steps ) return res.status(400).json({ error: "Missing steps query parameter" });
            if (steps <= 0) return res.status(400).json({ error: "Steps query parameter must be positive" });
            if (isNaN(steps)) return res.status(400).json({ error: "Steps query parameter must be a number" });
            const events = await EventService.getEvents(steps);
            return res.status(200).json(events);
        }catch(err){
            return res.status(500).json({ error: err.message });
        }
    }
);


export default router;
