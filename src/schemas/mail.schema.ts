import * as mongoose from 'mongoose';

export const mailSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
      index: true,
      ref: 'User',
    },
    receiver: {
      type: String,
      required: true,
      index: true,
      ref: 'User',
    },
  },
  { timestamps: true, collection: 'mail' },
);
