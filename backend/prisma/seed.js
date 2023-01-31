const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { users, decisions, concerned, comments } = require("./data");

async function main() {
  // create new data
  await prisma.user.createMany({
    data: users,
  });
  await prisma.decision.createMany({
    data: decisions,
  });
  await prisma.concerned.createMany({
    data: concerned,
  });
  await prisma.comment.createMany({
    data: comments,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
