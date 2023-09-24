import { Schema } from 'mongoose';

export const TweetsSchema = new Schema({
  tweetBy: {
    type: Schema.ObjectId,
    ref: 'Users',
  },
  tweetText: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});
