const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const add = async (req, res) => {
  const comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      decisionId: req.params.decisionId,
      userId: req.body.userId,
    },
  });
  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({ message: "Comment not found" });
  }
};

module.exports = {
  add,
};
