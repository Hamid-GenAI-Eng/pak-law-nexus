
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { 
  MapPin, 
  Star, 
  Users, 
  Phone, 
  Mail, 
  Briefcase,
  Filter,
  Search,
  GraduationCap,
  Calendar,
  MessageCircle
} from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviewCount: number;
  location: string;
  education: string;
  hourlyRate: number;
  avatar: string;
  verified: boolean;
  responseTime: string;
  languages: string[];
  cases: number;
  description: string;
}

const Lawyers = () => {
  const [lawyers] = useState<Lawyer[]>([
    {
      id: '1',
      name: 'Advocate Muhammad Ali Khan',
      specialization: 'Criminal Law',
      experience: 12,
      rating: 4.8,
      reviewCount: 156,
      location: 'Karachi',
      education: 'LLB from Karachi University',
      hourlyRate: 5000,
      avatar: '/placeholder-avatar.jpg',
      verified: true,
      responseTime: '< 2 hours',
      languages: ['Urdu', 'English', 'Sindhi'],
      cases: 340,
      description: 'Experienced criminal lawyer with expertise in white-collar crimes and civil litigation.'
    },
    {
      id: '2',
      name: 'Advocate Sarah Ahmed',
      specialization: 'Family Law',
      experience: 8,
      rating: 4.9,
      reviewCount: 203,
      location: 'Lahore',
      education: 'LLM from Punjab University',
      hourlyRate: 4500,
      avatar: '/placeholder-avatar.jpg',
      verified: true,
      responseTime: '< 1 hour',
      languages: ['Urdu', 'English', 'Punjabi'],
      cases: 280,
      description: 'Specialized in family disputes, divorce proceedings, and child custody cases.'
    },
    {
      id: '3',
      name: 'Advocate Tariq Hassan',
      specialization: 'Corporate Law',
      experience: 15,
      rating: 4.7,
      reviewCount: 89,
      location: 'Islamabad',
      education: 'LLB from Quaid-i-Azam University',
      hourlyRate: 8000,
      avatar: '/placeholder-avatar.jpg',
      verified: true,
      responseTime: '< 3 hours',
      languages: ['Urdu', 'English'],
      cases: 450,
      description: 'Corporate law expert with focus on business formation, contracts, and mergers.'
    },
    {
      id: '4',
      name: 'Advocate Fatima Noor',
      specialization: 'Civil Rights',
      experience: 6,
      rating: 4.6,
      reviewCount: 124,
      location: 'Karachi',
      education: 'LLB from Sindh University',
      hourlyRate: 3500,
      avatar: '/placeholder-avatar.jpg',
      verified: true,
      responseTime: '< 4 hours',
      languages: ['Urdu', 'English', 'Sindhi'],
      cases: 190,
      description: 'Passionate about civil rights and social justice cases.'
    },
    {
      id: '5',
      name: 'Advocate Imran Shah',
      specialization: 'Property Law',
      experience: 10,
      rating: 4.5,
      reviewCount: 167,
      location: 'Lahore',
      education: 'LLM from University of Punjab',
      hourlyRate: 6000,
      avatar: '/placeholder-avatar.jpg',
      verified: true,
      responseTime: '< 2 hours',
      languages: ['Urdu', 'English', 'Punjabi'],
      cases: 320,
      description: 'Expert in property disputes, real estate transactions, and land acquisition.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [rateRange, setRateRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const locations = ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad'];
  const specializations = [
    'All Specializations',
    'Criminal Law',
    'Family Law',
    'Corporate Law',
    'Civil Rights',
    'Property Law',
    'Tax Law',
    'Immigration Law'
  ];

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || selectedLocation === 'All Cities' || 
                           lawyer.location === selectedLocation;
    const matchesSpecialization = !selectedSpecialization || selectedSpecialization === 'All Specializations' ||
                                 lawyer.specialization === selectedSpecialization;
    const matchesRate = lawyer.hourlyRate >= rateRange[0] && lawyer.hourlyRate <= rateRange[1];
    const matchesRating = lawyer.rating >= minRating;
    
    return matchesSearch && matchesLocation && matchesSpecialization && matchesRate && matchesRating;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-6">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Expert Lawyers</h1>
          <p className="text-gray-600">Connect with qualified legal professionals across Pakistan</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Filters Sidebar */}
          <Card className="lg:col-span-1 border-emerald-100">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-emerald-700">
                <span className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  {showFilters ? 'Hide' : 'Show'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              
              {/* Search */}
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Name or specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-emerald-200 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border border-emerald-200 rounded-md px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                >
                  {locations.map(location => (
                    <option key={location} value={location === 'All Cities' ? '' : location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specialization */}
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <select
                  id="specialization"
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full border border-emerald-200 rounded-md px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec === 'All Specializations' ? '' : spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hourly Rate */}
              <div className="space-y-3">
                <Label>Hourly Rate (PKR)</Label>
                <div className="px-2">
                  <Slider
                    value={rateRange}
                    onValueChange={setRateRange}
                    max={10000}
                    min={1000}
                    step={500}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>PKR {rateRange[0].toLocaleString()}</span>
                  <span>PKR {rateRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="space-y-3">
                <Label>Minimum Rating</Label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating === minRating ? 0 : rating)}
                      className={`p-1 rounded ${
                        rating <= minRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedLocation('');
                  setSelectedSpecialization('');
                  setRateRange([0, 10000]);
                  setMinRating(0);
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>

          {/* Lawyers List */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredLawyers.length} lawyer{filteredLawyers.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <ScrollArea className="h-[800px]">
              <div className="space-y-6">
                {filteredLawyers.map((lawyer) => (
                  <Card key={lawyer.id} className="border-emerald-100 hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                        
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Briefcase className="h-10 w-10 text-emerald-600" />
                          </div>
                          {lawyer.verified && (
                            <Badge className="mt-2 bg-green-100 text-green-800 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>

                        {/* Main Info */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                {lawyer.name}
                              </h3>
                              
                              <div className="flex items-center space-x-4 mb-3">
                                <Badge variant="outline" className="border-emerald-600 text-emerald-600">
                                  {lawyer.specialization}
                                </Badge>
                                <span className="flex items-center text-sm text-gray-600">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {lawyer.location}
                                </span>
                                <span className="flex items-center text-sm text-gray-600">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {lawyer.experience} years
                                </span>
                              </div>

                              <div className="flex items-center space-x-4 mb-3">
                                <div className="flex items-center">
                                  {renderStars(lawyer.rating)}
                                  <span className="ml-2 text-sm text-gray-600">
                                    {lawyer.rating} ({lawyer.reviewCount} reviews)
                                  </span>
                                </div>
                              </div>

                              <p className="text-gray-600 text-sm mb-3">{lawyer.description}</p>

                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <GraduationCap className="h-4 w-4 mr-1" />
                                  {lawyer.education}
                                </span>
                                <span className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {lawyer.cases} cases
                                </span>
                              </div>

                              <div className="flex flex-wrap gap-1 mt-3">
                                {lawyer.languages.map(lang => (
                                  <Badge key={lang} variant="outline" className="text-xs">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Rate and Actions */}
                            <div className="md:text-right mt-4 md:mt-0">
                              <div className="text-2xl font-bold text-emerald-600 mb-1">
                                PKR {lawyer.hourlyRate.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600 mb-3">per hour</div>
                              
                              <div className="text-sm text-green-600 mb-4">
                                Response time: {lawyer.responseTime}
                              </div>

                              <div className="space-y-2">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  Contact Now
                                </Button>
                                <Button variant="outline" className="w-full">
                                  View Profile
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredLawyers.length === 0 && (
                  <Card className="border-emerald-100">
                    <CardContent className="p-12 text-center">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No Lawyers Found</h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your search criteria or filters
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedLocation('');
                          setSelectedSpecialization('');
                          setRateRange([0, 10000]);
                          setMinRating(0);
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
      </div>
    </div>
  );
};

export default Lawyers;
