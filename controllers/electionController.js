import expressAsyncHandler from "express-async-handler";
import Candidate from "../models/candidatesModel.js";
import Election from "../models/electionModel.js";

// @desc Create election
// @route POST /api/election
// @access private

export const createElection = expressAsyncHandler(async (req, res) => {
  let { title, category, isElectionValid, candidates, creator } = req.body;

  if (!title || !category || !isElectionValid || !candidates || !creator) {
    return res.status(400).json({
      message: "Insufficient parameters, check and try again",
    });
  }

  const electionExists = await Election.findOne({ title });

  if (electionExists) {
    return res.status(400).json({
      message: "Election already exists",
    });
  }
  const election = new Election({
    title,
    category,
    isElectionValid,
    creator,
  });

  candidates = candidates.map((candidate) => {
    candidate.electionId = election._id;
    return candidate;
  });

  const newCandidates = await Candidate.create(candidates);

  if (!newCandidates) {
    return res.status(500).json({
      message: "Can't save candidates",
    });
  } else {
    election.candidates.push(...newCandidates);
    const electionSaved = await election.save();
    !electionSaved && res.status(500).json({ message: "Can't add candidates" });
    return res.status(201).json({ electionSaved });
  }
});

export const getElections = expressAsyncHandler(async (req, res) => {
  const elections = await Election.find();
  if (!elections)
    return res.status(404).json({
      message: "No elections found",
    });

  return res.status(200).json({
    message: "Elections found",
    elections,
  });
});

export const getElectionById = expressAsyncHandler(async (req, res) => {
  const electionId = req.params.electionId;
  if (!electionId)
    return res.status(400).json({
      message: "No id given",
    });

  const election = await Election.findById({ _id: electionId });

  if (election)
    return res.status(200).json({
      election,
    });

  res.status(404).json({
    message: "No election",
  });
});

export const getCandidatesForElection = expressAsyncHandler(
  async (req, res) => {
    const electionId = req.params.electionId;
    if (!electionId)
      return res.status(400).json({
        message: "No id given",
      });

    const candidates = await Candidate.find({
      electionId: req.params.electionId,
    });

    if (candidates)
      return res.status(200).json({
        candidates,
      });

    res.status(404).json({
      message: "No Candidates",
    });
  }
);
