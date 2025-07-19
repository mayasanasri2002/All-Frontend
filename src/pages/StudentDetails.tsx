import { useParams, useNavigate } from "react-router-dom";
import StudentAffairsNavbar from "@/components/StudentAffairsNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, Mail, Phone, MapPin, GraduationCap, Calendar, FileText } from "lucide-react";

export default function StudentDetails() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  // Mock student data - in real implementation, fetch based on studentId
  const student = {
    id: "STU001",
    fullName: "Ahmed Hassan",
    nationalId: "123456789",
    email: "ahmed.hassan@university.edu",
    mobile: "+1234567890",
    address: "123 Main Street, City, Country",
    dateOfBirth: "1999-05-15",
    gender: "Male",
    highSchoolName: "Cairo High School",
    gpa: "3.85",
    faculty: "Computer Science",
    major: "Computer Science",
    entryYear: "2024",
    entrySemester: "Fall",
    currentSemester: "Fall 2024",
    academicYear: "1st Year",
    status: "Active",
    profilePhoto: "/placeholder-avatar.jpg",
    registrationDate: "2024-01-15",
    credentials: {
      username: "ahmed.hassan",
      tempPassword: "temp123456",
      emailSent: true,
      smsSent: true
    }
  };

  const handleEdit = () => {
    navigate(`/student-affairs/edit-student/${studentId}`);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      // Handle deletion logic here
      navigate("/student-affairs");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentAffairsNavbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Details</h1>
            <p className="text-muted-foreground">Complete information for {student.fullName}</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleEdit} className="academic-button flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button onClick={handleDelete} variant="destructive" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Registration Success Banner */}
        <Card className="academic-card mb-8 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">Registration Successful!</h3>
                <p className="text-green-700">Student {student.fullName} has been successfully registered. Login credentials have been sent via email and SMS.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="academic-card">
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={student.profilePhoto} alt={student.fullName} />
                  <AvatarFallback className="text-lg">{student.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{student.fullName}</CardTitle>
                <CardDescription>Student ID: {student.id}</CardDescription>
                <Badge variant="secondary" className="mt-2">{student.status}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{student.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{student.mobile}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <span className="text-sm text-foreground">{student.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Registered: {student.registrationDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Credentials Card */}
            <Card className="academic-card mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Login Credentials</CardTitle>
                <CardDescription>System-generated login information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Username</Label>
                  <p className="text-foreground font-mono">{student.credentials.username}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Temporary Password</Label>
                  <p className="text-foreground font-mono">{student.credentials.tempPassword}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${student.credentials.emailSent ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-foreground">Email sent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${student.credentials.smsSent ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-foreground">SMS sent</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="academic-card">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                    <p className="text-foreground">{student.fullName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">National ID</Label>
                    <p className="text-foreground">{student.nationalId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
                    <p className="text-foreground">{student.dateOfBirth}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
                    <p className="text-foreground">{student.gender}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                    <p className="text-foreground">{student.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="academic-card">
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Faculty</Label>
                    <p className="text-foreground">{student.faculty}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Major</Label>
                    <p className="text-foreground">{student.major}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Entry Year</Label>
                    <p className="text-foreground">{student.entryYear}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Entry Semester</Label>
                    <p className="text-foreground">{student.entrySemester}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Current Semester</Label>
                    <p className="text-foreground">{student.currentSemester}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Academic Year</Label>
                    <p className="text-foreground">{student.academicYear}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Background */}
            <Card className="academic-card">
              <CardHeader>
                <CardTitle>Academic Background</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">High School</Label>
                    <p className="text-foreground">{student.highSchoolName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">High School GPA</Label>
                    <p className="text-foreground">{student.gpa}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Documents</Label>
                  <div className="flex items-center space-x-2 p-3 bg-accent/30 rounded-lg">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">High School Transcript.pdf</span>
                    <Button size="sm" variant="outline" className="ml-auto">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}