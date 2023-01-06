const models = require("../models");

const browse = (req, res) => {
  if (req.query.status != null) {
    models.decision
      .findCurrentDecisions()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  } else {
    models.decision
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const read = (req, res) => {
  models.decision
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

const edit = (req, res) => {
  const decision = req.body;
  decision.id = parseInt(req.params.id, 10);

  models.decision
    .update(decision)
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

const add = (req, res, next) => {
  const decision = req.body;
  models.decision
    .insert(decision)
    .then(([result]) => {
      req.body.decisionId = result.insertId;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.decision
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

const addConcerned = (req, res) => {
  const { users, decisionId } = req.body;
  models.decision
    .insertConcerned(users, decisionId)
    .then(() => {
      res.status(201).json(decisionId);
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
  addConcerned,
};
