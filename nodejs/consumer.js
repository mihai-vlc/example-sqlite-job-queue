import VerySimpleQueue from "very-simple-queue";

const queue = new VerySimpleQueue("sqlite3", {
  filePath: "data.sqlite3",
});

const QUEUE_ID = "myQueue";

async function main() {
  await queue.createJobsDbStructure();

  await queue.work(
    async (payload) => {
      console.log("processing", payload);
      if (payload.value == "4") {
        throw new Error("Failed to process 4");
      }
    },
    {
      queue: QUEUE_ID,
      restTimeInSeconds: 1,
    }
  );
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

function shutdown() {
  queue.shutdown();
}

main()
  .then(() => {
    console.log("shutting down");
    process.exit(0);
  })
  .catch((e) => {
    console.error("ERROR: ", e);
    process.exit(1);
  });
