import { Schema } from 'dynamoose';

export const UserSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  email: {
    type: String,
    index: {
      name: 'email-index',
    },
  },
  nickname: {
    type: String,
  },
});
