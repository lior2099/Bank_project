import nodeCron from "node-cron";
import { TempUser } from "../models/users.js";

nodeCron.schedule("*/10 * * * *", async () => {
  console.log("Running cron clean temps");
  try {
    await TempUser.deleteMany({ expAt: { $lt: new Date() + 5 * 100 * 1000 } });
  } catch (error) {
    console.error("Error deleting expired temp users:", error.message);
  }
});
