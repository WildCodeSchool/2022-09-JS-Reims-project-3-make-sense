const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const { verifyPassword } = require("../service/auth");

const upload = multer({ dest: "uploads/" });
const prisma = new PrismaClient();

const uploadFile = upload.single("avatar");
const handleFile = (req, res, next) => {
  if (req.file) {
    const { filename, originalname } = req.file;
    const path = `uploads/${uuidv4()}-${originalname}`;
    fs.rename(`uploads/${filename}`, path, (err) => {
      if (err) {
        res.sendStatus(500);
      }
      req.body.profilePicture = path;
      next();
    });
  } else {
    next();
  }
};

const browse = async (req, res) => {
  const users = await prisma.user.findMany();
  if (users) {
    Object.keys(users).forEach((key) => {
      delete users[key].hashed_password;
    });
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Users not found" });
  }
};

const read = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });
  if (user) {
    delete user.hashed_password;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const edit = async (req, res) => {
  const dataToUpdate = req.body;
  const user = await prisma.user.update({
    where: {
      id: parseInt(req.params.id, 10),
    },
    data: dataToUpdate,
  });
  if (user) {
    res.status(204).json({ message: "User updated" });
  } else {
    res.status(404).json({ message: "User not updated" });
  }
};

const add = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      image_url: req.body.image_url,
    },
  });
  if (user) {
    delete user.hashed_password;
    res.status(201).json({ message: "User created", user });
  } else {
    res.json({ message: "User not created" });
  }
};

const destroy = async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });
  if (user) {
    res.status(204).json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not deleted" });
  }
};

const login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  req.user = user;
  verifyPassword(req, res);
  return null;
};

const browseAndGetStats = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id, 10),
    },
    include: {
      decision: true,
      comment: true,
      concerned: true,
    },
  });
  if (user) {
    const statistics = {
      number_of_decisions: user.decision.length,
      number_of_comments: user.comment.length,
      number_of_concerned: user.concerned.length,
    };
    delete user.decision;
    delete user.comment;
    delete user.concerned;
    delete user.hashed_password;
    user.statistics = statistics;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  login,
  uploadFile,
  handleFile,
  browseAndGetStats,
};
