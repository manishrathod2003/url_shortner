import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import apiRoutes from "./routes/api.js";
import { redirectUrl } from "./controllers/urlController.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
const MONGO_URI = process.env.MONGO_URI || "";
if (!MONGO_URI) {
  console.error("Missing MONGO_URI in environment!");
  process.exit(1);
}
mongoose.connect(MONGO_URI).then(() => {
  console.log("MongoDB Connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// API routes (for creating/listing short URLs)
app.use("/api", apiRoutes);

// Redirect route must be at root: GET /:shortcode
app.get("/:shortcode", redirectUrl);

// Health check
app.get("/", (req, res) => {
  res.json({ ok: true, message: "URL Shortener backend running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));