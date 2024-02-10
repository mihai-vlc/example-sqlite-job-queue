import VerySimpleQueue from "very-simple-queue";
import readline from "node:readline";

const queue = new VerySimpleQueue("sqlite3", {
  filePath: "data.sqlite3",
});
const QUEUE_ID = "myQueue";

async function main() {
  await queue.createJobsDbStructure();

  while (true) {
    let value = await input("value = ");

    if (value == "") {
      break;
    }

    queue.pushJob({ value }, QUEUE_ID);
  }
}

// Function
function input(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

main().catch((e) => {
  console.error("ERROR: ", e);
});
