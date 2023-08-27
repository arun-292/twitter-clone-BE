import { model } from 'mongoose';
import { UserSchema } from './users.schema';
import { v4 as uuidv4 } from 'uuid';

UserSchema.methods = {
  isUserAuthenticated: function (password) {
    return this.securePassword(password) === this.encryptedPassword;
  },
  securePassword: function (password: string) {
    if (!password) return '';
    try {
      // TODO: generate unique id and key for crypto password encryption
      return;
    } catch (ex) {
      return '';
    }
  },
};

UserSchema.virtual('password').set(function (password) {
  this.uuid = uuidv4();
  this.encryptedPassword = this.securePassword(password);
});

export const Users = model('Users', UserSchema, 'Users');
