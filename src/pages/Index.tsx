import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MessageCircle, FileText, Users, Newspaper, Scale, Link, Bot, Upload, Mic, ArrowLeft } from "lucide-react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleProtectedNavigation = (path: string) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      {/* Navigation */}
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
            Pakistan's Premier Legal AI Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get accurate legal information, secure document storage with blockchain, connect with lawyers, 
            and access authentic legal news - all powered by AI tailored for Pakistani law.
          </p>
          <div className="flex justify-center space-x-4">
            {!isLoggedIn ? (
              <>
                <RouterLink to="/signup">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 hover:scale-105 transition-transform">
                    Get Started Free
                  </Button>
                </RouterLink>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 hover:scale-105 transition-transform"
                  onClick={() => navigate('/login')}
                >
                  Try AI Assistant
                </Button>
              </>
            ) : (
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 hover:scale-105 transition-transform"
                onClick={() => handleProtectedNavigation('/chat')}
              >
                <Bot className="h-5 w-5 mr-2" />
                Start Chatting
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Comprehensive Legal Solutions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AI Legal Assistant */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-emerald-100 cursor-pointer"
                onClick={() => handleProtectedNavigation('/chat')}>
            <CardContent className="p-6 text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">AI Legal Assistant</h3>
              <p className="text-gray-600 mb-4">
                Get instant answers to legal questions with our AI trained on Pakistani law
              </p>
              <div className="flex justify-center space-x-2 text-sm text-emerald-600">
                <Mic className="h-4 w-4" />
                <span>Voice Support</span>
                <Upload className="h-4 w-4 ml-2" />
                <span>File Upload</span>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Document Storage */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-amber-100 cursor-pointer"
                onClick={() => handleProtectedNavigation('/documents')}>
            <CardContent className="p-6 text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure Document Storage</h3>
              <p className="text-gray-600 mb-4">
                Store your legal documents securely with blockchain encryption technology
              </p>
              <div className="text-sm text-amber-600 flex items-center justify-center">
                <Link className="h-4 w-4 mr-1" />
                <span>Blockchain Secured</span>
              </div>
            </CardContent>
          </Card>

          {/* Find Lawyers */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-blue-100 cursor-pointer"
                onClick={() => handleProtectedNavigation('/lawyers')}>
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Find Expert Lawyers</h3>
              <p className="text-gray-600 mb-4">
                Connect with qualified lawyers based on specialty, location, and ratings
              </p>
              <div className="text-sm text-blue-600">
                Advanced Filtering & Matching
              </div>
            </CardContent>
          </Card>

          {/* Legal News */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-green-100 cursor-pointer"
                onClick={() => handleProtectedNavigation('/news')}>
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Newspaper className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Authentic Legal News</h3>
              <p className="text-gray-600 mb-4">
                Stay updated with the latest legal developments and court decisions
              </p>
              <div className="text-sm text-green-600">
                Verified Sources Only
              </div>
            </CardContent>
          </Card>

          {/* Chat History */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-purple-100 cursor-pointer"
                onClick={() => handleProtectedNavigation('/chat')}>
            <CardContent className="p-6 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Chat History</h3>
              <p className="text-gray-600 mb-4">
                Access your previous conversations and legal consultations anytime
              </p>
              <div className="text-sm text-purple-600">
                Secure & Searchable
              </div>
            </CardContent>
          </Card>

          {/* Case Solutions */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-rose-100 cursor-pointer"
                onClick={() => handleProtectedNavigation('/chat')}>
            <CardContent className="p-6 text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Case Solutions</h3>
              <p className="text-gray-600 mb-4">
                Get preliminary solutions for your legal cases before consulting a lawyer
              </p>
              <div className="text-sm text-rose-600">
                AI-Powered Analysis
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-emerald-600 to-amber-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Legal Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Pakistanis who trust Wakalat-GPT for their legal needs
          </p>
          {!isLoggedIn ? (
            <RouterLink to="/signup">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 hover:scale-105 transition-transform">
                Start Your Legal Journey
              </Button>
            </RouterLink>
          ) : (
            <Button 
              size="lg" 
              className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 hover:scale-105 transition-transform"
              onClick={() => handleProtectedNavigation('/chat')}
            >
              Continue Your Journey
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-6 w-6 text-emerald-400" />
                <span className="text-xl font-bold">Wakalat-GPT</span>
              </div>
              <p className="text-gray-400">
                Empowering Pakistan with AI-driven legal solutions
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI Legal Assistant</li>
                <li>Document Storage</li>
                <li>Lawyer Matching</li>
                <li>Legal News</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Lawyers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Join Our Network</li>
                <li>Manage Cases</li>
                <li>Client Communication</li>
                <li>Professional Tools</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Wakalat-GPT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
