import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Tweets } from './tweets.model';

const create = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  const tweet = new Tweets(req.body);

  tweet
    .save()
    .then(() => {
      return res.json({ done: true });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

const getAll = (req: Request, res: Response) => {
  Tweets.find()
    .populate({ path: 'tweetBy', select: ['_id', 'fullName', 'lower_userName'] })
    .then((r) => {
      return res.json(r);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

export { create, getAll };
