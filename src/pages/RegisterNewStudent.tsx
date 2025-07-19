import StudentAffairsNavbar from "@/components/StudentAffairsNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Upload, Calendar } from "lucide-react";

export default function RegisterNewStudent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    nationalId: "",
    gender: "",
    email: "",
    mobile: "",
    address: "",
    highSchoolName: "",
    gpa: "",
    faculty: "",
    major: "",
    entryYear: "",
    entrySemester: "",
    transcript: null as File | null,
    profilePhoto: null as File | null
  });

  const faculties = [
    "Engineering",
    "Computer Science",
    "Business Administration",
    "Medicine",
    "Arts & Sciences",
    "Education"
  ];

  const majors = {
    "Engineering": ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering"],
    "Computer Science": ["Computer Science", "Information Systems", "Software Engineering"],
    "Business Administration": ["Accounting", "Marketing", "Finance", "Management"],
    "Medicine": ["General Medicine", "Pharmacy", "Nursing"],
    "Arts & Sciences": ["English Literature", "Mathematics", "Physics", "Chemistry"],
    "Education": ["Elementary Education", "Secondary Education", "Special Education"]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.faculty || !formData.major) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate successful registration
    toast({
      title: "Success!",
      description: `Student ${formData.fullName} registered successfully. Credentials have been emailed.`,
    });

    // Navigate to student details page (we'll create this)
    navigate(`/student-affairs/student-details/${formData.nationalId}`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'transcript' | 'profilePhoto') => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [type]: file }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentAffairsNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Register New Student</h1>
          <p className="text-muted-foreground">Add a new student to the university system with complete enrollment information.</p>
        </div>

        <Card className="academic-card">
          <CardHeader>
            <CardTitle>Student Registration Form</CardTitle>
            <CardDescription>Fill in all required information to register a new student</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Data Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nationalId">National ID/Passport No. *</Label>
                    <Input
                      id="nationalId"
                      value={formData.nationalId}
                      onChange={(e) => setFormData(prev => ({ ...prev, nationalId: e.target.value }))}
                      placeholder="Enter ID number"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="student@university.edu"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      value={formData.mobile}
                      onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                      placeholder="+1234567890"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Permanent Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter permanent address"
                    rows={3}
                  />
                </div>
              </div>

              {/* Academic Background */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Academic Background</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="highSchoolName">High School Name *</Label>
                    <Input
                      id="highSchoolName"
                      value={formData.highSchoolName}
                      onChange={(e) => setFormData(prev => ({ ...prev, highSchoolName: e.target.value }))}
                      placeholder="Enter high school name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gpa">High School GPA *</Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.0"
                      value={formData.gpa}
                      onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                      placeholder="3.50"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Upload High School Transcript (PDF) *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <Label htmlFor="transcript" className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                      Click to upload transcript or drag and drop
                    </Label>
                    <Input
                      id="transcript"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, 'transcript')}
                      className="hidden"
                    />
                    {formData.transcript && (
                      <p className="text-sm text-green-600 mt-2">✓ {formData.transcript.name}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Enrollment Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Enrollment Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="faculty">Faculty *</Label>
                    <Select value={formData.faculty} onValueChange={(value) => setFormData(prev => ({ ...prev, faculty: value, major: "" }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        {faculties.map(faculty => (
                          <SelectItem key={faculty} value={faculty}>{faculty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="major">Major *</Label>
                    <Select 
                      value={formData.major} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, major: value }))}
                      disabled={!formData.faculty}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select major" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.faculty && majors[formData.faculty as keyof typeof majors]?.map(major => (
                          <SelectItem key={major} value={major}>{major}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="entryYear">Entry Year *</Label>
                    <Select value={formData.entryYear} onValueChange={(value) => setFormData(prev => ({ ...prev, entryYear: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="entrySemester">Entry Semester *</Label>
                    <Select value={formData.entrySemester} onValueChange={(value) => setFormData(prev => ({ ...prev, entrySemester: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fall">Fall</SelectItem>
                        <SelectItem value="spring">Spring</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Profile Photo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Profile Photo</h3>
                
                <div className="space-y-2">
                  <Label>Upload Profile Photo (JPG/PNG)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <Label htmlFor="profilePhoto" className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                      Click to upload photo or drag and drop
                    </Label>
                    <Input
                      id="profilePhoto"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, 'profilePhoto')}
                      className="hidden"
                    />
                    {formData.profilePhoto && (
                      <p className="text-sm text-green-600 mt-2">✓ {formData.profilePhoto.name}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button type="submit" className="academic-button flex-1">
                  Register Student
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/student-affairs")}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}