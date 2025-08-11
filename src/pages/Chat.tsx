import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, Paperclip, Bot, User, MessageCircle, Plus, Clock, FileText, Search, Sparkles, Brain, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NavBar from "@/components/NavBar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'file';
  fileName?: string;
  fileSize?: string;
  isTyping?: boolean;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
  category: 'legal' | 'document' | 'general';
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your AI legal assistant trained on Pakistani law. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState('current');
  const [searchHistory, setSearchHistory] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatHistory: ChatHistory[] = [
    {
      id: 'current',
      title: 'Legal Consultation - Current',
      lastMessage: 'How can I help you today?',
      timestamp: new Date(),
      messageCount: 1,
      category: 'legal'
    },
    {
      id: '1',
      title: 'Contract Review - Service Agreement',
      lastMessage: 'The contract appears to be legally sound...',
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 12,
      category: 'document'
    },
    {
      id: '2', 
      title: 'Property Law Inquiry',
      lastMessage: 'Property transfer procedures in Karachi...',
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 8,
      category: 'legal'
    }
  ];

  const quickSuggestions = [
    { text: "Review this contract", icon: FileText, category: "Document" },
    { text: "Property law guidance", icon: Brain, category: "Legal" },
    { text: "Employment rights", icon: Zap, category: "Rights" },
    { text: "Business incorporation", icon: Sparkles, category: "Business" }
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI typing
    const typingMessage: ChatMessage = {
      id: 'typing',
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Based on Pakistani law, I can provide you with detailed guidance on this matter. The relevant sections include constitutional provisions and recent case law developments.",
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => prev.filter(msg => msg.id !== 'typing').concat(aiResponse));
      setIsLoading(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileMessage: ChatMessage = {
        id: Date.now().toString(),
        content: `Uploaded: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'file',
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(1) + ' KB'
      };
      
      setMessages(prev => [...prev, fileMessage]);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded for analysis.`,
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: "Voice Recording",
      description: isRecording ? "Recording stopped" : "Recording started",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleDateString() === new Date().toLocaleDateString() 
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-surface">
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Chat History Sidebar */}
        <div className="w-80 bg-card border-r border-border flex flex-col">
          <div className="p-6 border-b border-border bg-card-elevated">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Chat History</h2>
              <Button size="sm" className="bg-primary/10 hover:bg-primary/20 text-primary border-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchHistory}
                onChange={(e) => setSearchHistory(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {chatHistory.map((chat) => (
                <Card
                  key={chat.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-soft ${
                    selectedChatId === chat.id ? 'ring-2 ring-primary/20 bg-primary/5' : 'hover:bg-card-elevated'
                  }`}
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Brain className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">{chat.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{chat.lastMessage}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(chat.timestamp)}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {chat.messageCount}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-card-elevated border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">Legal AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">Specialized in Pakistani Law • Always Online</p>
                </div>
              </div>
              
              <Badge className="bg-success/10 text-success border-success/20">
                <Sparkles className="h-3 w-3 mr-1" />
                Pro Mode
              </Badge>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'ai' && (
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                    <Card className={`${
                      message.sender === 'user' 
                        ? 'bg-gradient-primary text-white border-primary/20' 
                        : 'bg-card border-border'
                    }`}>
                      <CardContent className="p-4">
                        {message.isTyping ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-sm">AI is typing...</span>
                          </div>
                        ) : (
                          <p className="leading-relaxed">{message.content}</p>
                        )}
                      </CardContent>
                    </Card>
                    <p className={`text-xs text-muted-foreground mt-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-secondary/10 text-secondary">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t border-border bg-card-elevated">
              <div className="max-w-4xl mx-auto">
                <p className="text-sm text-muted-foreground mb-3">Quick suggestions to get started:</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-auto p-3 justify-start hover:bg-primary/5 hover:border-primary/20"
                      onClick={() => setInputMessage(suggestion.text)}
                    >
                      <suggestion.icon className="h-4 w-4 mr-2 text-primary" />
                      <div className="text-left">
                        <div className="text-xs text-muted-foreground">{suggestion.category}</div>
                        <div className="font-medium">{suggestion.text}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="bg-card border-t border-border p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Textarea
                    placeholder="Ask me anything about Pakistani law..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[50px] max-h-32 resize-none bg-background border-border/50 focus:border-primary/50"
                    rows={1}
                  />
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-12 w-12 p-0 hover:bg-secondary/10 hover:border-secondary/20"
                  >
                    <Paperclip className="h-5 w-5 text-secondary" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleRecording}
                    className={`h-12 w-12 p-0 ${
                      isRecording 
                        ? 'bg-destructive/10 border-destructive/20 text-destructive' 
                        : 'hover:bg-accent/10 hover:border-accent/20'
                    }`}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="h-12 w-12 p-0 btn-premium bg-gradient-primary hover:shadow-premium"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;