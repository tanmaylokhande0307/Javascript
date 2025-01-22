import { createClient } from "redis";

const client = createClient();

const startServer = async () => {
  try {
    await client.connect();
    while (1) {
      const response = await client.brPop("submissions", 0);
      console.log({ response });
      await new Promise((res, rej) => setTimeout(res, 1000));
      console.log("received element from the queue and process completed");
    }
  } catch (error) {
    console.log(error);
  }
};

startServer();
