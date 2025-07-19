import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, UserCheck, BookOpen, Send } from "lucide-react";

export default function CourseWithdrawalRequests() {
  const { toast } = useToast();
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [reason, setReason] = useState("");

  // Mock student data with current courses
  const mockStudents = [
    { 
      id: "STU001", 
      name: "Ahmed Hassan", 
      nationalId: "123456789", 
      faculty: "Computer Science", 
      currentSemester: "Fall 2024",
      courses: [
        { code: "CS101", name: "Introduction to Programming", credits: 3, instructor: "Dr. Smith" },
        { code: "CS201", name: "Data Structures", credits: 3, instructor: "Dr. Johnson" },
        { code: "MATH201", name: "Calculus II", credits: 4, instructor: "Dr. Brown" },
        { code: "ENG102", name: "Technical Writing", credits: 2, instructor: "Dr. Davis" }
      ]
    },
    { 
      id: "STU002", 
      name: "Sarah Ahmed", 
      nationalId: "987654321", 
      faculty: "Engineering", 
      currentSemester: "Fall 2024",
      courses: [
        { code: "ENG101", name: "Engineering Mechanics", credits: 4, instructor: "Dr. Wilson" },
        { code: "MATH301", name: "Linear Algebra", credits: 3, instructor: "Dr. Miller" },
        { code: "PHYS201", name: "Physics II", credits: 4, instructor: "Dr. Taylor" }
      ]
    }
  ];

  // Mock pending requests from Dean
  const mockPendingRequests = [
    {
      id: 1,
      studentName: "Omar Khalil",
      studentId: "STU005",
      courseName: "Advanced Mathematics",
      courseCode: "MATH301",
      requestDate: "2024-01-15",
      reason: "Difficulty keeping up with course material",
      status: "Pending",
      requestedBy: "Dean Office"
    },
    {
      id: 2,
      studentName: "Fatima Al-Zahra",
      studentId: "STU006",
      courseName: "Organic Chemistry",
      courseCode: "CHEM201",
      requestDate: "2024-01-14",
      reason: "Schedule conflict with mandatory lab",
      status: "Approved",
      requestedBy: "Dean Office",
      processedDate: "2024-01-16"
    }
  ];

  const handleStudentSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStudentSelect = (student: any) => {
    setSelectedStudent(student);
    setSelectedCourses([]);
  };

  const handleCourseToggle = (courseCode: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseCode)
        ? prev.filter(code => code !== courseCode)
        : [...prev, courseCode]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent || selectedCourses.length === 0 || !reason.trim()) {
      toast({
        title: "Validation Error",
        description: "Please select a student, at least one course, and provide a reason.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: `Course withdrawal request sent to Dean for ${selectedStudent.name}.`,
    });

    // Reset form
    setSelectedStudent(null);
    setSelectedCourses([]);
    setReason("");
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
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Course Withdrawal Requests</h1>
            <p className="text-muted-foreground">Manage individual course withdrawal requests and track Dean approvals.</p>
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
              <CardTitle>Create Course Withdrawal Request</CardTitle>
              <CardDescription>Search for a student and select courses to withdraw</CardDescription>
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

                {/* Course Selection */}
                {selectedStudent && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Select Courses to Withdraw</h3>
                    
                    <div className="grid gap-4">
                      {selectedStudent.courses.map((course: any) => (
                        <Card key={course.code} className={`cursor-pointer transition-all ${selectedCourses.includes(course.code) ? 'border-primary bg-primary/5' : 'hover:bg-accent/50'}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <Checkbox
                                checked={selectedCourses.includes(course.code)}
                                onCheckedChange={() => handleCourseToggle(course.code)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <BookOpen className="h-4 w-4 text-primary" />
                                  <h4 className="font-semibold text-foreground">{course.code} - {course.name}</h4>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  <p>Credits: {course.credits} | Instructor: {course.instructor}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {selectedCourses.length > 0 && (
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <p className="text-sm font-medium text-primary">
                          Selected {selectedCourses.length} course(s) for withdrawal
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Reason */}
                {selectedCourses.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Withdrawal *</Label>
                    <Textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Please provide a detailed reason for the course withdrawal..."
                      rows={4}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                {selectedStudent && selectedCourses.length > 0 && (
                  <div className="flex gap-4 pt-6">
                    <Button type="submit" className="academic-button flex-1 flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send to Dean
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowNewRequest(false);
                        setSelectedStudent(null);
                        setSelectedCourses([]);
                        setReason("");
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

        {/* Pending Requests from Dean */}
        <Card className="academic-card">
          <CardHeader>
            <CardTitle>Course Withdrawal Requests Status</CardTitle>
            <CardDescription>Track course withdrawal requests and Dean decisions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground">Student</th>
                    <th className="text-left p-4 font-semibold text-foreground">Course</th>
                    <th className="text-left p-4 font-semibold text-foreground">Request Date</th>
                    <th className="text-left p-4 font-semibold text-foreground">Reason</th>
                    <th className="text-left p-4 font-semibold text-foreground">Status</th>
                    <th className="text-left p-4 font-semibold text-foreground">Processed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPendingRequests.map((request) => (
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
                      <td className="p-4 text-muted-foreground max-w-xs truncate">{request.reason}</td>
                      <td className="p-4">{getStatusBadge(request.status)}</td>
                      <td className="p-4 text-foreground">{request.processedDate || "-"}</td>
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