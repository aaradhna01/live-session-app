import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import pool from "./db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ API: Create Session
app.post("/api/session", async (req, res) => {
  try {
    const unique_id = uuidv4();
    const type = "live";
    const userurl = `http://localhost:5173/session/${unique_id}`;

    const result = await pool.query(
      "INSERT INTO live_sessions (type, unique_id, userurl) VALUES ($1, $2, $3) RETURNING *",
      [type, unique_id, userurl]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating session");
  }
});

// ✅ API: Get Session by ID
app.get("/api/session/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM live_sessions WHERE unique_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Session not found");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching session");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Backend running on port ${process.env.PORT}`);
});
