import cron from "node-cron";
import { processRecurringTransactions } from "./jobs/transaction.job";
import { processReportJob } from "./jobs/report.job";

const scheduleJob = (name: string, time: string, job: Function) => {
  console.log(`Scheduling ${name} at ${time} IST`);

  return cron.schedule(
    time,
    async () => {
      try {
        await job();
        console.log(`${name} completed at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
      } catch (error) {
        console.log(`${name} failed`, error);
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",  // ← India timezone
    }
  );
};
export const startJobs = () => {
  return [
    // Transactions: Daily at 12:30 AM IST (19:00 UTC previous day)
    scheduleJob("Transactions", "30 19 * * *", processRecurringTransactions),

    // Reports: 1st of month at 6:00 AM IST (00:30 UTC)
    scheduleJob("Reports", "30 0 1 * *", processReportJob),
  ];
};