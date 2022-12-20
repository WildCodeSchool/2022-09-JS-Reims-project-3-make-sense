const AbstractManager = require("./AbstractManager");

class DecisionManager extends AbstractManager {
  constructor() {
    super({ table: "decision" });
  }

  insert(decision) {
    const currentDate = new Date();
    const publishDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    return this.connection.query(
      `insert into ${this.table} (title, publish_date, deadline, start_content, impact, risk, advantage, user_id) values (?,?,?,?,?,?,?,?)`,
      [
        decision.title,
        publishDate,
        decision.deadline,
        decision.start_content,
        decision.impact,
        decision.risk,
        decision.advantage,
        decision.userId,
      ]
    );
  }

  update(decision) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      decision.body,
      decision.id,
    ]);
  }

  findCurrentDecisions() {
    return this.connection.query(
      `select u.firstname, u.lastname, d.title, d.id from user u inner join ${this.table} d on d.user_id = u.id`
    );
  }

  insertConcerned(users, decisionId) {
    let sql = `insert into concerned (user_status, user_id, decision_id) values`;
    const values = [];

    for (let i = 0; i < users.length; i += 1) {
      sql += "(?, ?, ?)";

      if (i !== users.length - 1) {
        sql += ",";
      }

      values.push(users[i].userStatus, users[i].userId, decisionId);
    }
    return this.connection.query(sql, values);
  }
}

module.exports = DecisionManager;
