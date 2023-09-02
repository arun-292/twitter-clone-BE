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

const validate = (req: Request, res: Response) => {
  Users.findOne({
    $or: [{ name: req.body.field }, { email: req.body.field }, { phone: req.body.field }],
  })
    .then((r) => {
      res.json({ res: r.toJSON() });
    })
    .catch((c) => {
      res.json({ res: c });
    });
  res.json({ req: req.body });
};

const signIn = (req: Request, res: Response) => {
  res.json({ req: req.body });
};

export { signUp, signIn, validate };
