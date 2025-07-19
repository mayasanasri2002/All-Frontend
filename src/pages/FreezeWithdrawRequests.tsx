import StudentAffairsNavbar from "@/components/StudentAffairsNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Upload, Calendar, UserCheck } from "lucide-react";

export default function FreezeWithdrawRequests() {
  const { toast } = useToast();
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    requestType: "",
    semester: "",
    reason: "",
    effectiveDate: "",
    documents: null as File | null
  });

  // Mock student search results
  const mockStudents = [
    { id: "STU001", name: "Ahmed Hassan", nationalId: "123456789", faculty: "Computer Science", currentSemester: "Fall 2024" },
    { id: "STU002", name: "Sarah Ahmed", nationalId: "987654321", faculty: "Engineering", currentSemester: "Fall 2024" },
    { id: "STU003", name: "Mohammed Ali", nationalId: "456789123", faculty: "Business", currentSemester: "Fall 2024" },
  ];

  // Mock existing requests
  const mockRequests = [
    {
      id: 1,
      studentName: "Ahmed Hassan",
      studentId: "STU001",
      type: "Freeze Semester",
      dateSubmitted: "2024-01-15",
      status: "Pending",
      decisionDate: null,
      processedBy: null,
      reason: "Medical reasons"
    },
    {
      id: 2,
      studentName: "Sarah Ahmed",
      studentId: "STU002",
      type: "Withdraw Semester",
      dateSubmitted: "2024-01-12",
      status: "Approved",
      decisionDate: "2024-01-14",
      processedBy: "Dr. Smith",
      reason: "Financial difficulties"
    },
    {
      id: 3,
      studentName: "Mohammed Ali",
      studentId: "STU003",
      type: "Freeze Semester",
      dateSubmitted: "2024-01-10",
      status: "Rejected",
      decisionDate: "2024-01-13",
      processedBy: "Dr. Johnson",
      reason: "Personal reasons"
    },
  ];

  const handleStudentSearch = (query: string) => {
    setSearchQuery(query);
    // In real implementation, this would trigger API search
  };

  const handleStudentSelect = (student: any) => {
    setSelectedStudent(student);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent || !formData.requestType || !formData.semester || !formData.reason) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: `${formData.requestType} request submitted for ${selectedStudent.name}.`,
    });

    // Reset form
    setFormData({
      requestType: "",
      semester: "",
      reason: "",
      effectiveDate: "",
      documents: null
    });
    setSelectedStudent(null);
    setShowNewRequest(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      "Pending": "default",
      "Approved": "secondary",
      "Rejected": "destructive"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentAffairsNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Freeze/Withdraw Semester Requests</h1>
            <p className="text-muted-foreground">Manage student semester freeze and withdrawal requests.</p>
          </div>
          <Button 
            onClick={() => setShowNewRequest(!showNewRequest)}
            className="academic-button flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>

        {/* New Request Form */}
        {showNewRequest && (
          <Card className="academic-card mb-8">
            <CardHeader>
              <CardTitle>Create New Freeze/Withdraw Request</CardTitle>
              <CardDescription>Search for a student and create a new semester request</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Search */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Student Search</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studentSearch">Search Student *</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="studentSearch"
                        placeholder="Search by name, student ID, or national ID..."
                        value={searchQuery}
                        onChange={(e) => handleStudentSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    {/* Search Results */}
                    {searchQuery && (
                      <div className="border border-border rounded-lg max-h-40 overflow-y-auto">
                        {mockStudents
                          .filter(student => 
                            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            student.nationalId.includes(searchQuery)
                          )
                          .map(student => (
                            <div
                              key={student.id}
                              className="p-3 hover:bg-accent cursor-pointer border-b border-border last:border-b-0"
                              onClick={() => handleStudentSelect(student)}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-foreground">{student.name}</p>
                                  <p className="text-sm text-muted-foreground">ID: {student.id} | {student.faculty}</p>
                                </div>
                                <UserCheck className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    )}
                  </div>
                  
                  {/* Selected Student Summary */}
                  {selectedStudent && (
                    <Card className="bg-accent/50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-foreground mb-2">Selected Student</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><strong>Name:</strong> {selectedStudent.name}</p>
                            <p><strong>ID:</strong> {selectedStudent.id}</p>
                          </div>
                          <div>
                            <p><strong>Faculty:</strong> {selectedStudent.faculty}</p>
                            <p><strong>Current Semester:</strong> {selectedStudent.currentSemester}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Request Details */}
                {selectedStudent && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Request Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="requestType">Request Type *</Label>
                        <Select value={formData.requestType} onValueChange={(value) => setFormData(prev => ({ ...prev, requestType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select request type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Freeze Semester">Freeze Semester</SelectItem>
                            <SelectItem value="Withdraw Semester">Withdraw Semester</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="semester">Semester *</Label>
                        <Select value={formData.semester} onValueChange={(value) => setFormData(prev => ({ ...prev, semester: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                            <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                            <SelectItem value="Summer 2025">Summer 2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="effectiveDate">Effective Date</Label>
                        <Input
                          id="effectiveDate"
                          type="date"
                          value={formData.effectiveDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, effectiveDate: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason *</Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                        placeholder="Please provide a detailed reason for the request..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Supporting Documents</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <Label htmlFor="documents" className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                          Click to upload supporting documents
                        </Label>
                        <Input
                          id="documents"
                          type="file"
                          multiple
                          onChange={(e) => setFormData(prev => ({ ...prev, documents: e.target.files?.[0] || null }))}
                          className="hidden"
                        />
                        {formData.documents && (
                          <p className="text-sm text-green-600 mt-2">✓ {formData.documents.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedStudent && (
                  <div className="flex gap-4 pt-6">
                    <Button type="submit" className="academic-button flex-1">
                      Submit Request
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowNewRequest(false);
                        setSelectedStudent(null);
                        setFormData({
                          requestType: "",
                          semester: "",
                          reason: "",
                          effectiveDate: "",
                          documents: null
                        });
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        )}

        {/* Existing Requests Table */}
        <Card className="academic-card">
          <CardHeader>
            <CardTitle>Request Tracking</CardTitle>
            <CardDescription>View and manage all freeze/withdraw semester requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground">#</th>
                    <th className="text-left p-4 font-semibold text-foreground">Student</th>
                    <th className="text-left p-4 font-semibold text-foreground">Type</th>
                    <th className="text-left p-4 font-semibold text-foreground">Date Submitted</th>
                    <th className="text-left p-4 font-semibold text-foreground">Status</th>
                    <th className="text-left p-4 font-semibold text-foreground">Decision Date</th>
                    <th className="text-left p-4 font-semibold text-foreground">Processed By</th>
                    <th className="text-left p-4 font-semibold text-foreground">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRequests.map((request) => (
                    <tr key={request.id} className="border-b border-border hover:bg-accent/50">
                      <td className="p-4 text-foreground">{request.id}</td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{request.studentName}</p>
                          <p className="text-sm text-muted-foreground">{request.studentId}</p>
                        </div>
                      </td>
                      <td className="p-4 text-foreground">{request.type}</td>
                      <td className="p-4 text-foreground">{request.dateSubmitted}</td>
                      <td className="p-4">{getStatusBadge(request.status)}</td>
                      <td className="p-4 text-foreground">{request.decisionDate || "-"}</td>
                      <td className="p-4 text-foreground">{request.processedBy || "-"}</td>
                      <td className="p-4 text-muted-foreground">{request.reason}</td>
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
