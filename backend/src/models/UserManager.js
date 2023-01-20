const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  find(id) {
    return this.connection.query(
      `select id, firstname, lastname, email, image_url, role from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(`select * from ${this.table}`);
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, image_url, email, hashed_password) values (?,?,?,?,?)`,
      [
        user.firstname,
        user.lastname,
        user.profilePicture,
        user.email,
        user.hashedPassword,
      ]
    );
  }

  update(user) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      user,
      user.id,
    ]);
  }

  findUserInfoByEmail(email) {
    return this.connection.query(
      `select id, firstname, lastname, role, email, hashed_password from ${this.table} where email = ?`,
      [email]
    );
  }

  findAllAndCountDecisions() {
    return this.connection.query(
      `SELECT u.id, u.firstname, u.lastname, u.email, u.role, COUNT(d.id) AS nb_decisions
      FROM ${this.table} u
      LEFT JOIN decision d ON u.id = d.user_id
      GROUP BY u.id`
    );
  }
}

module.exports = UserManager;
