const express = require("express");

const router = express.Router();

const decisionControllers = require("./controllers/decisionControllers");
const userControllers = require("./controllers/userControllers");
const commentControllers = require("./controllers/commentControllers");
const { hashPassword, verifyToken } = require("./service/auth");

router.post(
  "/users",
  userControllers.uploadFile,
  userControllers.handleFile,
  hashPassword,
  userControllers.add
);

router.post("/users/login", userControllers.login);

router.use(verifyToken);

// routes concernings users

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", hashPassword, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

// routes users statistics (number of decisions, number of comments, number of concerned) for the admin dashboard

router.get("/users/:id/statistics", userControllers.browseAndGetStats);

// routes concernings decisions

router.get("/decisions", decisionControllers.browse);
router.get("/decisions/:id", decisionControllers.read);
router.post("/decisions", decisionControllers.add);
router.put("/decisions/:id", decisionControllers.edit);
router.delete("/decisions/:id", decisionControllers.destroy);

// routes concernings comments

router.post("/decisions/:decisionId/comments", commentControllers.add);

module.exports = router;
