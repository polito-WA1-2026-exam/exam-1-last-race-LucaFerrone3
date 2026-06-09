import { isLoggedIn } from "../service/auth.js";
import express from "express";
import passport from "passport";
import UserService from "../service/users.js";
import ValidationError from '../errors/ValidationError.js';

const router = express.Router();

router.post(
    "/register",
    async (req, res) => {
        try{
            const user = await UserService.createUser(req.body);
            return res.status(201).json(user);
        }catch(err){
            if(err instanceof ValidationError) return res.status(409).json({ error: err.message });


            return res.status(500).json({ error: err.message });
        }
    }
);

router.post("/login", (req, res, next) => {

    passport.authenticate(
        "local",
        (err, user, info) => {

            if (err)
                return res.status(500).json({
                    error: err.message
                });

            if (!user)
                return res.status(400).json({
                    error: info.message
                });

            req.login(user, (err) => {

                if (err)
                    return res.status(500).json({
                        error: err.message
                    });

                return res.status(200).json(user);

            });

        }
    )(req, res, next);

});

router.delete("/logout", isLoggedIn, (req, res, next) => {

    req.logout((err) => {
        if (err) return next(err);
        res.end();
    });

});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  res.status(401).json({ error: "Not authenticated" });
});

export default router;
