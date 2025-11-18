/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/app/slices/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Box } from "@mui/material";
import {
  Building,
  Copy,
  DollarSign,
  Menu,

  PieChart,
  Shield,
  User
} from "lucide-react";
import { useEffect, useState } from "react";

const DeveloperDashboard = () => {

  const getProfile = useAppSelector((state) => state.devProfile);
  const [activeTab, setActiveTab] = useState<
    "profile" | "company" | "banking" | "analytics" | "security" | "access-logs"
  >("profile");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State management for all data (same as before)
  const [profileData, setProfileData] = useState({
    displayName: "John Doe Games",
    email: "john@doegames.com",
    website: "https://doegames.com",
    companyName: "Doe Games LLC",
    bio: "Independent game developer specializing in casual games",
    portfolioUrls: ["https://portfolio1.com", "https://portfolio2.com"],
  });

  const [companyData, setCompanyData] = useState({
    companyName: "Doe Games LLC",
    registrationNumber: "LLC123456",
    taxId: "TAX123456789",
    taxCountry: "United States",
    verificationStatus: "verified",
    commissionRate: 70,
  });

  const [bankingData, setBankingData] = useState({
    bankName: "Developer Bank",
    accountName: "Doe Games LLC",
    accountNumber: "****1234",
    swiftCode: "DEVBNK22",
    paymentMethod: "Bank Transfer",
  });

  useEffect(() => {
    if (getProfile.loading === false && getProfile.data) {
      setProfileData({
        bio: "Independent game developer specializing in casual games",
        companyName: getProfile.data.companyName,
        displayName: getProfile.data.userId.firstName + " " + getProfile.data.userId.lastName,
        email: getProfile.data.userId.email,
        website: getProfile.data.website,
        portfolioUrls: getProfile.data.portfolioUrls,
      });


   
    }

  }, [getProfile]);

  const [analyticsData] = useState({
    totalRevenue: 50000,
    totalGames: 5,
    averageRating: 4.5,
    totalPlays: 100000,
    revenueBreakdown: {
      subscriptions: 30000,
      inGamePurchases: 15000,
      bonuses: 5000,
    },
  });

  const [accessLogs] = useState([
    {
      date: new Date(),
      ip: "192.168.1.100",
      device: "Chrome on Windows",
      action: "Profile Update",
    },
    {
      date: new Date(),
      ip: "10.0.0.5",
      device: "Safari on macOS",
      action: "Banking Info Update",
    },
  ]);

  const handleProfileUpdate = () => {
    setAlertTitle("Profile Updated");
    setAlertDescription(
      "Your developer profile has been successfully updated."
    );
    setAlertOpen(true);
  };

  const NavButton = ({
    tab,
    icon: Icon,
    label,
  }: {
    tab: string;
    icon: any;
    label: string;
  }) => (
    <Button
      variant={activeTab === tab ? "secondary" : "outline"}
      onClick={() => {
        setActiveTab(tab as any);
        setIsMobileMenuOpen(false);
      }}
      className="w-full md:w-auto justify-start md:justify-center"
    >
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
    </Button>
  );

  const Navigation = () => (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden w-full flex justify-between items-center mb-4">
        <Button
          variant="outline"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <span className="font-semibold">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </span>
      </div>

      {/* Navigation Buttons */}
      <div
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-6`}
      >
        <NavButton tab="profile" icon={User} label="Profile" />
        <NavButton tab="company" icon={Building} label="Company" />
        <NavButton tab="banking" icon={DollarSign} label="Banking" />
        <NavButton tab="analytics" icon={PieChart} label="Analytics" />
        <NavButton tab="security" icon={Shield} label="Security" />
        <NavButton tab="access-logs" icon={Copy} label="Access Logs" />
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={profileData.displayName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    displayName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={profileData.website}
                onChange={(e) =>
                  setProfileData({ ...profileData, website: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Button onClick={handleProfileUpdate} className="w-full">
                Save Profile Changes
              </Button>
            </div>
          </div>
        );

      case "company":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyData.companyName}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    companyName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                value={companyData.registrationNumber}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    registrationNumber: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="taxId">Tax ID</Label>
              <Input
                id="taxId"
                value={companyData.taxId}
                onChange={(e) =>
                  setCompanyData({ ...companyData, taxId: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="taxCountry">Tax Country</Label>
              <Input
                id="taxCountry"
                value={companyData.taxCountry}
                onChange={(e) =>
                  setCompanyData({ ...companyData, taxCountry: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Button onClick={handleProfileUpdate} className="w-full">
                Update Company Information
              </Button>
            </div>
          </div>
        );

      case "banking":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={bankingData.bankName}
                onChange={(e) =>
                  setBankingData({ ...bankingData, bankName: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                value={bankingData.accountName}
                onChange={(e) =>
                  setBankingData({
                    ...bankingData,
                    accountName: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={bankingData.accountNumber}
                type="password"
                onChange={(e) =>
                  setBankingData({
                    ...bankingData,
                    accountNumber: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="swiftCode">SWIFT Code</Label>
              <Input
                id="swiftCode"
                value={bankingData.swiftCode}
                onChange={(e) =>
                  setBankingData({ ...bankingData, swiftCode: e.target.value })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Button onClick={handleProfileUpdate} className="w-full">
                Update Banking Information
              </Button>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl md:text-2xl font-bold">
                    ${analyticsData.totalRevenue.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">
                    Total Games
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl md:text-2xl font-bold">
                    {analyticsData.totalGames}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">
                    Average Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl md:text-2xl font-bold">
                    {analyticsData.averageRating} / 5.0
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm md:text-base">
                    Total Plays
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl md:text-2xl font-bold">
                    {analyticsData.totalPlays.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "access-logs":
        return (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="whitespace-nowrap">Date</TableCell>
                  <TableCell className="whitespace-nowrap">
                    IP Address
                  </TableCell>
                  <TableCell className="whitespace-nowrap">Device</TableCell>
                  <TableCell className="whitespace-nowrap">Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap">
                      {log.date.toLocaleString()}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {log.ip}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {log.device}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {log.action}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div className=" bg-gray-50  mx-auto px-4 py-8 min-h-screen">
      <div className="px-4 md:px-6 mx-auto  w-full ">
        <Card className="w-full container ">
          <CardHeader>
            <CardTitle>Developer Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Navigation />
            {renderContent()}
          </CardContent>
        </Card>

        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogAction className="hidden">
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setAlertOpen(false)}>
                Close
              </Button>
            </div>
          </AlertDialogAction>
        </AlertDialog>
      </div>
    </div>
    </Box>
    </div>
  );
};

export default DeveloperDashboard;
