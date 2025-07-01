
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LawyerRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LawyerFormData) => void;
}

interface LawyerFormData {
  // Personal Details
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  dateOfBirth: string;
  
  // Academic Details
  lawDegree: string;
  university: string;
  graduationYear: string;
  barCouncilNumber: string;
  additionalQualifications: string[];
  
  // Career Details
  specialization: string;
  yearsOfExperience: string;
  currentFirm: string;
  hourlyRate: string;
  languages: string[];
  description: string;
  achievements: string;
}

const LawyerRegistrationForm = ({ isOpen, onClose, onSubmit }: LawyerRegistrationFormProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<LawyerFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    dateOfBirth: '',
    lawDegree: '',
    university: '',
    graduationYear: '',
    barCouncilNumber: '',
    additionalQualifications: [],
    specialization: '',
    yearsOfExperience: '',
    currentFirm: '',
    hourlyRate: '',
    languages: [],
    description: '',
    achievements: ''
  });

  const [newQualification, setNewQualification] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handleInputChange = (field: keyof LawyerFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addQualification = () => {
    if (newQualification.trim()) {
      setFormData(prev => ({
        ...prev,
        additionalQualifications: [...prev.additionalQualifications, newQualification.trim()]
      }));
      setNewQualification('');
    }
  };

  const removeQualification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalQualifications: prev.additionalQualifications.filter((_, i) => i !== index)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.barCouncilNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
    toast({
      title: "Registration Submitted",
      description: "Your lawyer profile has been successfully submitted for review.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-emerald-700">
            Lawyer Registration Form
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-emerald-600">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Academic Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-emerald-600">Academic Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lawDegree">Law Degree</Label>
                <Input
                  id="lawDegree"
                  value={formData.lawDegree}
                  onChange={(e) => handleInputChange('lawDegree', e.target.value)}
                  placeholder="e.g., LLB, LLM"
                />
              </div>
              <div>
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={formData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input
                  id="graduationYear"
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="barCouncilNumber">Bar Council Number *</Label>
                <Input
                  id="barCouncilNumber"
                  value={formData.barCouncilNumber}
                  onChange={(e) => handleInputChange('barCouncilNumber', e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label>Additional Qualifications</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                    placeholder="Add qualification"
                  />
                  <Button type="button" onClick={addQualification} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.additionalQualifications.map((qual, index) => (
                    <Badge key={index} variant="outline" className="pr-1">
                      {qual}
                      <button
                        type="button"
                        onClick={() => removeQualification(index)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-emerald-600">Career Details</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  placeholder="e.g., Criminal Law, Corporate Law"
                />
              </div>
              <div>
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  value={formData.yearsOfExperience}
                  onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="currentFirm">Current Firm/Practice</Label>
                <Input
                  id="currentFirm"
                  value={formData.currentFirm}
                  onChange={(e) => handleInputChange('currentFirm', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate (PKR)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Languages</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add language"
                  />
                  <Button type="button" onClick={addLanguage} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="pr-1">
                      {lang}
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Professional Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  placeholder="Brief description of your expertise and approach"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="achievements">Notable Achievements</Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements}
                  onChange={(e) => handleInputChange('achievements', e.target.value)}
                  rows={3}
                  placeholder="Awards, recognitions, notable cases, etc."
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Submit Registration
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LawyerRegistrationForm;
