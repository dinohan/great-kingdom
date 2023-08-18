import { Schema } from 'dynamoose';

export const GameSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  title: {
    type: String,
  },
  log: {
    type: Array,
    schema: [String],
  },
  players: {
    type: Object,
    schema: {
      black: String,
      white: String,
    },
  },
  endedAt: {
    type: Number,
  },
});
