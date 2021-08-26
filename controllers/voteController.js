import expressAsyncHandler from "express-async-handler";

import Vote from "../models/voteSchema.js";
import User from "../models/userModel.js";
import Candidate from "../models/candidatesModel.js";
import Election from "../models/electionModel.js";

export const vote = expressAsyncHandler(async (req, res) => {
  const { candidateId, voterId, userId } = req.body;
  const electionId = req.params.electionId;

  if (!candidateId || !voterId || !userId || !electionId) {
    return res.status(400).json({
      message: "Invalid or missing parameters",
    });
  }

  const validCandidate = await Candidate.findById(candidateId);

  if (!validCandidate)
    return res.status(404).json({
      message: "Candidate Not found",
    });

  // looks for the valid voter Id
  const validVoter = await User.findOne({ voterId });

  if (!validVoter) {
    return res.status(400).json({
      message: "Bad VoterID request",
    });
  }

  const validUser = await User.findById(userId);
  if (!validUser)
    return res.status({
      message: "User not found",
    });

  if (validCandidate) {
    const voteExists = await Vote.findOne({
      userId,
      electionId,
    });

    if (voteExists) {
      return res.status(400).json({
        message: "User has already voted before",
      });
    } else {
      const vote = await Vote.create({
        userId,
        candidateId,
        electionId,
      });

      if (vote) {
        validCandidate.votes.push(vote);
      }

      const savedVoteCount = await validCandidate.save();

      if (savedVoteCount) {
        const updatedElectionCount = await Election.findByIdAndUpdate(
          {
            _id: electionId,
          },
          {
            $inc: {
              count: 1,
            },
          },
          {
            new: true,
          }
        );
        if (updatedElectionCount) {
          return res.status(200).json({
            type: "Vote++",
            candidate: savedVoteCount.candidateName,
            message: "Poll count Updated",
          });
        } else {
          return res.status(400).json({
            message: "Could not update the poll coiunt",
          });
        }
      }
    }
  }
});
