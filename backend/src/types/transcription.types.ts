export interface CreateTranscriptionRequest {
  audioUrl: string;
}

export interface CreateTranscriptionResponse {
  _id: string;
  audioUrl: string;
  transcription: string;
  createdAt: Date;
}