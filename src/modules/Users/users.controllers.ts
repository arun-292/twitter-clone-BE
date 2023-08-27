import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const signUp = (req: Request, res: Response) => {
  console.log(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  res.json({ req: req.body });
};

const signIn = (req: Request, res: Response) => {
  res.json({ req: req.body });
};

export { signUp, signIn };
