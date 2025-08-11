import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MessageCircle, FileText, Users, Newspaper, Scale, Bot, CheckCircle, Star, ArrowRight, Sparkles, Lock, Zap, Globe } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  const features = [
    {
      icon: Bot,
      title: "AI Legal Assistant",
      description: "Advanced AI trained on Pakistani law providing instant, accurate legal guidance",
      highlight: "Voice & File Support",
      color: "primary",
      path: "/chat"
    },
    {
      icon: Shield,
      title: "Secure Document Vault",
      description: "Military-grade encryption with blockchain verification for maximum security",
      highlight: "Blockchain Secured",
      color: "secondary", 
      path: "/documents"
    },
    {
      icon: Users,
      title: "Expert Lawyer Network",
      description: "Connect with verified legal professionals based on specialty and ratings",
      highlight: "Verified Experts",
      color: "accent",
      path: "/lawyers"
    },
    {
      icon: Newspaper,
      title: "Legal Intelligence Hub",
      description: "Stay ahead with curated legal news and regulatory updates",
      highlight: "Real-time Updates",
      color: "success",
      path: "/news"
    }
  ];

  const stats = [
    { value: "50,000+", label: "Legal Queries Resolved" },
    { value: "1,200+", label: "Verified Lawyers" },
    { value: "99.9%", label: "Security Uptime" },
    { value: "4.9/5", label: "Client Satisfaction" }
  ];

  const testimonials = [
    {
      name: "Ahmed Khan",
      role: "Business Owner",
      content: "Wukala-GPT transformed how I handle legal matters. The AI assistant is incredibly accurate.",
      rating: 5
    },
    {
      name: "Fatima Ali",
      role: "Corporate Lawyer",
      content: "The document security and lawyer network features are game-changing for my practice.",
      rating: 5
    },
    {
      name: "Hassan Shah",
      role: "Startup Founder",
      content: "From contract reviews to legal compliance, this platform covers everything I need.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-premium opacity-10" />
        <div className="container-premium section-padding">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Sparkles className="h-4 w-4" />
                Pakistan's Most Trusted Legal AI Platform
              </div>
              
              <h1 className="text-display text-6xl lg:text-7xl font-bold mb-8 text-gradient-premium">
                Transform Your
                <br />
                Legal Experience
              </h1>
              
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                Experience the future of legal services with our AI-powered platform. 
                Get instant legal guidance, secure document storage, and connect with 
                expert lawyers—all in one sophisticated ecosystem.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                {!isLoggedIn ? (
                  <>
                    <RouterLink to="/signup">
                      <Button size="lg" className="btn-premium bg-gradient-primary hover:shadow-premium px-8 py-4 text-lg h-auto">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </RouterLink>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="px-8 py-4 text-lg h-auto border-primary/20 hover:bg-primary/5"
                      onClick={() => navigate('/chat')}
                    >
                      Try AI Assistant
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="lg" 
                    className="btn-premium bg-gradient-primary hover:shadow-premium px-8 py-4 text-lg h-auto"
                    onClick={() => handleProtectedNavigation('/chat')}
                  >
                    <Bot className="h-5 w-5 mr-2" />
                    Continue Your Journey
                  </Button>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-surface">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-display text-4xl font-bold mb-6 text-foreground">
              Comprehensive Legal Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every tool you need to handle legal matters with confidence and expertise
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`card-premium group cursor-pointer hover-lift ${
                  feature.color === 'primary' ? 'border-primary/20 hover:border-primary/40' :
                  feature.color === 'secondary' ? 'border-secondary/20 hover:border-secondary/40' :
                  feature.color === 'accent' ? 'border-accent/20 hover:border-accent/40' :
                  'border-success/20 hover:border-success/40'
                }`}
                onClick={() => handleProtectedNavigation(feature.path)}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`
                      w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300
                      ${feature.color === 'primary' ? 'bg-primary/10 text-primary' :
                        feature.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                        feature.color === 'accent' ? 'bg-accent/10 text-accent' :
                        'bg-success/10 text-success'}
                    `}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className={`
                        inline-flex items-center gap-2 text-sm font-medium
                        ${feature.color === 'primary' ? 'text-primary' :
                          feature.color === 'secondary' ? 'text-secondary' :
                          feature.color === 'accent' ? 'text-accent' :
                          'text-success'}
                      `}>
                        <CheckCircle className="h-4 w-4" />
                        {feature.highlight}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-display text-4xl font-bold mb-6 text-foreground">
              Trusted by Legal Professionals
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our clients say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-premium text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container-premium relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display text-4xl font-bold mb-6">
              Ready to Transform Your Legal Practice?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join thousands of legal professionals who trust Wukala-GPT for their most important legal matters
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {!isLoggedIn ? (
                <>
                  <RouterLink to="/signup">
                    <Button size="lg" variant="secondary" className="btn-premium px-8 py-4 text-lg h-auto">
                      Start Your Legal Journey
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </RouterLink>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg h-auto"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                </>
              ) : (
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="btn-premium px-8 py-4 text-lg h-auto"
                  onClick={() => handleProtectedNavigation('/chat')}
                >
                  Continue Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Security badges */}
            <div className="flex justify-center items-center gap-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Pakistan Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container-premium py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <Scale className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-gradient-primary">Wukala-GPT</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Empowering Pakistan with AI-driven legal solutions that combine cutting-edge technology with deep legal expertise.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Legal Services</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">AI Legal Assistant</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Document Security</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Lawyer Matching</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Legal News</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">For Lawyers</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">Join Our Network</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Professional Dashboard</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Client Management</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Practice Tools</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Contact Support</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Wukala-GPT. All rights reserved. Building the future of legal technology in Pakistan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;