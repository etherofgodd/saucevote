import mongoose from "mongoose";
import Vote from "./voteSchema.js";

let Schema = mongoose.Schema;

const candidateSchema = new Schema({
  electionId: {
    type: Schema.Types.ObjectId,
    ref: "Election",
    required: true,
  },

  candidateName: {
    type: String,
    required: true,
  },

  candidateParty: {
    type: String,
    required: true,
  },

  candidateDesc: {
    type: String,
    required: true,
  },

  votes: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

candidateSchema.pre("remove", function (next) {
  Vote.remove({
    candidate: this._id,
  });
  next();
});

const Candidate = mongoose.model("Candidates", candidateSchema);

export default Candidate;
