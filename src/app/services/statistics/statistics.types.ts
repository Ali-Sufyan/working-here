/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StatisticsI {
  name: string;
  type: string;
  count: number;
  details: string;
  weeklyReport: Record<string, any>[];
}
