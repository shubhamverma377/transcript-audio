import { Request, Response } from "express";
import * as transcriptionService from "../services/transcription.service";

export const createTranscription = async (req: Request, res: Response) => {
  try {
    const { audioUrl } = req.body;
    if (!audioUrl) return res.status(400).json({ error: "audioUrl is required" });

    const record = await transcriptionService.createTranscription({ audioUrl });
    res.status(201).json({ id: record._id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllTranscriptions = async (_req: Request, res: Response) => {
  try {
    const records = await transcriptionService.getAllTranscriptions();
    res.json(records);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};