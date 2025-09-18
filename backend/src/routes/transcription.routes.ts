import { Router } from "express";
import { createTranscription, getAllTranscriptions } from "../controllers/transcription.controller";

const router = Router();

router.post("/", createTranscription);
router.get("/", getAllTranscriptions);

export default router;