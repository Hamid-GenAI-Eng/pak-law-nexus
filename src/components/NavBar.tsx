import { Button } from "@/components/ui/button";
import { Scale, MessageCircle, FileText, Users, Newspaper, LogOut, Settings, Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavBarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const NavBar = ({ isLoggedIn, onLogout }: NavBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/chat', label: 'AI Assistant', icon: MessageCircle },
    { path: '/documents', label: 'Documents', icon: FileText },
    { path: '/lawyers', label: 'Find Lawyers', icon: Users },
    { path: '/news', label: 'Legal News', icon: Newspaper },
    { path: '/lawyer-dashboard', label: 'Dashboard', icon: Settings }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-soft">
      <div className="container-premium">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-lift">
            <div className="relative">
              <Scale className="h-10 w-10 text-primary" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gradient-primary font-display">
                Wukala-GPT
              </span>
              <div className="text-xs text-muted-foreground font-medium">
                Legal AI Platform
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {isLoggedIn ? (
              <>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    onClick={() => navigate(item.path)}
                    className={`${
                      isActive(item.path) 
                        ? 'bg-primary text-primary-foreground shadow-soft' 
                        : 'hover:bg-primary/5 hover:text-primary'
                    } transition-all duration-300 px-4 py-2 h-10`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="ml-4 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20 transition-all duration-300 h-10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="hover:bg-primary/5 hover:text-primary h-10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="btn-premium bg-gradient-primary hover:shadow-premium h-10 px-6">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-xl">
                <div className="flex flex-col space-y-4 mt-8">
                  {isLoggedIn ? (
                    <>
                      {navItems.map((item) => (
                        <Button
                          key={item.path}
                          variant={isActive(item.path) ? "default" : "ghost"}
                          className={`justify-start h-12 ${
                            isActive(item.path) 
                              ? 'bg-primary text-primary-foreground' 
                              : 'hover:bg-primary/5 hover:text-primary'
                          }`}
                          onClick={() => handleNavigation(item.path)}
                        >
                          <item.icon className="h-5 w-5 mr-3" />
                          {item.label}
                        </Button>
                      ))}
                      
                      <div className="border-t border-border my-4" />
                      
                      <Button
                        variant="outline"
                        className="justify-start h-12 hover:bg-destructive/5 hover:text-destructive"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="justify-start h-12 hover:bg-primary/5 hover:text-primary"
                        onClick={() => handleNavigation('/login')}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="justify-start h-12 btn-premium bg-gradient-primary"
                        onClick={() => handleNavigation('/signup')}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;