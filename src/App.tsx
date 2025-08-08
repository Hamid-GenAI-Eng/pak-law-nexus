
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnimatedLogo from "@/components/AnimatedLogo";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import Documents from "./pages/Documents";
import Lawyers from "./pages/Lawyers";
import News from "./pages/News";
import LawyerDashboard from "./pages/LawyerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showLogo, setShowLogo] = useState(true);

  const handleLogoComplete = () => {
    console.log('Logo animation completed in App');
    setShowLogo(false);
  };

  console.log('App render:', { showLogo });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showLogo && <AnimatedLogo onComplete={handleLogoComplete} />}
        <div className={showLogo ? 'overflow-hidden h-screen' : ''}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/lawyers" element={<Lawyers />} />
              <Route path="/news" element={<News />} />
              <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
