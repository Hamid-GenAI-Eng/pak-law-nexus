import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Video, 
  Star, 
  Clock,
  User,
  X,
  CheckCircle,
  Info
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'lawyer';
  timestamp: Date;
  type: 'text' | 'info';
}

interface LawyerChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
  lawyer: {
    id: string;
    name: string;
    specialization: string;
    rating: number;
    responseTime: string;
    hourlyRate: number;
    verified: boolean;
  };
}

const LawyerChatSystem = ({ isOpen, onClose, lawyer }: LawyerChatSystemProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm ${lawyer.name}, specialized in ${lawyer.specialization}. I'm here to help you with your legal questions. How can I assist you today?`,
      sender: 'lawyer',
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: '2',
      content: `✅ This lawyer is verified and has a ${lawyer.rating}/5 rating`,
      sender: 'lawyer',
      timestamp: new Date(Date.now() - 299000),
      type: 'info'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate lawyer response
    setTimeout(() => {
      const lawyerResponse = generateLawyerResponse(inputMessage);
      const lawyerMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: lawyerResponse,
        sender: 'lawyer',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, lawyerMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateLawyerResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('property') || lowerQuery.includes('real estate')) {
      return `I can definitely help you with property matters. Property law in Pakistan covers various aspects including:

• Property registration and documentation
• Disputes over ownership
• Real estate transactions
• Land acquisition issues

Could you please provide more specific details about your property concern? This will help me give you more targeted advice.`;
    }
    
    if (lowerQuery.includes('divorce') || lowerQuery.includes('family')) {
      return `Family law matters require careful handling. I have extensive experience in:

• Divorce proceedings (Khula, Talaq, Mubarat)
• Child custody arrangements
• Maintenance and alimony
• Property division

I understand this can be emotionally challenging. Would you like to schedule a detailed consultation to discuss your specific situation privately?`;
    }
    
    if (lowerQuery.includes('business') || lowerQuery.includes('contract')) {
      return `Business and contract law is my specialty. I can assist with:

• Contract drafting and review
• Business formation and registration
• Partnership agreements
• Dispute resolution

For business matters, I usually recommend a comprehensive consultation. Would you like to schedule a meeting to discuss your business legal needs in detail?`;
    }
    
    if (lowerQuery.includes('case') || lowerQuery.includes('court')) {
      return `I'd be happy to help with your legal case. Court proceedings require thorough preparation:

• Case analysis and strategy
• Documentation preparation
• Court representation
• Settlement negotiations

To better assist you, could you share some details about the nature of your case? All information shared here is confidential.`;
    }
    
    if (lowerQuery.includes('fee') || lowerQuery.includes('cost') || lowerQuery.includes('rate')) {
      return `My consultation fee is PKR ${lawyer.hourlyRate}/hour. However, for initial case assessment, I offer:

• 15-minute free consultation
• Fixed-fee packages for standard services
• Flexible payment options for ongoing cases

The final fee depends on the complexity of your case. Would you like to know about specific service packages?`;
    }
    
    return `Thank you for your question. Based on my experience in ${lawyer.specialization}, I can provide you with proper legal guidance. 

To give you the most accurate advice, I'd need to understand your situation better. Could you provide more details about your specific legal concern?

I'm here to help and ensure you get the best possible legal solution.`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col border-emerald-200">
        {/* Chat Header */}
        <CardHeader className="bg-emerald-50 border-b border-emerald-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-emerald-700 flex items-center space-x-2">
                  <span>{lawyer.name}</span>
                  {lawyer.verified && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{lawyer.specialization}</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(lawyer.rating)}
                    <span>({lawyer.rating})</span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  <span>Online - {lawyer.responseTime}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-1" />
                Video
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 flex flex-col p-0">
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
                      : message.type === 'info'
                      ? 'bg-blue-100'
                      : 'bg-gray-100'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-emerald-600" />
                    ) : message.type === 'info' ? (
                      <Info className="h-4 w-4 text-blue-600" />
                    ) : (
                      <User className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  
                  <div className={`flex-1 max-w-xs md:max-w-md ${
                    message.sender === 'user' ? 'text-right' : ''
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-emerald-600 text-white'
                        : message.type === 'info'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
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
              
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <User className="h-4 w-4 text-gray-600" />
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
            {/* Quick Questions */}
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                'What are your fees?', 
                'Can you help with my case?', 
                'Available for consultation?',
                'How long for resolution?'
              ].map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your legal question..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="border-emerald-200 focus:border-emerald-500"
                />
              </div>
              
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Rate Information */}
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Consultation: PKR {lawyer.hourlyRate}/hour</span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Usually responds in {lawyer.responseTime}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LawyerChatSystem;