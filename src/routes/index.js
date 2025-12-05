import express from "express";
import authRoutes from "./auth.routes.js";
import oauthRoutes from "./oauth.routes.js";

const router = express.Router();
router.get('/heartbeat', (req,res, next)=>res.send('heartbeat') )
router.use("/auth", authRoutes);
router.use("/oauth", oauthRoutes);

export default router;