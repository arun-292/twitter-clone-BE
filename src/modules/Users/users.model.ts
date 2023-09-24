import { model } from 'mongoose';
import { UserSchema } from './users.schema';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export const securePassword = (password: string, uuid: string) => {
  if (!password) return '';
  try {
    const hash = crypto.createHmac('sha256', uuid).update(password).digest('hex');
    return hash;
  } catch (ex) {
    return '';
  }
};

UserSchema.virtual('password').set(function (password) {
  this.uuid = uuidv4();
  this.encryptedPassword = securePassword(password, this.uuid);
});

UserSchema.virtual('email').set(function (email) {
  this.lower_email = email.toLowerCase() || undefined;
});

UserSchema.virtual('userName').set(function (userName) {
  this.lower_userName = userName.toLowerCase();
});

UserSchema.methods.authenticate = function (password: string) {
  return securePassword(password, this.uuid) === this.encryptedPassword;
};

export const Users = model('Users', UserSchema, 'Users');
