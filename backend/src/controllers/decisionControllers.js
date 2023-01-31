const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { setDecisionsStatus } = require("../service/utils");

const prisma = new PrismaClient();

const browse = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userRole = decodedToken.role;
  const userId = decodedToken.id;

  const decisions = await prisma.decision.findMany({
    include: {
      user: true,
      concerned: {
        include: {
          user: true,
        },
      },
    },
  });

  const newDecisions = decisions.map((decision) => {
    const { user, concerned, ...decisionWithoutUser } = decision;
    return {
      ...decisionWithoutUser,
      author: `${user.firstname} ${user.lastname}`,
      author_image: user.image_url,
      concerned: concerned.map((concernedUser) => concernedUser.user.id),
    };
  });

  const newDecisionStatus = setDecisionsStatus(newDecisions);

  if (userRole === "visitor") {
    const filteredDecisions = newDecisionStatus.filter((decision) =>
      decision.concerned.includes(userId)
    );
    res.status(200).json(filteredDecisions);
  } else {
    res.status(200).json(newDecisionStatus);
  }
};

const read = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userRole = decodedToken.role;
  const userId = decodedToken.id;

  // GET decision with all its comments sorted by date and all its concerned users with their info
  const decision = await prisma.decision.findUnique({
    where: {
      id: parseInt(req.params.id, 10),
    },
    include: {
      user: true,
      concerned: {
        include: {
          user: true,
        },
      },
      comment: {
        orderBy: {
          date: "desc",
        },
        include: {
          user: true,
        },
      },
    },
  });

  // Format decision
  const { user, concerned, ...decisionWithoutUser } = decision;
  const newDecision = {
    ...decisionWithoutUser,
    author: `${user.firstname} ${user.lastname}`,
    author_image: user.image_url,
    concerned: concerned.map((concernedUser) => {
      return {
        id: concernedUser.user.id,
        firstname: concernedUser.user.firstname,
        lastname: concernedUser.user.lastname,
        image_url: concernedUser.user.image_url,
      };
    }),
    comments: decision.comment.map((OneOfComment) => {
      return {
        id: OneOfComment.id,
        content: OneOfComment.content,
        author: `${OneOfComment.user.firstname} ${OneOfComment.user.lastname}`,
        author_image: OneOfComment.user.image_url,
        created_at: OneOfComment.date,
      };
    }),
  };
  delete newDecision.comment;

  // Set decision status
  const newDecisionStatus = setDecisionsStatus([newDecision]);

  // Send response to client depending on user role and concerned users
  if (userRole === "visitor") {
    if (newDecisionStatus[0].concerned.includes(userId)) {
      res.status(200).json(newDecisionStatus[0]);
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } else {
    res.status(200).json(newDecisionStatus[0]);
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
