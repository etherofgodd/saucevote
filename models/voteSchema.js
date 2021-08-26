import mongoose from "mongoose";

const Schema = mongoose.Schema;

const voteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  candidateId: {
    type: Schema.Types.ObjectId,
    ref: "Candidate",
    required: true,
  },

  electionId: {
    type: Schema.Types.ObjectId,
    ref: "Election",
    required: true,
  },
});

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
