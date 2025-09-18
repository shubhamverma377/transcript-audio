import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import transcriptionRoutes from "./routes/transcription.routes";

dotenv.config();

const app = express();

// ✅ Allow all origins ( * )
app.use(cors({ origin: "*" }));

app.use(express.json());

// Routes
app.use("/api/transcriptions", transcriptionRoutes);

export default app;
