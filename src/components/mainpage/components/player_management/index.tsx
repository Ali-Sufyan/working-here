/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Box } from "@mui/material";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const PlayerManagementUI = () => {
  const [playerProfiles, setPlayerProfiles] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      engagementLevel: "High",
      lastActive: "2024-04-10",
      status: "Online",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      engagementLevel: "Medium",
      lastActive: "2024-04-09",
      status: "Offline",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      engagementLevel: "Low",
      lastActive: "2024-04-08",
      status: "Online",
    },
  ]);

  const [playerFeedback, setPlayerFeedback] = useState([
    {
      id: 1,
      player: "John Doe",
      feedback: "Great game, really enjoying it!",
      date: "2024-04-10",
      sentiment: "Positive",
    },
    {
      id: 2,
      player: "Jane Smith",
      feedback: "Could use more content updates.",
      date: "2024-04-09",
      sentiment: "Neutral",
    },
    {
      id: 3,
      player: "Bob Johnson",
      feedback: "Struggling with the tutorial, need more guidance.",
      date: "2024-04-08",
      sentiment: "Negative",
    },
  ]);

  const [tickets, setTickets] = useState([
    {
      id: 1,
      player: "John Doe",
      subject: "Account issue",
      status: "Open",
      priority: "High",
      created: "2024-04-10",
    },
    {
      id: 2,
      player: "Jane Smith",
      subject: "Feature request",
      status: "Closed",
      priority: "Medium",
      created: "2024-04-09",
    },
    {
      id: 3,
      player: "Bob Johnson",
      subject: "Bug report",
      status: "Pending",
      priority: "Low",
      created: "2024-04-08",
    },
  ]);

  const [faqContent, setFaqContent] = useState("This is the FAQ content.");
  const [playerMessage, setPlayerMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("profiles");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profilesRes, feedbackRes, ticketsRes, faqRes] =
          await Promise.all([
            fetch("/api/player-profiles"),
            fetch("/api/player-feedback"),
            fetch("/api/support-tickets"),
            fetch("/api/faq-content"),
          ]);

        const [profiles, feedback, tickets, faq] = await Promise.all([
          profilesRes.json(),
          feedbackRes.json(),
          ticketsRes.json(),
          faqRes.json(),
        ]);

        setPlayerProfiles(profiles);
        setPlayerFeedback(feedback);
        setTickets(tickets);
        setFaqContent(faq.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePlayerMessage = () => {
    if (!playerMessage.trim()) return;
    console.log("Sending message:", playerMessage);
    setPlayerMessage("");
  };

  const getStatusColor = (status: any) => {
    const colors = {
      Online: "bg-green-100 text-green-800",
      Offline: "bg-gray-100 text-gray-800",
      High: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      Low: "bg-red-100 text-red-800",
      Open: "bg-blue-100 text-blue-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Closed: "bg-gray-100 text-gray-800",
      Positive: "bg-green-100 text-green-800",
      Neutral: "bg-yellow-100 text-yellow-800",
      Negative: "bg-red-100 text-red-800",
    };
    return colors[status as unknown as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          height: "100%",
          mb: "40px",
        }}
      >
        <div className=" bg-gray-50  mx-auto px-4 py-8 min-h-screen">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 mt-5">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              Player Management
            </h1>
            <div className="w-auto md:w-auto flex space-x-4">
              <div className="relative flex-1 md:flex-none">
                <Input
                  type="text"
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Button>Export Data</Button>
            </div>
          </div>

          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="space-y-6"
          >
            <TabsList className="w-full flex justify-center text-white flex-wrap gap-4 !h-auto bg-gray-50">
              <TabsTrigger value="profiles" className="px-6 py-1.5">Player Profiles</TabsTrigger>
              <TabsTrigger value="feedback" className="px-6 py-1.5">Feedback</TabsTrigger>
              <TabsTrigger value="support" className="px-6 py-1.5">Support</TabsTrigger>
              <TabsTrigger value="communication" className="px-6 py-1.5">Communication</TabsTrigger>
            </TabsList>
            <TabsContent value="profiles" className="container">
              <div className="grid grid-cols-1 gap-6">
                <Card className="container">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Player Profiles</span>
                      <Button variant="outline" size="sm">
                        Add Player
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell className="hidden md:table-cell">
                              Email
                            </TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Engagement</TableCell>
                            <TableCell className="hidden md:table-cell">
                              Last Active
                            </TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {playerProfiles.map((profile) => (
                            <TableRow key={profile.id}>
                              <TableCell className="font-medium">
                                {profile.name}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {profile.email}
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(profile.status)}>
                                  {profile.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={getStatusColor(
                                    profile.engagementLevel
                                  )}
                                >
                                  {profile.engagementLevel}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {profile.lastActive}
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  View
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

            <TabsContent value="feedback">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Player Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Player</TableCell>
                            <TableCell>Feedback</TableCell>
                            <TableCell>Sentiment</TableCell>
                            <TableCell className="hidden md:table-cell">
                              Date
                            </TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {playerFeedback.map((feedback) => (
                            <TableRow key={feedback.id}>
                              <TableCell className="font-medium">
                                {feedback.player}
                              </TableCell>
                              <TableCell className="max-w-md truncate">
                                {feedback.feedback}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={getStatusColor(feedback.sentiment)}
                                >
                                  {feedback.sentiment}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {feedback.date}
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  Respond
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

            <TabsContent value="support">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Support Tickets</span>
                      <Button variant="outline" size="sm">
                        Create Ticket
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Player</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell className="hidden md:table-cell">
                              Priority
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              Created
                            </TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                              <TableCell className="font-medium">
                                {ticket.player}
                              </TableCell>
                              <TableCell>{ticket.subject}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(ticket.status)}>
                                  {ticket.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <Badge
                                  className={getStatusColor(ticket.priority)}
                                >
                                  {ticket.priority}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {ticket.created}
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">
                                  View
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

            <TabsContent value="communication">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Player Communication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Textarea
                          placeholder="Type your message here..."
                          value={playerMessage}
                          onChange={(e) => setPlayerMessage(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Save Draft</Button>
                        <Button onClick={handlePlayerMessage}>
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>FAQ Editor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        value={faqContent}
                        onChange={(e) => setFaqContent(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Preview</Button>
                        <Button>Save FAQ</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div></Box>
    </div>
  );
};

export default PlayerManagementUI;
