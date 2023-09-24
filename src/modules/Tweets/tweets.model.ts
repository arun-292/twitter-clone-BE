import { model } from 'mongoose';
import { TweetsSchema } from './tweets.schema';

export const Tweets = model('Tweets', TweetsSchema, 'Tweets');
