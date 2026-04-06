import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "../models/user.model";
import TransactionModel, { 
  TransactionTypeEnum, 
  PaymentMethodEnum, 
  TransactionStatusEnum,
  CategoryEnum,
  RecurringIntervalEnum
} from "../models/transaction.model";

dotenv.config();

// Category mapping function - EXACT MATCH with CategoryEnum (UPPERCASE)
function mapCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    // Income sources
    "Freelance": CategoryEnum.FREELANCE,
    "Side Hustle": CategoryEnum.FREELANCE,
    "Consulting": CategoryEnum.FREELANCE,
    
    // Expense categories
    "Entertainment": CategoryEnum.OTT,
    "Groceries": CategoryEnum.GROCERIES,
    "Meals": CategoryEnum.RESTAURANT,
    "Software": CategoryEnum.MISCELLANEOUS,
    "Transport": CategoryEnum.FUEL,
    "Utilities": CategoryEnum.BILLS,
    "Fitness": CategoryEnum.HEALTHCARE,
    "Shopping": CategoryEnum.CLOTHING,
    "Hosting": CategoryEnum.MISCELLANEOUS,
    "Food & Drink": CategoryEnum.RESTAURANT,
  };
  
  return categoryMap[category] || CategoryEnum.MISCELLANEOUS;
}

// Payment method mapping
function mapPaymentMethod(method: string): string {
  const methodMap: Record<string, string> = {
    "BANK_TRANSFER": PaymentMethodEnum.BANK_TRANSFER,
    "CARD": PaymentMethodEnum.CARD,
    "AUTO_DEBIT": PaymentMethodEnum.AUTO_DEBIT,
    "CASH": PaymentMethodEnum.CASH,
  };
  return methodMap[method] || PaymentMethodEnum.OTHER;
}

const transactionsData = [
  // 2025 Data
  {
    title: "Freelance Payment",
    type: "INCOME",
    amount: 1250,
    category: "Freelance",
    description: "Landing page for client",
    date: new Date("2025-06-09T09:30:00.000Z"),
    paymentMethod: "BANK_TRANSFER",
    isRecurring: false,
  },
  {
    title: "UI Design Contract",
    type: "INCOME",
    amount: 850,
    category: "Freelance",
    description: "UI work for mobile app",
    date: new Date("2025-06-17T14:00:00.000Z"),
    paymentMethod: "BANK_TRANSFER",
    isRecurring: false,
  },
  {
    title: "Social Media Content",
    type: "INCOME",
    amount: 600,
    category: "Side Hustle",
    description: "June Instagram campaign",
    date: new Date("2025-06-24T11:15:00.000Z"),
    paymentMethod: "BANK_TRANSFER",
    isRecurring: false,
  },
  {
    title: "Spotify Subscription",
    type: "EXPENSE",
    amount: 16.99,
    category: "Entertainment",
    description: "Monthly Spotify premium",
    date: new Date("2025-06-08T00:00:00.000Z"),
    paymentMethod: "AUTO_DEBIT",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2025-07-08T00:00:00.000Z"),
  },
  {
    title: "Groceries - Trader Joe's",
    type: "EXPENSE",
    amount: 78.25,
    category: "Groceries",
    description: "Weekly groceries",
    date: new Date("2025-06-12T18:45:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Team Lunch",
    type: "EXPENSE",
    amount: 54.5,
    category: "Meals",
    description: "Collaboration meetup lunch",
    date: new Date("2025-06-14T13:00:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Adobe Creative Cloud",
    type: "EXPENSE",
    amount: 29.99,
    category: "Software",
    description: "Monthly Adobe tools",
    date: new Date("2025-06-18T10:00:00.000Z"),
    paymentMethod: "AUTO_DEBIT",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2025-07-18T10:00:00.000Z"),
  },
  {
    title: "Fuel Refill",
    type: "EXPENSE",
    amount: 42.8,
    category: "Transport",
    description: "Car fuel station",
    date: new Date("2025-06-22T09:20:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Netflix",
    type: "EXPENSE",
    amount: 15.49,
    category: "Entertainment",
    description: "Monthly Netflix subscription",
    date: new Date("2025-06-28T00:00:00.000Z"),
    paymentMethod: "AUTO_DEBIT",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2025-07-28T00:00:00.000Z"),
  },
  {
    title: "Electricity Bill",
    type: "EXPENSE",
    amount: 92.4,
    category: "Utilities",
    description: "June energy bill",
    date: new Date("2025-07-03T00:00:00.000Z"),
    paymentMethod: "AUTO_DEBIT",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2025-08-03T00:00:00.000Z"),
  },
  {
    title: "Logo Design",
    type: "INCOME",
    amount: 1200,
    category: "Freelance",
    description: "Brand identity for startup",
    date: new Date("2025-05-10T10:15:00.000Z"),
    paymentMethod: "BANK_TRANSFER",
    isRecurring: false,
  },
  {
    title: "UX Audit",
    type: "INCOME",
    amount: 950,
    category: "Freelance",
    description: "Website UX review",
    date: new Date("2025-05-18T11:30:00.000Z"),
    paymentMethod: "BANK_TRANSFER",
    isRecurring: false,
  },
  {
    title: "T-shirt Sales",
    type: "INCOME",
    amount: 500,
    category: "Side Hustle",
    description: "Online store May sales",
    date: new Date("2025-05-30T15:45:00.000Z"),
    paymentMethod: "BANK_TRANSFER",
    isRecurring: false,
  },
  {
    title: "Groceries - Walmart",
    type: "EXPENSE",
    amount: 89.7,
    category: "Groceries",
    description: "Weekly groceries",
    date: new Date("2025-05-11T17:30:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Gym Membership",
    type: "EXPENSE",
    amount: 45,
    category: "Fitness",
    description: "Monthly gym payment",
    date: new Date("2025-05-13T08:00:00.000Z"),
    paymentMethod: "AUTO_DEBIT",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2025-06-13T08:00:00.000Z"),
  },
  {
    title: "Amazon Order",
    type: "EXPENSE",
    amount: 109.99,
    category: "Shopping",
    description: "New headphones",
    date: new Date("2025-05-20T14:15:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Domain Renewal",
    type: "EXPENSE",
    amount: 19.99,
    category: "Hosting",
    description: "Personal site domain renewal",
    date: new Date("2025-05-23T07:50:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Lunch with Client",
    type: "EXPENSE",
    amount: 62.3,
    category: "Meals",
    description: "Business meeting lunch",
    date: new Date("2025-05-25T12:30:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Movie Night",
    type: "EXPENSE",
    amount: 21.75,
    category: "Entertainment",
    description: "Weekend cinema",
    date: new Date("2025-06-03T20:00:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Internet Bill",
    type: "EXPENSE",
    amount: 78.5,
    category: "Utilities",
    description: "Monthly WiFi payment",
    date: new Date("2025-06-06T00:00:00.000Z"),
    paymentMethod: "AUTO_DEBIT",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2025-07-06T00:00:00.000Z"),
  },
  // 2024 Data
  {
    title: "Freelance Web Design",
    type: "INCOME",
    amount: 1800,
    category: "Freelance",
    description: "Website redesign for local bakery",
    date: new Date("2024-04-05T10:00:00.000Z"),
    paymentMethod: "BANK_TRANSFER",
    isRecurring: false,
  },
  {
    title: "Uber Ride",
    type: "EXPENSE",
    amount: 23.8,
    category: "Transport",
    description: "Ride to airport",
    date: new Date("2024-04-06T08:15:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Netflix Subscription",
    type: "EXPENSE",
    amount: 15.49,
    category: "Entertainment",
    description: "Monthly streaming service",
    date: new Date("2024-04-10T00:00:00.000Z"),
    paymentMethod: "AUTO_DEBIT",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2024-05-10T00:00:00.000Z"),
  },
  {
    title: "Grocery - Walmart",
    type: "EXPENSE",
    amount: 112.35,
    category: "Groceries",
    description: "Weekly groceries",
    date: new Date("2024-04-12T17:30:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Spotify Family Plan",
    type: "EXPENSE",
    amount: 16.99,
    category: "Entertainment",
    description: "Monthly music subscription",
    date: new Date("2024-04-13T00:00:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2024-05-13T00:00:00.000Z"),
  },
  {
    title: "YouTube AdSense",
    type: "INCOME",
    amount: 287.5,
    category: "Side Hustle",
    description: "Monthly YouTube ad revenue",
    date: new Date("2024-04-15T10:00:00.000Z"),
    paymentMethod: "BANK_TRANSFER",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2024-05-15T10:00:00.000Z"),
  },
  {
    title: "Shell Gas Station",
    type: "EXPENSE",
    amount: 46.2,
    category: "Transport",
    description: "Fuel refill",
    date: new Date("2024-04-17T13:40:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Consulting Session",
    type: "INCOME",
    amount: 600,
    category: "Consulting",
    description: "2-hour strategy session with startup",
    date: new Date("2024-04-20T15:00:00.000Z"),
    paymentMethod: "BANK_TRANSFER",
    isRecurring: false,
  },
  {
    title: "AT&T Mobile Bill",
    type: "EXPENSE",
    amount: 75,
    category: "Utilities",
    description: "Monthly phone bill",
    date: new Date("2024-04-25T00:00:00.000Z"),
    paymentMethod: "AUTO_DEBIT",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2024-05-25T00:00:00.000Z"),
  },
  {
    title: "Trader Joe's",
    type: "EXPENSE",
    amount: 59.9,
    category: "Groceries",
    description: "Midweek grocery top-up",
    date: new Date("2024-04-28T18:10:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Logo Design Project",
    type: "INCOME",
    amount: 450,
    category: "Freelance",
    description: "Logo and branding for new brand",
    date: new Date("2024-04-03T09:30:00.000Z"),
    paymentMethod: "BANK_TRANSFER",
    isRecurring: false,
  },
  {
    title: "Starbucks Coffee",
    type: "EXPENSE",
    amount: 8.75,
    category: "Food & Drink",
    description: "Coffee with client",
    date: new Date("2024-04-04T08:50:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Amazon Purchase",
    type: "EXPENSE",
    amount: 129.99,
    category: "Shopping",
    description: "External hard drive",
    date: new Date("2024-04-07T14:20:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
  {
    title: "Dog Sitting Gig",
    type: "INCOME",
    amount: 120,
    category: "Side Hustle",
    description: "Weekend dog sitting",
    date: new Date("2024-04-08T19:00:00.000Z"),
    paymentMethod: "CASH",
    isRecurring: false,
  },
  {
    title: "Movie Night",
    type: "EXPENSE",
    amount: 19.5,
    category: "Entertainment",
    description: "Cinema ticket",
    date: new Date("2024-04-09T20:15:00.000Z"),
    paymentMethod: "CASH",
    isRecurring: false,
  },
  {
    title: "Gym Membership",
    type: "EXPENSE",
    amount: 55,
    category: "Fitness",
    description: "Monthly gym pass",
    date: new Date("2024-04-11T06:30:00.000Z"),
    paymentMethod: "AUTO_DEBIT",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2024-05-11T06:30:00.000Z"),
  },
  {
    title: "Twitch Donation",
    type: "INCOME",
    amount: 75,
    category: "Side Hustle",
    description: "Viewer tip for gaming stream",
    date: new Date("2024-04-14T21:45:00.000Z"),
    paymentMethod: "CASH",
    isRecurring: false,
  },
  {
    title: "Electricity Bill",
    type: "EXPENSE",
    amount: 92.6,
    category: "Utilities",
    description: "April power usage",
    date: new Date("2024-04-18T00:00:00.000Z"),
    paymentMethod: "AUTO_DEBIT",
    isRecurring: true,
    recurringInterval: "MONTHLY",
    nextRecurringDate: new Date("2024-05-18T00:00:00.000Z"),
  },
  {
    title: "Freelance UX Audit",
    type: "INCOME",
    amount: 850,
    category: "Freelance",
    description: "UI/UX audit for SaaS dashboard",
    date: new Date("2024-04-22T10:45:00.000Z"),
    paymentMethod: "BANK_TRANSFER",
    isRecurring: false,
  },
  {
    title: "Target Shopping",
    type: "EXPENSE",
    amount: 67.3,
    category: "Shopping",
    description: "Clothes and essentials",
    date: new Date("2024-04-27T15:25:00.000Z"),
    paymentMethod: "CARD",
    isRecurring: false,
  },
];

async function importTransactions() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    const user = await UserModel.findOne({ email: "salonimoga@gmail.com" });
    
    if (!user) {
      console.error("❌ User not found!");
      process.exit(1);
    }

    console.log(`✅ Found user: ${user.name} (${user._id})`);

    const deleteResult = await TransactionModel.deleteMany({ userId: user._id });
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing transactions`);

    // Transform transactions with mapped categories
    const transactionsWithUserId = transactionsData.map((tx, index) => {
      const amountInCents = Math.round(tx.amount * 100);
      const mappedCategory = mapCategory(tx.category);
      const mappedPaymentMethod = mapPaymentMethod(tx.paymentMethod);
      
      console.log(`${index + 1}. "${tx.category}" → "${mappedCategory}" | ${tx.paymentMethod} → "${mappedPaymentMethod}"`);
      
      return {
        title: tx.title,
        type: tx.type === "INCOME" ? TransactionTypeEnum.INCOME : TransactionTypeEnum.EXPENSE,
        amount: amountInCents,
        category: mappedCategory,
        description: tx.description || "",
        date: tx.date,
        paymentMethod: mappedPaymentMethod,
        isRecurring: tx.isRecurring || false,
        recurringInterval: tx.recurringInterval ? RecurringIntervalEnum[tx.recurringInterval as keyof typeof RecurringIntervalEnum] : null,
        nextRecurringDate: tx.nextRecurringDate || null,
        userId: user._id,
        status: TransactionStatusEnum.COMPLETED,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const batchSize = 20;
    let inserted = 0;
    
    for (let i = 0; i < transactionsWithUserId.length; i += batchSize) {
      const batch = transactionsWithUserId.slice(i, i + batchSize);
      const result = await TransactionModel.insertMany(batch);
      inserted += result.length;
      console.log(`📦 Inserted batch ${i / batchSize + 1}: ${result.length} transactions`);
    }

    console.log(`\n✅ Successfully inserted ${inserted} transactions for ${user.email}`);

    const totalIncome = transactionsWithUserId
      .filter(tx => tx.type === TransactionTypeEnum.INCOME)
      .reduce((sum, tx) => sum + (tx.amount / 100), 0);
    
    const totalExpense = transactionsWithUserId
      .filter(tx => tx.type === TransactionTypeEnum.EXPENSE)
      .reduce((sum, tx) => sum + (tx.amount / 100), 0);

    console.log(`\n📊 Summary:`);
    console.log(`   Total Income: $${totalIncome.toFixed(2)}`);
    console.log(`   Total Expenses: $${totalExpense.toFixed(2)}`);
    console.log(`   Net Balance: $${(totalIncome - totalExpense).toFixed(2)}`);

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

importTransactions();