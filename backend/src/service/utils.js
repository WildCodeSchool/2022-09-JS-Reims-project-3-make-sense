const setDecisionsStatus = (decisions) => {
  const newDecisions = decisions;
  Object.keys(newDecisions).forEach((key) => {
    delete newDecisions[key].user_hashed_password;
    const decisionDeadline = new Date(newDecisions[key].deadline);
    const currentDate = new Date();
    if (decisionDeadline < currentDate) {
      newDecisions[key].status = "finished";
    } else {
      newDecisions[key].status = "in_progress";
    }
  });
  return newDecisions;
};

module.exports = {
  setDecisionsStatus,
};
