
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Shield, 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  Lock, 
  Share,
  Search,
  Filter,
  Calendar,
  FileCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: Date;
  category: string;
  isEncrypted: boolean;
  blockchainHash: string;
  status: 'uploaded' | 'encrypting' | 'encrypted' | 'verified';
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Property_Deed_2024.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: new Date('2024-01-15'),
      category: 'Property',
      isEncrypted: true,
      blockchainHash: '0x8f4b2c1d9e7a3b5f...',
      status: 'verified'
    },
    {
      id: '2',
      name: 'Contract_Agreement.docx',
      type: 'DOCX',
      size: '856 KB',
      uploadDate: new Date('2024-01-10'),
      category: 'Contract',
      isEncrypted: true,
      blockchainHash: '0x3c9f1e4d8b2a6c1f...',
      status: 'encrypted'
    },
    {
      id: '3',
      name: 'Court_Notice.pdf',
      type: 'PDF',
      size: '1.2 MB',
      uploadDate: new Date('2024-01-08'),
      category: 'Legal Notice',
      isEncrypted: false,
      blockchainHash: '',
      status: 'encrypting'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const categories = ['all', 'Property', 'Contract', 'Legal Notice', 'Personal', 'Business'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            
            // Add new document
            const newDoc: Document = {
              id: Date.now().toString(),
              name: file.name,
              type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
              size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
              uploadDate: new Date(),
              category: 'Personal',
              isEncrypted: false,
              blockchainHash: '',
              status: 'uploaded'
            };
            
            setDocuments(prev => [newDoc, ...prev]);
            
            toast({
              title: "File Uploaded Successfully",
              description: `${file.name} has been uploaded and encryption is starting.`,
            });
            
            // Start encryption simulation
            setTimeout(() => {
              setDocuments(prev => prev.map(doc => 
                doc.id === newDoc.id 
                  ? { ...doc, status: 'encrypting' }
                  : doc
              ));
              
              setTimeout(() => {
                setDocuments(prev => prev.map(doc => 
                  doc.id === newDoc.id 
                    ? { 
                        ...doc, 
                        status: 'encrypted',
                        isEncrypted: true,
                        blockchainHash: '0x' + Math.random().toString(16).substr(2, 16) + '...'
                      }
                    : doc
                ));
                
                toast({
                  title: "Document Encrypted",
                  description: "Your document has been secured with blockchain encryption.",
                });
              }, 3000);
            }, 1000);
            
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'encrypted': return 'bg-blue-100 text-blue-800';
      case 'encrypting': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <FileCheck className="h-3 w-3" />;
      case 'encrypted': return <Lock className="h-3 w-3" />;
      case 'encrypting': return <Shield className="h-3 w-3 animate-spin" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-6">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Secure Document Storage</h1>
          <p className="text-gray-600">Store and manage your legal documents with blockchain encryption</p>
        </div>

        {/* Upload Section */}
        <Card className="mb-6 border-emerald-100">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-700">
              <Shield className="h-5 w-5 mr-2" />
              Upload New Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-emerald-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
                <Upload className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Drag & drop files here or click to browse
                </h3>
                <p className="text-gray-600 mb-4">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
                  className="hidden"
                  id="file-upload"
                />
                <Button 
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="mb-6 border-emerald-100">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1 max-w-md">
                <Label htmlFor="search" className="sr-only">Search documents</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-emerald-200 focus:border-emerald-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Label htmlFor="category" className="text-sm font-medium">Category:</Label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-emerald-200 rounded-md px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-emerald-600" />
                Your Documents ({filteredDocuments.length})
              </span>
              <Badge variant="outline" className="border-emerald-600 text-emerald-600">
                Blockchain Secured
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="p-6">
                {filteredDocuments.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No documents found matching your criteria</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-emerald-100 p-3 rounded-lg">
                              <FileText className="h-6 w-6 text-emerald-600" />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800">{doc.name}</h3>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                                <span>{doc.type} • {doc.size}</span>
                                <span className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {doc.uploadDate.toLocaleDateString()}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {doc.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                              {getStatusIcon(doc.status)}
                              <span className="ml-1 capitalize">{doc.status}</span>
                            </Badge>
                            
                            <div className="flex space-x-1">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {doc.isEncrypted && (
                          <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                            <div className="flex items-center justify-between text-sm">
                              <span className="flex items-center text-emerald-700">
                                <Lock className="h-4 w-4 mr-1" />
                                Blockchain Encrypted
                              </span>
                              <span className="text-emerald-600 font-mono text-xs">
                                Hash: {doc.blockchainHash}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card className="mt-6 bg-gradient-to-r from-emerald-600 to-amber-600 text-white border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Your Documents Are Secure</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <Lock className="h-8 w-8 mx-auto mb-2 opacity-80" />
                <p className="font-medium">End-to-End Encryption</p>
                <p className="opacity-80">Military-grade security</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 opacity-80" />
                <p className="font-medium">Blockchain Verified</p>
                <p className="opacity-80">Immutable proof of existence</p>
              </div>
              <div className="text-center">
                <FileCheck className="h-8 w-8 mx-auto mb-2 opacity-80" />
                <p className="font-medium">Legal Compliance</p>
                <p className="opacity-80">Pakistan data protection laws</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documents;
