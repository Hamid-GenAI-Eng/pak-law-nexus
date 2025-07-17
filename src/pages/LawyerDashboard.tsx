import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, 
  Users, 
  FileText, 
  Clock, 
  DollarSign, 
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Phone,
  Video,
  Settings,
  Bell,
  TrendingUp,
  BarChart3,
  Briefcase,
  User,
  MapPin,
  Star
} from "lucide-react";
import NavBar from "@/components/NavBar";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  caseType: string;
  status: 'active' | 'pending' | 'closed';
  priority: 'high' | 'medium' | 'low';
  lastContact: string;
}

interface Hearing {
  id: string;
  title: string;
  client: string;
  date: string;
  time: string;
  court: string;
  type: string;
  status: 'upcoming' | 'completed' | 'postponed';
}

interface Task {
  id: string;
  title: string;
  client: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const LawyerDashboard = () => {
  const [isLoggedIn] = useState(true);
  
  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'Ahmed Hassan',
      email: 'ahmed@email.com',
      phone: '+92-300-1234567',
      caseType: 'Property Dispute',
      status: 'active',
      priority: 'high',
      lastContact: '2024-01-15'
    },
    {
      id: '2',
      name: 'Fatima Khan',
      email: 'fatima@email.com',
      phone: '+92-301-2345678',
      caseType: 'Divorce Proceedings',
      status: 'active',
      priority: 'medium',
      lastContact: '2024-01-14'
    },
    {
      id: '3',
      name: 'Ali Raza',
      email: 'ali@email.com',
      phone: '+92-302-3456789',
      caseType: 'Business Contract',
      status: 'pending',
      priority: 'low',
      lastContact: '2024-01-13'
    }
  ]);

  const [hearings] = useState<Hearing[]>([
    {
      id: '1',
      title: 'Property Dispute Hearing',
      client: 'Ahmed Hassan',
      date: '2024-01-20',
      time: '10:00 AM',
      court: 'District Court Karachi',
      type: 'Civil',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Divorce Settlement',
      client: 'Fatima Khan',
      date: '2024-01-22',
      time: '2:00 PM',
      court: 'Family Court Lahore',
      type: 'Family',
      status: 'upcoming'
    }
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Prepare documentation for property case',
      client: 'Ahmed Hassan',
      deadline: '2024-01-18',
      priority: 'high',
      completed: false
    },
    {
      id: '2',
      title: 'Review contract terms',
      client: 'Ali Raza',
      deadline: '2024-01-19',
      priority: 'medium',
      completed: false
    },
    {
      id: '3',
      title: 'Client consultation call',
      client: 'Fatima Khan',
      deadline: '2024-01-17',
      priority: 'high',
      completed: true
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'postponed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <NavBar isLoggedIn={isLoggedIn} onLogout={() => {}} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Lawyer Dashboard</h1>
            <p className="text-gray-600">Manage your practice efficiently</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-emerald-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Clients</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+8% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">PKR 450K</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+15% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming Hearings</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <Clock className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-blue-600">Next: Tomorrow 10 AM</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-orange-600">3 due today</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="hearings">Hearings</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-emerald-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-emerald-700">
                    <Clock className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Case documentation completed</p>
                          <p className="text-xs text-gray-500">Ahmed Hassan - Property Dispute</p>
                          <p className="text-xs text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Client consultation scheduled</p>
                          <p className="text-xs text-gray-500">Fatima Khan - Divorce Proceedings</p>
                          <p className="text-xs text-gray-400">4 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <Calendar className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Court hearing reminder</p>
                          <p className="text-xs text-gray-500">Tomorrow at 10:00 AM</p>
                          <p className="text-xs text-gray-400">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Upcoming Hearings */}
              <Card className="border-emerald-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-emerald-700">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Hearings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-4">
                      {hearings.slice(0, 3).map((hearing) => (
                        <div key={hearing.id} className="p-4 border border-emerald-100 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{hearing.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{hearing.client}</p>
                              <div className="flex items-center mt-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{hearing.date} at {hearing.time}</span>
                              </div>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{hearing.court}</span>
                              </div>
                            </div>
                            <Badge className={getStatusColor(hearing.status)}>
                              {hearing.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-700">
                  <Users className="h-5 w-5 mr-2" />
                  Client Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="p-6 border border-emerald-100 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="bg-emerald-100 p-2 rounded-full">
                              <User className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{client.name}</h3>
                              <p className="text-sm text-gray-600">{client.caseType}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Email:</span>
                              <p className="font-medium">{client.email}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Phone:</span>
                              <p className="font-medium">{client.phone}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Last Contact:</span>
                              <p className="font-medium">{client.lastContact}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 mt-4 md:mt-0">
                          <Badge className={getStatusColor(client.status)}>
                            {client.status}
                          </Badge>
                          <Badge className={getPriorityColor(client.priority)}>
                            {client.priority}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hearings">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-700">
                  <Calendar className="h-5 w-5 mr-2" />
                  Court Hearings & Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hearings.map((hearing) => (
                    <div key={hearing.id} className="p-6 border border-emerald-100 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="bg-emerald-100 p-2 rounded-full">
                              <Briefcase className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{hearing.title}</h3>
                              <p className="text-sm text-gray-600">{hearing.type} - {hearing.client}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Date & Time:</span>
                              <p className="font-medium">{hearing.date} at {hearing.time}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Court:</span>
                              <p className="font-medium">{hearing.court}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Type:</span>
                              <p className="font-medium">{hearing.type}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 mt-4 md:mt-0">
                          <Badge className={getStatusColor(hearing.status)}>
                            {hearing.status}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Video className="h-4 w-4 mr-1" />
                              Join Online
                            </Button>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-700">
                  <FileText className="h-5 w-5 mr-2" />
                  Task Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className={`p-6 border rounded-lg transition-all ${
                      task.completed 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-emerald-100 hover:shadow-md'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            checked={task.completed}
                            className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <div className="flex-1">
                            <h3 className={`font-medium ${
                              task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                            }`}>
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-600">{task.client}</p>
                            <p className="text-sm text-gray-500">Due: {task.deadline}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          {task.completed && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-emerald-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-emerald-700">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Monthly Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">January 2024</span>
                      <span className="font-semibold">PKR 450,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <p className="text-sm text-gray-500">75% of monthly target achieved</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-emerald-700">
                    <Star className="h-5 w-5 mr-2" />
                    Client Satisfaction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average Rating</span>
                      <span className="font-semibold">4.8/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '96%'}}></div>
                    </div>
                    <p className="text-sm text-gray-500">Based on 48 client reviews</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LawyerDashboard;