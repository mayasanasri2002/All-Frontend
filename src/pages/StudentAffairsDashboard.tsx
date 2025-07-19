import StudentAffairsNavbar from "@/components/StudentAffairsNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, UserX, Users, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function StudentAffairsDashboard() {
  const quickStats = [
    { label: "New Registrations", value: "24", icon: UserPlus, color: "text-green-600" },
    { label: "Freeze/Withdraw Requests", value: "7", icon: UserX, color: "text-orange-600" },
    { label: "Total Active Students", value: "1,247", icon: Users, color: "text-blue-600" },
  ];

  const serviceCards = [
    {
      title: "Register New Student",
      description: "Add new students to the system with complete enrollment data",
      icon: UserPlus,
      href: "/student-affairs/register",
      color: "border-green-200 hover:border-green-300",
      badge: "Quick Access"
    },
    {
      title: "Freeze/Withdraw Semester Requests",
      description: "Process student requests for semester freezing or withdrawal",
      icon: UserX,
      href: "/student-affairs/freeze-withdraw",
      color: "border-orange-200 hover:border-orange-300",
      badge: "7 Pending"
    },

  ];

  return (
    <div className="min-h-screen bg-background">
      <StudentAffairsNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Student Affairs!</h1>
          <p className="text-muted-foreground">Manage student registrations, semester requests, and academic support services.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="academic-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className={`academic-card ${service.color} transition-all duration-200 hover:shadow-academic-lg group`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      {service.badge}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full academic-button">
                    <Link to={service.href}>
                      Access {service.title}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="academic-card mt-8">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <CardDescription>Latest student affairs activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-foreground">New Student Registered</p>
                  <p className="text-xs text-muted-foreground">Ahmed Hassan - Computer Science - 1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-foreground">Semester Freeze Request</p>
                  <p className="text-xs text-muted-foreground">Sarah Ahmed - Medical reasons - 3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-foreground">Course Withdrawal from Dean</p>
                  <p className="text-xs text-muted-foreground">Advanced Mathematics - Approved - 5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}