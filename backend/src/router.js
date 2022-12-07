const express = require("express");
const database = require("../db");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const getDecisions = (req, res) => {
  database
    .query("select * from decision")
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getDecision = (req, res) => {
  const { id } = req.params;
  database
    .query("select * from decision where id = ?", [id])
    .then(([result]) => {
      if (result.length) {
        res.json(result[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

router.get("/decisions", getDecisions);
router.get("/decisions/:id", getDecision);

module.exports = router;
