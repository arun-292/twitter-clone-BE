import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    lower_userName: {
      type: String,
      required: true,
      unique: true,
    },
    lower_email: {
      type: String,
      index: { unique: true, sparse: true },
    },
    phone: {
      type: String,
      index: { unique: true, sparse: true },
    },
    uuid: {
      type: String,
      required: true,
    },
    encryptedPassword: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    autoIndex: true,
  },
);
