import DeanNavbar from "@/components/DeanNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Calendar, User, BookOpen, FileText } from "lucide-react";

export default function DeanCourseWithdrawal() {
  const { toast } = useToast();

  // Mock pending course withdrawal requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      studentName: "Omar Khalil",
      studentId: "STU005",
      faculty: "Engineering",
      courseName: "Advanced Mathematics",
      courseCode: "MATH301",
      instructor: "Dr. Smith",
      credits: 4,
      requestDate: "2024-01-15",
      reason: "Difficulty keeping up with course material. Student has been struggling despite additional tutoring sessions.",
      status: "Pending",
      requestedBy: "Student Affairs Office",
      coordinatorNote: "Student has attended all classes but performance is below average.",
      decisionDate: undefined,
      decisionBy: undefined
    },
    {
      id: 2,
      studentName: "Fatima Al-Zahra",
      studentId: "STU006",
      faculty: "Computer Science",
      courseName: "Database Systems",
      courseCode: "CS301",
      instructor: "Dr. Johnson",
      credits: 3,
      requestDate: "2024-01-14",
      reason: "Schedule conflict with mandatory lab sessions due to part-time work obligations.",
      status: "Pending",
      requestedBy: "Student Affairs Office",
      coordinatorNote: "Student is performing well but unable to attend required lab sessions.",
      decisionDate: undefined,
      decisionBy: undefined
    },
    {
      id: 3,
      studentName: "Hassan Mohammed",
      studentId: "STU007",
      faculty: "Business",
      courseName: "Financial Analysis",
      courseCode: "BUS201",
      instructor: "Dr. Brown",
      credits: 3,
      requestDate: "2024-01-13",
      reason: "Medical leave affecting attendance and performance.",
      status: "Approved",
      requestedBy: "Student Affairs Office",
      decisionDate: "2024-01-16",
      decisionBy: "Dean Office"
    }
  ]);

  const handleApproval = (requestId: number, decision: 'approved' | 'rejected') => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: decision === 'approved' ? 'Approved' : 'Rejected',
            decisionDate: new Date().toISOString().split('T')[0],
            decisionBy: "Dean Office"
          }
        : request
    ));

    const request = requests.find(r => r.id === requestId);
    
    toast({
      title: decision === 'approved' ? "Request Approved" : "Request Rejected",
      description: `Course withdrawal ${decision} for ${request?.studentName}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      "Pending": "default",
      "Approved": "secondary",
      "Rejected": "destructive"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const processedRequests = requests.filter(r => r.status !== 'Pending');

  return (
    <div className="min-h-screen bg-background">
      <DeanNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Course Withdrawal Approvals</h1>
          <p className="text-muted-foreground">Review and approve individual course withdrawal requests from Student Affairs.</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="academic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                  <p className="text-2xl font-bold text-foreground">{pendingRequests.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="academic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved Today</p>
                  <p className="text-2xl font-bold text-foreground">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="academic-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Processed</p>
                  <p className="text-2xl font-bold text-foreground">{processedRequests.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Requests */}
        <Card className="academic-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Pending Approval Requests
            </CardTitle>
            <CardDescription>Course withdrawal requests awaiting your decision</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingRequests.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No pending course withdrawal requests</p>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Student & Course Info */}
                        <div className="lg:col-span-2 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {request.studentName}
                              </h3>
                              <p className="text-sm text-muted-foreground">ID: {request.studentId} | Faculty: {request.faculty}</p>
                            </div>
                            {getStatusBadge(request.status)}
                          </div>
                          
                          <div className="bg-accent/30 p-4 rounded-lg">
                            <h4 className="font-medium text-foreground flex items-center gap-2 mb-2">
                              <BookOpen className="h-4 w-4" />
                              Course Information
                            </h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p><strong>Course:</strong> {request.courseName}</p>
                                <p><strong>Code:</strong> {request.courseCode}</p>
                              </div>
                              <div>
                                <p><strong>Instructor:</strong> {request.instructor}</p>
                                <p><strong>Credits:</strong> {request.credits}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Withdrawal Reason</h4>
                            <p className="text-sm text-muted-foreground bg-background p-3 rounded border">
                              {request.reason}
                            </p>
                          </div>
                          
                          {request.coordinatorNote && (
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Coordinator Note</h4>
                              <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded border border-blue-200">
                                {request.coordinatorNote}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Request Details & Actions */}
                        <div className="space-y-4">
                          <div className="bg-background p-4 rounded-lg border">
                            <h4 className="font-medium text-foreground mb-3">Request Details</h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Requested by:</strong> {request.requestedBy}</p>
                              <p><strong>Date:</strong> {request.requestDate}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Button
                              onClick={() => handleApproval(request.id, 'approved')}
                              className="w-full academic-button flex items-center gap-2"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve Withdrawal
                            </Button>
                            <Button
                              onClick={() => handleApproval(request.id, 'rejected')}
                              variant="destructive"
                              className="w-full flex items-center gap-2"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Processed Requests */}
        <Card className="academic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Processed Requests
            </CardTitle>
            <CardDescription>Recently processed course withdrawal requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground">Student</th>
                    <th className="text-left p-4 font-semibold text-foreground">Course</th>
                    <th className="text-left p-4 font-semibold text-foreground">Request Date</th>
                    <th className="text-left p-4 font-semibold text-foreground">Decision Date</th>
                    <th className="text-left p-4 font-semibold text-foreground">Status</th>
                    <th className="text-left p-4 font-semibold text-foreground">Processed By</th>
                  </tr>
                </thead>
                <tbody>
                  {processedRequests.map((request) => (
                    <tr key={request.id} className="border-b border-border hover:bg-accent/50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{request.studentName}</p>
                          <p className="text-sm text-muted-foreground">{request.studentId}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{request.courseName}</p>
                          <p className="text-sm text-muted-foreground">{request.courseCode}</p>
                        </div>
                      </td>
                      <td className="p-4 text-foreground">{request.requestDate}</td>
                      <td className="p-4 text-foreground">{request.decisionDate}</td>
                      <td className="p-4">{getStatusBadge(request.status)}</td>
                      <td className="p-4 text-foreground">{request.decisionBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}