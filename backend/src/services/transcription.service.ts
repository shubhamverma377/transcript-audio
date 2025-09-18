import Transcription from "../models/transcription.model";
import { CreateTranscriptionRequest } from "../types/transcription.types";

export const createTranscription = async (payload: CreateTranscriptionRequest) => {
  const transcriptionText = "transcribed text"; // Mock transcription

  const record = new Transcription({
    audioUrl: payload.audioUrl,
    transcription: transcriptionText,
  });

  await record.save();
  return record;
};

export const getAllTranscriptions = async () => {
  return await Transcription.find().sort({ createdAt: -1 });
};