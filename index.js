import cron from "node-cron";
import { exec } from "child_process";

cron.schedule("0 8 * * *", () => {
    console.log("Sending daily report...");
    exec("node scripts/dailyReport.js");
});
