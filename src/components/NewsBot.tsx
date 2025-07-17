import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User,
  Settings,
  X
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface NewsBotProps {
  isOpen: boolean;
  onClose: () => void;
  interests: string[];
}

const NewsBot = ({ isOpen, onClose, interests }: NewsBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your Legal News Assistant. I can help you find relevant news based on your interests: ${interests.join(', ')}. What would you like to know about?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage, interests);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateBotResponse = (query: string, userInterests: string[]): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('latest') || lowerQuery.includes('recent')) {
      return `Here are the latest legal news relevant to your interests:

📰 **Constitutional Law**: Supreme Court ruling on digital privacy rights
📰 **Corporate Law**: New SECP governance regulations announced
📰 **Criminal Law**: Anti-terrorism court verdict in major case

Would you like me to provide more details on any of these topics?`;
    }
    
    if (lowerQuery.includes('property') || lowerQuery.includes('real estate')) {
      return `**Property Law Updates:**

🏠 Punjab digitizes property registration system
🏠 New real estate transaction guidelines issued
🏠 Property dispute resolution mechanisms updated

These developments could significantly impact property transactions. Would you like specific details about any of these?`;
    }
    
    if (lowerQuery.includes('business') || lowerQuery.includes('corporate')) {
      return `**Business & Corporate News:**

💼 SECP announces new corporate governance rules
💼 Business contract law amendments proposed
💼 Foreign investment regulations updated

These changes will affect business operations. Need more information on any specific topic?`;
    }
    
    if (lowerQuery.includes('family') || lowerQuery.includes('divorce')) {
      return `**Family Law Updates:**

👨‍👩‍👧‍👦 Fast-track divorce proceedings introduced
👨‍👩‍👧‍👦 Child custody law amendments under review
👨‍👩‍👧‍👦 Marriage registration process streamlined

These changes aim to expedite family court proceedings. Would you like details on any specific development?`;
    }
    
    return `I found some relevant legal news based on your query. Here are the key updates:

• Recent developments in ${userInterests[0] || 'legal'} sector
• New regulations affecting ${userInterests[1] || 'business'} matters
• Court decisions related to ${userInterests[2] || 'civil'} cases

Would you like me to elaborate on any specific area or provide more detailed information?`;
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real implementation, this would integrate with Web Speech API
    if (!isListening) {
      // Start voice recognition
      setTimeout(() => {
        setInputMessage("What are the latest property law updates?");
        setIsListening(false);
      }, 3000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col border-emerald-200">
        <CardHeader className="bg-emerald-50 border-b border-emerald-200">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-emerald-700">
              <Bot className="h-6 w-6 mr-2" />
              Legal News Assistant
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                AI Powered
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Ask me about legal news, recent updates, or specific legal topics
          </p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' 
                      ? 'bg-emerald-100' 
                      : 'bg-blue-100'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  
                  <div className={`flex-1 max-w-xs md:max-w-md ${
                    message.sender === 'user' ? 'text-right' : ''
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="whitespace-pre-line text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Bot className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 mb-3">
              {['Latest updates', 'Property law', 'Corporate news', 'Family law'].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about legal news..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="pr-12 border-emerald-200 focus:border-emerald-500"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceInput}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                    isListening ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {isListening && (
              <div className="flex items-center justify-center mt-2">
                <div className="flex items-center space-x-2 text-red-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Listening...</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsBot;