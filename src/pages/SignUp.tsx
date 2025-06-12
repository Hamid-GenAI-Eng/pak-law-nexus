
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Scale, User, Briefcase, MapPin, GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'local',
    phone: '',
    city: '',
    // Lawyer specific fields
    barCouncilId: '',
    specialization: '',
    experience: '',
    education: '',
    about: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please ensure both passwords match",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created Successfully!",
        description: `Welcome to Wakalat-GPT! Your ${formData.role === 'lawyer' ? 'lawyer' : 'local person'} account is ready.`,
      });
      navigate('/chat');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-2xl mx-auto animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-2xl font-bold">
            <Scale className="h-8 w-8 text-emerald-600" />
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              Wakalat-GPT
            </span>
          </Link>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        <Card className="shadow-lg border-emerald-100">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-800">Join Wakalat-GPT</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">I am a:</Label>
                <RadioGroup value={formData.role} onValueChange={(value) => handleInputChange('role', value)} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="local" id="local" />
                    <Label htmlFor="local" className="flex items-center space-x-2 cursor-pointer">
                      <User className="h-4 w-4 text-blue-600" />
                      <span>Local Person</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lawyer" id="lawyer" />
                    <Label htmlFor="lawyer" className="flex items-center space-x-2 cursor-pointer">
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                      <span>Lawyer</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="border-gray-300 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="border-gray-300 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="border-gray-300 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Karachi, Lahore, Islamabad..."
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                    className="border-gray-300 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className="border-gray-300 focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    className="border-gray-300 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Lawyer Specific Fields */}
              {formData.role === 'lawyer' && (
                <div className="space-y-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h3 className="font-semibold text-emerald-800 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Lawyer Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="barCouncilId">Bar Council ID</Label>
                      <Input
                        id="barCouncilId"
                        placeholder="Your Bar Council ID"
                        value={formData.barCouncilId}
                        onChange={(e) => handleInputChange('barCouncilId', e.target.value)}
                        required
                        className="border-emerald-300 focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="5"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        required
                        className="border-emerald-300 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      placeholder="Criminal Law, Civil Law, Corporate Law..."
                      value={formData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                      required
                      className="border-emerald-300 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      placeholder="LLB from XYZ University"
                      value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      required
                      className="border-emerald-300 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="about">About You</Label>
                    <Textarea
                      id="about"
                      placeholder="Brief description about your practice and expertise..."
                      value={formData.about}
                      onChange={(e) => handleInputChange('about', e.target.value)}
                      className="border-emerald-300 focus:border-emerald-500"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Sign Up Button */}
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-3"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>🔒 Your information is protected and will be verified before activation</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
