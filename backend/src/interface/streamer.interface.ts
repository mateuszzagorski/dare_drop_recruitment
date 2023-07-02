import { Document } from 'mongoose';

export interface IStreamer extends Document {
  readonly name: string;
  readonly platform: string;
  readonly description: string;
  upvotes: number;
  downvotes: number;
}
