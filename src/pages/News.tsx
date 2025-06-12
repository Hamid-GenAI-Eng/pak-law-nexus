
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Newspaper, 
  Calendar, 
  Clock, 
  Search, 
  Filter,
  Scale,
  Gavel,
  Building,
  Users,
  ExternalLink,
  BookOpen
} from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  publishedAt: Date;
  readTime: string;
  isBreaking: boolean;
  imageUrl?: string;
  tags: string[];
  url: string;
}

const News = () => {
  const [newsArticles] = useState<NewsArticle[]>([
    {
      id: '1',
      title: 'Supreme Court Rules on Digital Privacy Rights in Pakistan',
      summary: 'The Supreme Court of Pakistan has issued a landmark judgment regarding digital privacy rights, establishing new precedents for data protection in the digital age.',
      category: 'Constitutional Law',
      source: 'Dawn News',
      publishedAt: new Date('2024-01-15T10:30:00'),
      readTime: '5 min read',
      isBreaking: true,
      tags: ['Privacy', 'Digital Rights', 'Supreme Court'],
      url: '#'
    },
    {
      id: '2',
      title: 'New Corporate Governance Rules Announced by SECP',
      summary: 'Securities and Exchange Commission of Pakistan announces comprehensive corporate governance reforms for listed companies.',
      category: 'Corporate Law',
      source: 'Business Recorder',
      publishedAt: new Date('2024-01-14T14:15:00'),
      readTime: '3 min read',
      isBreaking: false,
      tags: ['Corporate', 'SECP', 'Governance'],
      url: '#'
    },
    {
      id: '3',
      title: 'Family Courts to Introduce Fast-Track Divorce Proceedings',
      summary: 'Pakistani family courts are set to implement new fast-track procedures for divorce cases to reduce delays and court backlogs.',
      category: 'Family Law',
      source: 'The News',
      publishedAt: new Date('2024-01-13T09:45:00'),
      readTime: '4 min read',
      isBreaking: false,
      tags: ['Family Law', 'Courts', 'Divorce'],
      url: '#'
    },
    {
      id: '4',
      title: 'Anti-Terrorism Court Delivers Verdict in High-Profile Case',
      summary: 'Karachi Anti-Terrorism Court announces verdict in major terrorism case, setting important legal precedents.',
      category: 'Criminal Law',
      source: 'Geo News',
      publishedAt: new Date('2024-01-12T16:20:00'),
      readTime: '6 min read',
      isBreaking: false,
      tags: ['Criminal Law', 'ATC', 'Terrorism'],
      url: '#'
    },
    {
      id: '5',
      title: 'Property Registration Process Digitized in Punjab',
      summary: 'Punjab government launches digital property registration system to streamline real estate transactions and reduce corruption.',
      category: 'Property Law',
      source: 'Express Tribune',
      publishedAt: new Date('2024-01-11T11:00:00'),
      readTime: '3 min read',
      isBreaking: false,
      tags: ['Property', 'Digital', 'Punjab'],
      url: '#'
    },
    {
      id: '6',
      title: 'Labour Law Amendments Proposed in National Assembly',
      summary: 'National Assembly discusses significant amendments to labor laws, focusing on worker rights and industrial relations.',
      category: 'Labour Law',
      source: 'ARY News',
      publishedAt: new Date('2024-01-10T13:30:00'),
      readTime: '4 min read',
      isBreaking: false,
      tags: ['Labour', 'Assembly', 'Workers Rights'],
      url: '#'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSource, setSelectedSource] = useState('');

  const categories = [
    'All Categories',
    'Constitutional Law',
    'Corporate Law',
    'Family Law',
    'Criminal Law',
    'Property Law',
    'Labour Law',
    'Tax Law'
  ];

  const sources = [
    'All Sources',
    'Dawn News',
    'Business Recorder',
    'The News',
    'Geo News',
    'Express Tribune',
    'ARY News'
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || 
                           article.category === selectedCategory;
    const matchesSource = !selectedSource || selectedSource === 'All Sources' || 
                         article.source === selectedSource;
    
    return matchesSearch && matchesCategory && matchesSource;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Constitutional Law': return Scale;
      case 'Corporate Law': return Building;
      case 'Family Law': return Users;
      case 'Criminal Law': return Gavel;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Constitutional Law': return 'bg-purple-100 text-purple-800';
      case 'Corporate Law': return 'bg-blue-100 text-blue-800';
      case 'Family Law': return 'bg-pink-100 text-pink-800';
      case 'Criminal Law': return 'bg-red-100 text-red-800';
      case 'Property Law': return 'bg-green-100 text-green-800';
      case 'Labour Law': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-6">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Legal News & Updates</h1>
          <p className="text-gray-600">Stay informed with the latest legal developments in Pakistan</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Filters Sidebar */}
          <Card className="lg:col-span-1 border-emerald-100">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search news..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-emerald-200 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-emerald-200 rounded-md px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All Categories' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Source */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Source</label>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full border border-emerald-200 rounded-md px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                >
                  {sources.map(source => (
                    <option key={source} value={source === 'All Sources' ? '' : source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedSource('');
                }}
              >
                Clear All Filters
              </Button>

              {/* Quick Categories */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Quick Access</label>
                <div className="space-y-1">
                  {['Constitutional Law', 'Corporate Law', 'Criminal Law'].map(category => {
                    const Icon = getCategoryIcon(category);
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className="w-full flex items-center space-x-2 p-2 text-sm hover:bg-emerald-50 rounded-md transition-colors"
                      >
                        <Icon className="h-4 w-4 text-emerald-600" />
                        <span>{category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* News Articles */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <ScrollArea className="h-[800px]">
              <div className="space-y-6">
                {filteredNews.map((article) => {
                  const CategoryIcon = getCategoryIcon(article.category);
                  
                  return (
                    <Card key={article.id} className="border-emerald-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                      <CardContent className="p-6">
                        <div className="flex flex-col space-y-4">
                          
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="bg-emerald-100 p-2 rounded-lg">
                                <CategoryIcon className="h-5 w-5 text-emerald-600" />
                              </div>
                              <div>
                                <Badge className={`text-xs ${getCategoryColor(article.category)}`}>
                                  {article.category}
                                </Badge>
                                {article.isBreaking && (
                                  <Badge className="ml-2 bg-red-100 text-red-800 text-xs animate-pulse">
                                    Breaking
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-right text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatTimeAgo(article.publishedAt)}
                              </div>
                            </div>
                          </div>

                          {/* Title */}
                          <h2 className="text-xl font-semibold text-gray-800 leading-tight hover:text-emerald-700 cursor-pointer transition-colors">
                            {article.title}
                          </h2>

                          {/* Summary */}
                          <p className="text-gray-600 leading-relaxed">
                            {article.summary}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {article.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs border-emerald-200 text-emerald-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Newspaper className="h-4 w-4 mr-1" />
                                {article.source}
                              </span>
                              <span>{article.readTime}</span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {article.publishedAt.toLocaleDateString()}
                              </span>
                            </div>
                            
                            <Button variant="outline" size="sm" className="hover:bg-emerald-50">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Read Full Article
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {filteredNews.length === 0 && (
                  <Card className="border-emerald-100">
                    <CardContent className="p-12 text-center">
                      <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No Articles Found</h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your search criteria or filters
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('');
                          setSelectedSource('');
                        }}
                      >
                        Clear All Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Breaking News Banner */}
        {newsArticles.some(article => article.isBreaking) && (
          <Card className="mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white border-0">
            <CardContent className="py-4">
              <div className="flex items-center justify-center space-x-2">
                <Badge className="bg-red-800 text-red-100 animate-pulse">BREAKING</Badge>
                <span className="font-medium">
                  {newsArticles.find(article => article.isBreaking)?.title}
                </span>
                <Button variant="ghost" size="sm" className="text-white hover:text-red-100">
                  Read More →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default News;
