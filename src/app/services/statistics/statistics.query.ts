import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithTokenCheck from "../base.query";
import { StatisticsI } from "./statistics.types";

export const statisticsApi = createApi({
  reducerPath: "statisticsApi",
  baseQuery: baseQueryWithTokenCheck,
  endpoints: (builder) => ({
    getAllUsersStatistics: builder.query<StatisticsI[], void>({
      query: () => ({ url: "/statistics/user" }),
    }),
    getAllStaffStatistics: builder.query<StatisticsI[], void>({
      query: () => ({ url: "/statistics/staff" }),
    }),
    getAllNotificationStatistics: builder.query<StatisticsI[], void>({
      query: () => ({ url: "/statistics/notification" }),
    }),
    getAllSalesStatistics: builder.query<StatisticsI[], void>({
      query: () => ({ url: "/statistics/sales" }),
    }),
    getAllBranchSalesStatistics: builder.query<StatisticsI[], void>({
      query: () => ({ url: "/statistics/sales/branch" }),
    }),
    getAllBranchIcomeExpensesStatistics: builder.query<StatisticsI[], void>({
      query: () => ({ url: "/statistics/income-expense/branch" }),
    }),

  }),
});

export const {
  useGetAllNotificationStatisticsQuery,
  useGetAllStaffStatisticsQuery,
  useGetAllUsersStatisticsQuery,
  useGetAllSalesStatisticsQuery,
  useGetAllBranchSalesStatisticsQuery,
  useGetAllBranchIcomeExpensesStatisticsQuery,  
} = statisticsApi;



export const fakeStatistics = [
  {
    name: "active Subscribers",
    type: "user Metrics",
    count: 45280,
    details: "Total active subscribers this week",
    weeklyReport: [
      {
        name: "Monday",
        subscribers: 42500,
        earnings: 8500.0,
        playtime: 125000,
      },
      {
        name: "Tuesday",
        subscribers: 43200,
        earnings: 8640.0,
        playtime: 128000,
      },
      {
        name: "Wednesday",
        subscribers: 43800,
        earnings: 8760.0,
        playtime: 130000,
      },
      {
        name: "Thursday",
        subscribers: 44500,
        earnings: 8900.0,
        playtime: 132000,
      },
      {
        name: "Friday",
        subscribers: 45000,
        earnings: 9000.0,
        playtime: 135000,
      },
      {
        name: "Saturday",
        subscribers: 45280,
        earnings: 9056.0,
        playtime: 138000,
      },
      {
        name: "Sunday",
        subscribers: 45100,
        earnings: 9020.0,
        playtime: 136000,
      },
    ],
  },
  {
    name: "monthly Revenue $",
    type: "revenueMetrics",
    count: 168750,
    details: "Total revenue this month in USD",
    weeklyReport: [
      {
        name: "Monday",
        subscribers: 42500,
        earnings: 23500.5,
        premiumPurchases: 850,
      },
      {
        name: "Tuesday",
        subscribers: 43200,
        earnings: 24100.75,
        premiumPurchases: 875,
      },
      {
        name: "Wednesday",
        subscribers: 43800,
        earnings: 24500.25,
        premiumPurchases: 890,
      },
      {
        name: "Thursday",
        subscribers: 44500,
        earnings: 25100.6,
        premiumPurchases: 920,
      },
      {
        name: "Friday",
        subscribers: 45000,
        earnings: 26200.3,
        premiumPurchases: 960,
      },
      {
        name: "Saturday",
        subscribers: 45280,
        earnings: 27800.45,
        premiumPurchases: 1020,
      },
      {
        name: "Sunday",
        subscribers: 45100,
        earnings: 27500.8,
        premiumPurchases: 980,
      },
    ],
  },
  {
    name: "average Playtime",
    type: "engagementMetrics",
    count: 127,
    details: "Average minutes played per user daily",
    weeklyReport: [
      {
        name: "Monday",
        subscribers: 42500,
        avgMinutes: 122,
        totalSessions: 68000,
      },
      {
        name: "Tuesday",
        subscribers: 43200,
        avgMinutes: 125,
        totalSessions: 69500,
      },
      {
        name: "Wednesday",
        subscribers: 43800,
        avgMinutes: 126,
        totalSessions: 70200,
      },
      {
        name: "Thursday",
        subscribers: 44500,
        avgMinutes: 127,
        totalSessions: 71500,
      },
      {
        name: "Friday",
        subscribers: 45000,
        avgMinutes: 130,
        totalSessions: 73000,
      },
      {
        name: "Saturday",
        subscribers: 45280,
        avgMinutes: 135,
        totalSessions: 75500,
      },
      {
        name: "Sunday",
        subscribers: 45100,
        avgMinutes: 132,
        totalSessions: 74000,
      },
    ],
  },
  {
    name: "new Players",
    type: "acquisitionMetrics",
    count: 3240,
    details: "New player registrations this week",
    weeklyReport: [
      {
        name: "Monday",
        subscribers: 420,
        conversionRate: 2.8,
        marketingSource: "organic",
      },
      {
        name: "Tuesday",
        subscribers: 380,
        conversionRate: 2.6,
        marketingSource: "organic",
      },
      {
        name: "Wednesday",
        subscribers: 450,
        conversionRate: 3.0,
        marketingSource: "organic",
      },
      {
        name: "Thursday",
        subscribers: 480,
        conversionRate: 3.2,
        marketingSource: "organic",
      },
      {
        name: "Friday",
        subscribers: 520,
        conversionRate: 3.5,
        marketingSource: "organic",
      },
      {
        name: "Saturday",
        subscribers: 580,
        conversionRate: 3.8,
        marketingSource: "organic",
      },
      {
        name: "Sunday",
        subscribers: 410,
        conversionRate: 2.7,
        marketingSource: "organic",
      },
    ],
  },
 
];