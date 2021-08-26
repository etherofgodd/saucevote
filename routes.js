import express from "express";
import {
  authUser,
  createUser,
  getUserProfile,
  getUsers,
} from "./controllers/userController.js";
import {
  createElection,
  getCandidatesForElection,
  getElectionById,
  getElections,
} from "./controllers/electionController.js";
import { protect } from "./middlewares/authMiddleware.js";
import { vote } from "./controllers/voteController.js";

export default (app) => {
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const electionRoutes = express.Router();
  const voteRoutes = express.Router();

  app.use(express.json());

  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  apiRoutes.use("/auth", authRoutes);
  apiRoutes.use("/elections", electionRoutes);
  apiRoutes.use("/vote", voteRoutes);

  //   Home route
  app.get("/", (req, res) =>
    res.json({
      note: "Welcome",
      message: "Welcome to the future of voting",
    })
  );

  // Auth Routes
  authRoutes.route("/users").get(getUsers).post(createUser);
  authRoutes.route("/login").post(authUser);
  authRoutes.route("/profile").get(protect, getUserProfile);

  // Elections Routes
  electionRoutes.route("/").get(getElections);
  electionRoutes.route("/candidates/:electionId").get(getCandidatesForElection);
  electionRoutes.route("/create").post(createElection);
  electionRoutes.route("/:electionId").get(getElectionById);

  // Vote Routes
  voteRoutes.route("/:electionId").post(vote);

  return app.use("/api", apiRoutes);
};
