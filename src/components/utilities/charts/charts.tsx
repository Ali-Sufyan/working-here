 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Sector,
  Tooltip,
  XAxis
} from "recharts";

import { colorGenPlusOtherObj } from "../color-gen";
import { colorScheme } from "../color-scheme";
import { generateRandomData } from "./data";

export const dataForPie = [
  { name: "tier 1", value: 400 },
  { name: "tier 2", value: 300 },
  { name: "tier 3", value: 300 },
  { name: "tier 4", value: 200 },
  { name: "tier 5", value: 200 },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    /* value, */
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 12) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${(percent * 100).toFixed(2)}%`}</text>
      {/*  <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};

export function DoughnutChart(data: {
  data: {
    dat: Record<string, any>[];
    modData: Record<string, any>[];
    paddingToAdd: number;
    colorName: string;
  };
}) {
  const [chartWidth, setChartWidth] = useState(200); // Initial width
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const updateChartWidth = () => {
    const containerWidth =
      (Number(chartContainerRef?.current?.offsetWidth) - ((data.data.paddingToAdd) ?? 16 * 2));
    const newWidth = containerWidth; // Adjust for padding

    setChartWidth(newWidth);
  };

  useEffect(() => {
    updateChartWidth();

    window.addEventListener("resize", updateChartWidth);
    return () => {
      window.removeEventListener("resize", updateChartWidth);
    };
  }, [updateChartWidth]); // Run only once on mount and clean up on unmount

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div
      ref={chartContainerRef}
      style={{ width: "100%", position: "relative" }}
    >
      <PieChart width={chartWidth} height={chartWidth}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data.data.dat}
          cx={chartWidth / 2}
          cy={chartWidth / 2}
          innerRadius={chartWidth / 5}
          outerRadius={chartWidth / 3}
          fill="#000000"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.data.dat.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry[data.data.colorName]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export function CustomBarChart({
  data,
}: {
  data: {
    height: number;
    data: object[];
    dataArr: Record<string, any>[];
    fillName: string;
  };
}) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    handleResize(); // Initial sizing

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const barWidthPercentage = 80;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        margin: "0 auto",
        transition: "all 0.5s ease-in-out",
      }}
    >
      {/* Set the container width and center it using margin: 0 auto */}
      <BarChart
        width={containerWidth}
        style={{ transition: "all 0.15s ease-in-out" }}
        height={data.height}
        data={data.data}
        margin={{
          top: 20,
          right: 20,
          left: 10,
          bottom: 4,
        }}
      >
        <Tooltip  />

        <XAxis dataKey="name" hide={true} />

        {data.dataArr.map((item, index) => (
          <Bar
            style={{ transition: "all 0.5s ease-in-out" }}
            key={index}
            dataKey={item.dataKey}
            stackId={item.stackId}
            fill={item[data.fillName]}
            shape={<ResponsiveBarShape barSize={barWidthPercentage + "%"} />}
          />
        ))}
      </BarChart>
    </div>
  );
}

const ResponsiveBarShape = ({ barSize, ...rest }: Record<string, any>) => {
  const widthPercent = parseInt(barSize) || 100;
  return <rect width={`${widthPercent}%`} {...rest} />;
};

export const ChartBarChartContainer = ({
  child,
}: {
  child: { data: object[]; dataArr: Record<string, any>[]; fillName: string };
}) => {
  const [color, setColor] = useState(colorScheme.primary_lightest);
  useEffect(() => {}, [color]);
  return (
    <div
      onMouseEnter={() => {
        setColor(colorScheme.primary_dark);
      }}
      onMouseLeave={() => {
        setColor(colorScheme.primary_lightest);
      }}
      style={{
        width: "100%",
        margin: "0 auto",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <CustomBarChart
        data={{
          height: 110,
          data: child.data,
          dataArr: colorGenPlusOtherObj(child.dataArr, color, child.fillName),
          fillName: child.fillName,
        }}
      />
    </div>
  );
};

export const lineData = generateRandomData(10, [
  "tier1",
  "tier2",
  "tier3",
  "tier4",
  "tier5",
  "amt",
]);

export function CustomLineCharts({
  data,
}: {
  data: {
    height: number;
    data: object[];
    dataArr: Record<string, any>[];
    fillName: string;
  };
}) {
  const [opacity, setOpacity] = useState(
    data.dataArr.reduce((result, { dataKey }) => {
      result[dataKey] = 1;
      return result;
    }, {})
  );

  const handleMouseEnter = useCallback(
    (o: any) => {
      const { dataKey } = o;

      setOpacity({ ...opacity, [dataKey]: 0.5 });
    },
    [opacity, setOpacity]
  );

  const handleMouseLeave = useCallback(
    (o: any) => {
      const { dataKey } = o;
      setOpacity({ ...opacity, [dataKey]: 1 });
    },
    [opacity, setOpacity]
  );
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    handleResize(); // Initial sizing

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        margin: "0 auto",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <LineChart
        width={containerWidth}
        height={110}
        data={data.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" hide={true} />
  
        <Tooltip />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        {data.dataArr.map((item, index) => (
          <Line
            type="monotone"
            dataKey={item.dataKey}
            key={index}
            strokeOpacity={opacity.pv}
            stroke={item[data.fillName]}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </div>
  );
}

export const datas = [
  {
    name: "j",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "f",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "m",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "a",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "m",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "j",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "j",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },

  {
    name: "k",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },

  {
    name: "l",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
