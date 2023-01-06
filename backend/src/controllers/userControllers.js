const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const upload = multer({ dest: "uploads/" });

const uploadFile = upload.single("avatar");
const handleFile = (req, res, next) => {
  if (req.file) {
    const { filename, originalname } = req.file;
    fs.rename(
      `uploads/${filename}`,
      `uploads/${uuidv4()}-${originalname}`,
      (err) => {
        if (err) {
          res.sendStatus(500);
        }
        const path = `uploads/${uuidv4()}-${originalname}`;
        req.body.profilePicture = path;
        next();
      }
    );
  } else {
    next();
  }
};

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseAndCountDecisions = (req, res) => {
  models.user
    .findAllAndCountDecisions()
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      }
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;

  models.user
    .findUserInfoByEmail(email)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        [req.user] = rows;
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getUserByEmailWithPasswordAndPassToNext,
  browseAndCountDecisions,
  uploadFile,
  handleFile,
};
