import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RevenueAndPaymentsUI = () => {
  const [revenueData, setRevenueData] = useState([
    { date: "2023-04-01", revenue: 10000, pending: 2000 },
    { date: "2023-04-02", revenue: 12000, pending: 3000 },
    { date: "2023-04-03", revenue: 11500, pending: 2500 },
    { date: "2023-04-04", revenue: 13000, pending: 2800 },
    { date: "2023-04-05", revenue: 12800, pending: 3200 },
  ]);

  const [withdrawalData, setWithdrawalData] = useState([
    { date: "2023-03-25", amount: 5000, status: "Completed" },
    { date: "2023-04-01", amount: 3000, status: "Pending" },
    { date: "2023-04-10", amount: 4500, status: "Pending" },
    { date: "2023-04-15", amount: 2800, status: "Completed" },
    { date: "2023-04-20", amount: 3600, status: "Pending" },
  ]);

  const [bankAccount, setBankAccount] = useState({
    accountHolder: "John Doe",
    bankName: "Wells Fargo",
    accountNumber: "1234567890",
    routingNumber: "123456789",
  });

  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [withdrawalStatus, setWithdrawalStatus] = useState<
    "Pending" | "Completed"
  >("Pending");
  // const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenueRes, withdrawalRes, bankRes] = await Promise.all([
          fetch("/api/revenue-data"),
          fetch("/api/withdrawal-data"),
          fetch("/api/bank-account"),
        ]);

        const [revenueData, withdrawalData, bankData] = await Promise.all([
          revenueRes.json(),
          withdrawalRes.json(),
          bankRes.json(),
        ]);

        setRevenueData(revenueData);
        setWithdrawalData(withdrawalData);
        setBankAccount(bankData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleWithdrawalRequest = () => {
    if (!withdrawalAmount) return;

    setWithdrawalData([
      ...withdrawalData,
      {
        date: new Date().toISOString().split("T")[0],
        amount: withdrawalAmount,
        status: "Pending",
      },
    ]);
    setWithdrawalAmount(0);
  };

  const totalRevenue = revenueData.reduce(
    (total, data) => total + data.revenue,
    0
  );
  const totalPending = revenueData.reduce(
    (total, data) => total + data.pending,
    0
  );

  return (
    <div className="min-h-screen">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight:"100vh",
          height: "100%",
          marginBottom:"50px"
        }}
      >
        <div className=" bg-gray-50  mx-auto px-4 py-8 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0 mt-5">
            Revenue & Payments
          </h1>
          <div className="flex space-x-4">
            <Button variant="outline">Export Data</Button>
            <Button>New Withdrawal</Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Total Revenue
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toLocaleString()}
                </span>
                <span className="text-sm text-green-600 mt-2">
                  ↑ 12% from last month
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">
                  Pending Payments
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ${totalPending.toLocaleString()}
                </span>
                <span className="text-sm text-yellow-600 mt-2">Processing</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 flex  justify-center text-white flex-wrap gap-4 !h-auto bg-gray-50">
            <TabsTrigger value="overview" className="px-6 py-1.5">Overview</TabsTrigger>
            <TabsTrigger value="withdrawals" className="px-6 py-1.5">Withdrawals</TabsTrigger>
            <TabsTrigger value="tax" className="px-6 py-1.5">Tax Information</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="pending"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Bank Account Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Account Holder</Label>
                        <p className="text-gray-900 font-medium">
                          {bankAccount.accountHolder}
                        </p>
                      </div>
                      <div>
                        <Label>Bank Name</Label>
                        <p className="text-gray-900 font-medium">
                          {bankAccount.bankName}
                        </p>
                      </div>
                      <div>
                        <Label>Account Number</Label>
                        <p className="text-gray-900 font-medium">
                          ****{bankAccount.accountNumber.slice(-4)}
                        </p>
                      </div>
                      <div>
                        <Label>Routing Number</Label>
                        <p className="text-gray-900 font-medium">
                          ****{bankAccount.routingNumber.slice(-4)}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4">
                      Update Bank Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Request Withdrawal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="withdrawal-amount">Amount</Label>
                      <Input
                        id="withdrawal-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={withdrawalAmount}
                        onChange={(e) =>
                          setWithdrawalAmount(parseFloat(e.target.value))
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Dropdown
                        label="Select Status"
                        value={withdrawalStatus}
                        onChange={(v: string) =>
                          setWithdrawalStatus(v as "Pending" | "Completed")
                        }
                        options={["Pending", "Completed"]}
                      />
                    </div>
                    <Button
                      onClick={handleWithdrawalRequest}
                      disabled={!withdrawalAmount}
                      className="w-full mt-4"
                    >
                      Submit Withdrawal Request
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white lg:col-span-2">
                <CardHeader>
                  <CardTitle>Withdrawal History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {withdrawalData.map((payment, index) => (
                          <TableRow key={index}>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>
                              ${payment.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-sm ${
                                  payment.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {payment.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tax">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Tax Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label>Total Revenue</Label>
                    <p className="text-2xl font-bold text-gray-900">$120,000</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label>Total Expenses</Label>
                    <p className="text-2xl font-bold text-gray-900">$80,000</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label>Taxable Income</Label>
                    <p className="text-2xl font-bold text-gray-900">$40,000</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label>Est. Tax Liability</Label>
                    <p className="text-2xl font-bold text-gray-900">$8,000</p>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button>Download Tax Documents</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </Box>
    </div>
  );
};

export default RevenueAndPaymentsUI;
