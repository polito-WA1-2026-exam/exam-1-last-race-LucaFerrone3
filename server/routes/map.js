import express from "express";
import {MapService} from "../service/map.js";

const router = express.Router();

router.get(
    "/",
    async (req, res) => {
        try{
            const map = await MapService.getMap();
            return res.status(200).json(map);
        }catch(err){
            return res.status(500).json({ error: err.message });
        }
    }
);


export default router;
