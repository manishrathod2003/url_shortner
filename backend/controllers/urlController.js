import Url from "../models/Url.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 6);

export const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: "URL required" });

    // if same URL exists, return existing to avoid duplicates (optional)
    let existing = await Url.findOne({ originalUrl });
    if (existing) {
      const base = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
      return res.json({ shortUrl: `${base}/${existing.shortCode}`, shortCode: existing.shortCode });
    }

    const shortCode = nanoid();
    const created = await Url.create({ originalUrl, shortCode });

    const base = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    res.json({ shortUrl: `${base}/${created.shortCode}`, shortCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const url = await Url.findOne({ shortCode: shortcode });
    if (!url) return res.status(404).send("Short URL not found");

    url.clicks++;
    await url.save();
    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Bonus: list all with counts
export const listAll = async (_req, res) => {
  try {
    const list = await Url.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};