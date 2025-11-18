/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartBarChartContainer, CustomLineCharts } from "./charts/charts";
import { colorGenPlusOtherObj } from "./color-gen";
import { colorScheme } from "./color-scheme";
import { CustomDashboardItemWithChart } from "./dash/utilities.dashboard";

export interface CustomChartI {
  name: string;
  icon: JSX.Element;
  amount: number;
  metadata?: string;

  avatar_color: string;
  show_currency?: boolean;
  show_chart?: boolean;
  chart: "line" | "bar" | "none";
  data: Record<string, any>[];
}

export function CustomChart(data: CustomChartI) {
  const showCurrency = data.show_currency ?? false;
  const dataArr =
    data.data && data.data[0] // Assuming data.data array is not empty
      ? Object.keys(data.data[0]) // Get keys from the first item
          .filter((key) => key !== "name") // Remove "name" key
          .map((dataKey) => ({ dataKey, stackId: "a" })) // Map to dataArr format
      : [];
  function fillChart() {
    switch (data.chart) {
      case "bar":
        return data.data && data.show_chart ? (
          <ChartBarChartContainer
            child={{ data: data.data, dataArr, fillName: "fill" }}
          />
        ) : null;
      case "line":
        return data.data && data.show_chart ? (
          <CustomLineCharts
            data={{
              data: data.data,
              dataArr: colorGenPlusOtherObj(
                dataArr,
                colorScheme.secondary_2,
                "fill",
                120,
                10,
                20
              ),
              fillName: "fill",
              height: 150,
            }}
          />
        ) : null;
      case "none":
        return null;
      default:
        return null;
    }
  }

  return (
    <CustomDashboardItemWithChart
      amount={data.amount}
      icon={data.icon}
      name={data.name}
      show_chart={data.show_chart}
      metadata={data.metadata}
      avatar_color={data.avatar_color}
      show_currency={showCurrency}
      chart={fillChart() ?? undefined}
    />
  );
}
