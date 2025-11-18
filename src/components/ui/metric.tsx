import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
type TrendDirection = "up" | "down";

interface MetricProps {
  label: string;
  value: string | number;
  trend: TrendDirection;
  className?: string;
}

const Metric: React.FC<MetricProps> = ({
  label,
  value,
  trend,
  className = "",
}) => {
  const isTrendUp = trend === "up";

  return (
    <Card className={`${className}`}>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-500">{label}</p>

          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>

            <div className="flex items-center gap-1">
              {isTrendUp ? (
                <ArrowUpIcon
                  className="w-4 h-4 text-green-500"
                  aria-label="Increasing trend"
                />
              ) : (
                <ArrowDownIcon
                  className="w-4 h-4 text-red-500"
                  aria-label="Decreasing trend"
                />
              )}
              <span
                className={`text-sm font-medium ${
                  isTrendUp ? "text-green-500" : "text-red-500"
                }`}
              >
                {isTrendUp ? "Up" : "Down"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { Metric };

