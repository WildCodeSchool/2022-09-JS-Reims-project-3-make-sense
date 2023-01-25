const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { setDecisionsStatus } = require("../service/utils");

const prisma = new PrismaClient();

const browse = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userRole = decodedToken.role;
  const userId = decodedToken.id;
  const initialConditions = {
    include: {
      concerned: true,
      comment: true,
    },
  };
  if (userRole === "visitor") {
    const decisions = await prisma.decision.findMany({
      where: {
        concerned: {
          some: {
            user_id: userId,
          },
        },
      },
      ...initialConditions,
    });
    if (decisions) {
      const newDecisions = setDecisionsStatus(decisions);
      res.status(200).json(newDecisions);
    } else {
      res.status(404).json({ message: "Decisions not found" });
    }
  } else {
    const decisions = await prisma.decision.findMany(initialConditions);
    if (decisions) {
      const newDecisions = setDecisionsStatus(decisions);
      res.status(200).json(newDecisions);
    } else {
      res.status(404).json({ message: "Decisions not found" });
    }
  }
};

const read = async (req, res) => {
  const decisionId = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userRole = decodedToken.role;
  const userId = decodedToken.id;
  if (userRole === "visitor") {
    const decision = await prisma.decision.findUnique({
      where: {
        id: parseInt(decisionId, 10),
      },
      include: {
        concerned: true,
        comment: true,
      },
    });
    if (decision) {
      const { concerned } = decision;
      const concernedIds = concerned.map((concernedUser) => {
        return concernedUser.user_id;
      });
      if (concernedIds.includes(userId)) {
        const newDecision = setDecisionsStatus([decision]);
        res.status(200).json(newDecision[0]);
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } else {
      res.status(404).json({ message: "Decision not found" });
    }
  } else {
    const decision = await prisma.decision.findUnique({
      where: {
        id: parseInt(decisionId, 10),
      },
      include: {
        concerned: true,
        comment: true,
      },
    });
    if (decision) {
      const newDecision = setDecisionsStatus([decision]);
      res.status(200).json(newDecision[0]);
    } else {
      res.status(404).json({ message: "Decision not found" });
    }
  }
};

const add = async (req, res) => {
  const decisionAndItsConcerned = await prisma.decision.create({
    data: {
      title: req.body.title,
      deadline: req.body.deadline,
      start_content: req.body.start_content,
      impact: req.body.impact,
      risk: req.body.risk,
      advantage: req.body.advantage,
      user_id: req.body.user_id,
      concerned: {
        create: req.body.concerned.map((OneOfConcerned) => {
          return {
            user_id: OneOfConcerned.user_id,
            user_status: OneOfConcerned.user_status,
          };
        }),
      },
    },
  });
  if (decisionAndItsConcerned) {
    delete decisionAndItsConcerned.user.hashed_password;
    res.json({
      message: "Decision created",
      decision: decisionAndItsConcerned,
    });
  } else {
    res.status(404).json({ message: "Decision not created" });
  }
};

const edit = async (req, res) => {
  const decisionId = req.params.id;
  const dataToUpdate = req.body;
  const decision = await prisma.decision.update({
    where: {
      id: parseInt(decisionId, 10),
    },
    data: dataToUpdate,
  });
  if (decision) {
    res.status(200).json(decision);
  } else {
    res.status(404).json({ message: "Decision not found" });
  }
};

const destroy = async (req, res) => {
  const decision = await prisma.decision.delete({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });
  if (decision) {
    res.status(204).json({ message: "Decision deleted" });
  } else {
    res.status(404).json({ message: "Decision not deleted" });
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
