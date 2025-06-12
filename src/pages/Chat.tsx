
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bot, User, Mic, MicOff, Upload, Send, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  hasFile?: boolean;
  fileName?: string;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: 'السلام علیکم! میں Wakalat-GPT ہوں، آپ کا AI قانونی مشیر۔ آپ کو کسی قانونی مسئلے میں کیسے مدد کر سکتا ہوں؟',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'Property Dispute Inquiry',
      lastMessage: 'Thank you for the advice on property law...',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 12
    },
    {
      id: '2',
      title: 'Family Law Consultation',
      lastMessage: 'I need help with divorce proceedings...',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      messageCount: 8
    },
    {
      id: '3',
      title: 'Criminal Law Question',
      lastMessage: 'What are the procedures for bail...',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      messageCount: 15
    }
  ]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: 'آپ کے سوال کے مطابق، پاکستانی قانون کے تحت یہ معاملہ... (This is a simulated response. In a real implementation, this would connect to an AI service trained on Pakistani law)',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        message: `Uploaded file: ${file.name}`,
        timestamp: new Date(),
        hasFile: true,
        fileName: file.name
      };
      
      setMessages(prev => [...prev, userMessage]);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded and is being analyzed.`,
      });
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Speak your legal question...",
      });
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        const recordedMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'user',
          message: '🎤 Voice message: "I need help with a property dispute..."',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, recordedMessage]);
        toast({
          title: "Recording Complete",
          description: "Voice message has been processed.",
        });
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const loadChatHistory = (historyId: string) => {
    // Simulate loading chat history
    toast({
      title: "Loading Chat History",
      description: "Previous conversation loaded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-6rem)]">
          
          {/* Chat History Sidebar */}
          <Card className="lg:col-span-1 border-emerald-100">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <Clock className="h-5 w-5 mr-2" />
                Chat History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="p-4 space-y-3">
                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => loadChatHistory(chat.id)}
                      className="p-3 rounded-lg border border-gray-200 hover:border-emerald-300 cursor-pointer hover:bg-emerald-50 transition-all duration-200"
                    >
                      <h4 className="font-medium text-sm text-gray-800 truncate">
                        {chat.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 truncate">
                        {chat.lastMessage}
                      </p>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>{chat.messageCount} messages</span>
                        <span>{chat.timestamp.toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Main Chat Interface */}
          <Card className="lg:col-span-3 flex flex-col border-emerald-100">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Bot className="h-6 w-6 mr-2" />
                Wakalat-GPT Legal Assistant
              </CardTitle>
              <p className="text-emerald-100 text-sm">
                AI-powered legal advice for Pakistani law
              </p>
            </CardHeader>
            
            {/* Messages Area */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-emerald-600 text-white ml-2' 
                            : 'bg-amber-100 text-amber-600 mr-2'
                        }`}>
                          {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>
                        <div className={`rounded-lg px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {message.hasFile && (
                            <div className="flex items-center mb-2 text-sm opacity-80">
                              <FileText className="h-4 w-4 mr-1" />
                              {message.fileName}
                            </div>
                          )}
                          <p className="text-sm leading-relaxed">{message.message}</p>
                          <p className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-emerald-200' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-gray-100 rounded-lg px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="اپنا قانونی سوال یہاں لکھیں... / Type your legal question here..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[60px] resize-none border-emerald-200 focus:border-emerald-500"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={toggleRecording}
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    className={`transition-all duration-200 ${isRecording ? 'animate-pulse' : ''}`}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    size="sm"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    onClick={handleSendMessage}
                    className="bg-emerald-600 hover:bg-emerald-700"
                    size="sm"
                    disabled={!inputMessage.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>Supports: PDF, DOC, TXT, Images</span>
                <span>Press Enter to send, Shift+Enter for new line</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
