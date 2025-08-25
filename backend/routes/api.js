import express from "express";
import { shortenUrl, listAll } from "../controllers/urlController.js";

const router = express.Router();

// POST /api/shorten → create short code
router.post("/shorten", shortenUrl);

// GET /api/all → list all (bonus)
router.get("/all", listAll);

export default router;