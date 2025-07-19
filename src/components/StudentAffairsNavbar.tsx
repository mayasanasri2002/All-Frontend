import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Home, UserPlus, UserX, BookX, Users } from "lucide-react";
import universityLogo from "@/assets/university-logo.png";

export default function StudentAffairsNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const navigationItems = [
    { href: "/student-affairs", label: "Dashboard", icon: Home },
    { href: "/student-affairs/register", label: "Register Student", icon: UserPlus },
    { href: "/student-affairs/freeze-withdraw", label: "Freeze/Withdraw", icon: UserX },
    
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 academic-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-3">
            <img 
              src={universityLogo} 
              alt="University Logo" 
              className="h-8 w-auto"
            />
            <div className="flex flex-col">
              <span className="font-bold text-foreground">University ERP</span>
              <span className="text-xs text-primary font-medium">Student Affairs</span>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border">
          <div className="grid grid-cols-4 gap-1 py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-md text-xs transition-colors
                    ${isActive 
                      ? 'text-primary bg-primary/10' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}