import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Users } from './users.model';

const signUp = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  const user = new Users(req.body);
  user
    .save()
    .then(() => {
      return res.json({ done: true });
    })
    .catch(() => {
      return res.status(400).json({
        done: false,
      });
    });
};

const signIn = (req: Request, res: Response) => {
  res.json({ req: req.body });
};

export { signUp, signIn };
