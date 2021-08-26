import mongoose from "mongoose";
import Candidate from "./candidatesModel.js";

let Schema = mongoose.Schema;

const electionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    candidates: [Candidate.schema],

    category: {
      type: String,
      required: true,
    },

    count: {
      type: Number,
      default: 0,
    },

    creator: {
      type: String,
      required: true,
    },

    isElectionValid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Election = mongoose.model("Election", electionSchema);

export default Election;
