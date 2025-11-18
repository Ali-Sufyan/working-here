import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metric } from '@/components/ui/metric';
// import { Metric } from '@/components/ui/metric';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



const AnalyticsInsightsUI = () => {
  const [playerMetrics, setPlayerMetrics] = useState([
    {
      date: "2023-04-01",
      dailyActiveUsers: 1000,
      sessionDuration: 25,
      retentionRate: 80,
      churn: 5,
    },
    {
      date: "2023-04-02",
      dailyActiveUsers: 1050,
      sessionDuration: 27,
      retentionRate: 82,
      churn: 4,
    },
    {
      date: "2023-04-03",
      dailyActiveUsers: 1100,
      sessionDuration: 26,
      retentionRate: 81,
      churn: 3,
    },
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: 1.2,
    errorRate: 0.01,
    serverCPUUtilization: 60,
    serverMemoryUtilization: 70,
    clientFPS: 55,
  });

  useEffect(() => {
    // Fetch real-time metrics from an API
    const fetchMetrics = async () => {
      const playerMetricsResponse = await fetch("/api/player-metrics");
      const playerMetricsData = await playerMetricsResponse.json();
      setPlayerMetrics(playerMetricsData);

      const performanceMetricsResponse = await fetch(
        "/api/performance-metrics"
      );
      const performanceMetricsData = await performanceMetricsResponse.json();
      setPerformanceMetrics(performanceMetricsData);
    };

    fetchMetrics();
  }, []);

  return (
    <div className="min-h-screen">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight:"100vh",
          height: "100%",
        }}
      >
        <div className=" bg-gray-50  mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 mt-5">Analytics & Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Player Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Metric
                label="Daily Active Users"
                value={playerMetrics[playerMetrics.length - 1].dailyActiveUsers}
                trend={
                  playerMetrics[playerMetrics.length - 1].dailyActiveUsers >
                  playerMetrics[playerMetrics.length - 2].dailyActiveUsers
                    ? "up"
                    : "down"
                }
              />
              <Metric
                label="Session Duration"
                value={playerMetrics[playerMetrics.length - 1].sessionDuration}
                trend={
                  playerMetrics[playerMetrics.length - 1].sessionDuration >
                  playerMetrics[playerMetrics.length - 2].sessionDuration
                    ? "up"
                    : "down"
                }
              />
              <Metric
                label="Retention Rate"
                value={`${
                  playerMetrics[playerMetrics.length - 1].retentionRate
                }%`}
                trend={
                  playerMetrics[playerMetrics.length - 1].retentionRate >
                  playerMetrics[playerMetrics.length - 2].retentionRate
                    ? "up"
                    : "down"
                }
              />
              <Metric
                label="Churn Rate"
                value={`${playerMetrics[playerMetrics.length - 1].churn}%`}
                trend={
                  playerMetrics[playerMetrics.length - 1].churn <
                  playerMetrics[playerMetrics.length - 2].churn
                    ? "up"
                    : "down"
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Player Metrics Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={playerMetrics}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="dailyActiveUsers"
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey="sessionDuration"
                  stroke="#82ca9d"
                />
                <Line
                  type="monotone"
                  dataKey="retentionRate"
                  stroke="#ffc658"
                />
                <Line type="monotone" dataKey="churn" stroke="#ff6b6b" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Metric
                label="Load Time"
                value={`${performanceMetrics.loadTime} s`}
                trend={
                  performanceMetrics.loadTime <
                  performanceMetrics.loadTime - 0.1
                    ? "up"
                    : "down"
                }
              />
              <Metric
                label="Error Rate"
                value={`${(performanceMetrics.errorRate * 100).toFixed(2)}%`}
                trend={
                  performanceMetrics.errorRate <
                  performanceMetrics.errorRate - 0.005
                    ? "up"
                    : "down"
                }
              />
              <Metric
                label="Server CPU"
                value={`${performanceMetrics.serverCPUUtilization}%`}
                trend={
                  performanceMetrics.serverCPUUtilization <
                  performanceMetrics.serverCPUUtilization - 5
                    ? "up"
                    : "down"
                }
              />
              <Metric
                label="Server Memory"
                value={`${performanceMetrics.serverMemoryUtilization}%`}
                trend={
                  performanceMetrics.serverMemoryUtilization <
                  performanceMetrics.serverMemoryUtilization - 5
                    ? "up"
                    : "down"
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Metric
              label="Client FPS"
              value={performanceMetrics.clientFPS}
              trend={
                performanceMetrics.clientFPS > performanceMetrics.clientFPS - 5
                  ? "up"
                  : "down"
              }
            />
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">Detailed Reports</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Player Metrics Report</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Daily Active Users</TableCell>
                  <TableCell>Session Duration</TableCell>
                  <TableCell>Retention Rate</TableCell>
                  <TableCell>Churn</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playerMetrics.map((metric, index) => (
                  <TableRow key={index}>
                    <TableCell>{metric.date}</TableCell>
                    <TableCell>{metric.dailyActiveUsers}</TableCell>
                    <TableCell>{metric.sessionDuration}</TableCell>
                    <TableCell>{metric.retentionRate}%</TableCell>
                    <TableCell>{metric.churn}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics Report</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Trend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Load Time</TableCell>
                  <TableCell>{performanceMetrics.loadTime} s</TableCell>
                  <TableCell>
                    {performanceMetrics.loadTime <
                    performanceMetrics.loadTime - 0.1 ? (
                      <span className="text-green-500">Improving</span>
                    ) : (
                      <span className="text-red-500">Declining</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Error Rate</TableCell>
                  <TableCell>
                    {(performanceMetrics.errorRate * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell>
                    {performanceMetrics.errorRate <
                    performanceMetrics.errorRate - 0.005 ? (
                      <span className="text-green-500">Improving</span>
                    ) : (
                      <span className="text-red-500">Declining</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Server CPU</TableCell>
                  <TableCell>
                    {performanceMetrics.serverCPUUtilization}%
                  </TableCell>
                  <TableCell>
                    {performanceMetrics.serverCPUUtilization <
                    performanceMetrics.serverCPUUtilization - 5 ? (
                      <span className="text-green-500">Improving</span>
                    ) : (
                      <span className="text-red-500">Declining</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Server Memory</TableCell>
                  <TableCell>
                    {performanceMetrics.serverMemoryUtilization}%
                  </TableCell>
                  <TableCell>
                    {performanceMetrics.serverMemoryUtilization <
                    performanceMetrics.serverMemoryUtilization - 5 ? (
                      <span className="text-green-500">Improving</span>
                    ) : (
                      <span className="text-red-500">Declining</span>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Client FPS</TableCell>
                  <TableCell>{performanceMetrics.clientFPS}</TableCell>
                  <TableCell>
                    {performanceMetrics.clientFPS >
                    performanceMetrics.clientFPS - 5 ? (
                      <span className="text-green-500">Improving</span>
                    ) : (
                      <span className="text-red-500">Declining</span>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
    </Box>
    </div>
  );
};

export default AnalyticsInsightsUI;
