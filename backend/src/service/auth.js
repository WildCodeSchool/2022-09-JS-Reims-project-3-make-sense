const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashPassword = (req, res, next) => {
  const hashOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    parallelism: 1,
    timeCost: 5,
  };
  argon2
    .hash(req.body.password, hashOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashed_password, req.body.password)
    .then((match) => {
      if (match) {
        const payload = {
          sub: req.user.id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const { id, role } = req.user;

        delete req.user.hashed_password;
        res.send({ id, role, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
