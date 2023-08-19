import { Schema } from 'dynamoose';

export const GameSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
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
    score: {
      type: Object,
      schema: {
        black: Number,
        white: Number,
      },
    },
    endedAt: {
      type: String,
    },
    winner: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
