
import { Button } from "@/components/ui/button";
import { Scale, MessageCircle, FileText, Users, Newspaper, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface NavBarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const NavBar = ({ isLoggedIn, onLogout }: NavBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    onLogout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <Scale className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              Wakalat-GPT
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                {/* Main Navigation */}
                <div className="hidden md:flex space-x-1">
                  <Button
                    variant={isActive('/chat') ? "default" : "ghost"}
                    size="sm"
                    onClick={() => navigate('/chat')}
                    className={`${isActive('/chat') 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'hover:bg-emerald-50 hover:text-emerald-700'
                    } transition-all duration-200`}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chatbot
                  </Button>
                  
                  <Button
                    variant={isActive('/documents') ? "default" : "ghost"}
                    size="sm"
                    onClick={() => navigate('/documents')}
                    className={`${isActive('/documents') 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'hover:bg-emerald-50 hover:text-emerald-700'
                    } transition-all duration-200`}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Button>
                  
                  <Button
                    variant={isActive('/lawyers') ? "default" : "ghost"}
                    size="sm"
                    onClick={() => navigate('/lawyers')}
                    className={`${isActive('/lawyers') 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'hover:bg-emerald-50 hover:text-emerald-700'
                    } transition-all duration-200`}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Find Lawyer
                  </Button>
                  
                  <Button
                    variant={isActive('/news') ? "default" : "ghost"}
                    size="sm"
                    onClick={() => navigate('/news')}
                    className={`${isActive('/news') 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'hover:bg-emerald-50 hover:text-emerald-700'
                    } transition-all duration-200`}
                  >
                    <Newspaper className="h-4 w-4 mr-2" />
                    News
                  </Button>
                </div>

                {/* Mobile Navigation Dropdown */}
                <div className="md:hidden">
                  <select 
                    onChange={(e) => navigate(e.target.value)}
                    value={location.pathname}
                    className="px-3 py-2 border border-emerald-200 rounded-md text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="/chat">Chatbot</option>
                    <option value="/documents">Documents</option>
                    <option value="/lawyers">Find Lawyer</option>
                    <option value="/news">News</option>
                  </select>
                </div>

                {/* Logout Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 ml-2"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="hover:bg-emerald-50">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
