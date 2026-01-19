import { useState } from 'react';
import { Droplet, MapPin, Phone, Calendar, AlertCircle, Info, CheckCircle, X, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { currentUser, bloodRequests, bloodCamps } from '@/data/mockData';
import { toast } from 'sonner';

interface BloodPageProps {
  onNavigate: (page: string) => void;
}

export function BloodPage({ onNavigate }: BloodPageProps) {
  const [isAvailable, setIsAvailable] = useState(currentUser.available);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showDonorForm, setShowDonorForm] = useState(false);

  const handleContact = (request: typeof bloodRequests[0]) => {
    toast.success(`Contact initiated with ${request.contactName}`, {
      description: `Call ${request.contactPhone} for ${request.bloodGroup} blood at ${request.hospital}`
    });
  };

  const handleJoinCamp = (camp: typeof bloodCamps[0]) => {
    toast.success('Successfully registered for blood camp!', {
      description: `${camp.name} on ${new Date(camp.date).toLocaleDateString()}`
    });
  };

  const handleReminder = (camp: typeof bloodCamps[0]) => {
    toast.success('Reminder set!', {
      description: `We'll remind you about ${camp.name} one day before`
    });
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Profile Stats */}
        <Card className="mb-6 bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Droplet className="w-10 h-10 text-white" fill="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Blood Donation</h1>
                  <p className="text-white/90">Save lives, donate blood</p>
                </div>
              </div>
            </div>

            {/* Horizontal Profile + Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-sm text-white/80 mb-1">Blood Group</div>
                <div className="text-2xl font-bold">{currentUser.bloodGroup}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-sm text-white/80 mb-1">Last Donation</div>
                <div className="text-lg font-semibold">{new Date(currentUser.lastDonation).toLocaleDateString()}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-sm text-white/80 mb-1">Total Donations</div>
                <div className="text-2xl font-bold">{currentUser.totalDonations}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-sm text-white/80 mb-1">Lives Impacted</div>
                <div className="text-2xl font-bold">{currentUser.totalDonations * 3}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-sm text-white/80 mb-2">Availability</div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={setIsAvailable}
                    className="data-[state=checked]:bg-white"
                  />
                  <span className="text-sm font-semibold">{isAvailable ? 'Available' : 'Unavailable'}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => setShowRequestForm(true)}
            className="bg-gradient-to-r from-red-600 to-pink-600 text-white hover:opacity-90 py-6 text-lg"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            Request Blood
          </Button>
          <Button
            onClick={() => setShowDonorForm(true)}
            variant="outline"
            className="border-2 border-red-500 text-red-600 hover:bg-red-50 py-6 text-lg"
          >
            <User className="w-5 h-5 mr-2" />
            Update Donor Profile
          </Button>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="requests">Critical Needs</TabsTrigger>
            <TabsTrigger value="camps">Blood Camps</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          {/* Critical Blood Requests */}
          <TabsContent value="requests" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Critical Blood Needs Nearby</h2>
              <Badge className="bg-red-600 text-white">
                {bloodRequests.filter(r => r.urgency === 'Critical').length} Critical
              </Badge>
            </div>

            <div className="space-y-4">
              {bloodRequests.map((request) => {
                const urgencyColors = {
                  Critical: 'from-red-600 to-red-700',
                  High: 'from-orange-500 to-orange-600',
                  Medium: 'from-yellow-500 to-yellow-600'
                };

                const isRareBlood = ['AB-', 'B-', 'O-', 'A-'].includes(request.bloodGroup);

                return (
                  <Card key={request.id} className={`hover:shadow-lg transition-shadow ${request.urgency === 'Critical' ? 'border-2 border-red-300' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-4">
                            <div className={`bg-gradient-to-br ${urgencyColors[request.urgency]} p-3 rounded-xl`}>
                              <Droplet className="w-6 h-6 text-white" fill="white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900">{request.hospital}</h3>
                                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                    <MapPin className="w-4 h-4" />
                                    {request.location}
                                  </p>
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                  <Badge className={`bg-gradient-to-r ${urgencyColors[request.urgency]} text-white`}>
                                    {request.urgency}
                                  </Badge>
                                  {isRareBlood && (
                                    <Badge variant="outline" className="border-purple-500 text-purple-700">
                                      Rare Blood
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="text-xs text-gray-600 mb-1">Blood Group</div>
                                  <div className="text-lg font-bold text-red-600">{request.bloodGroup}</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="text-xs text-gray-600 mb-1">Units Needed</div>
                                  <div className="text-lg font-bold text-gray-900">{request.unitsNeeded}</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="text-xs text-gray-600 mb-1">Distance</div>
                                  <div className="text-lg font-bold text-blue-600">{request.distance}</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <div className="text-xs text-gray-600 mb-1">Posted</div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {new Date(request.datePosted).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                <Button
                                  onClick={() => handleContact(request)}
                                  className={`flex-1 bg-gradient-to-r ${urgencyColors[request.urgency]} text-white hover:opacity-90`}
                                >
                                  <Phone className="w-4 h-4 mr-2" />
                                  Contact Now
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-gray-300 hover:bg-gray-50"
                                >
                                  <Info className="w-4 h-4 mr-2" />
                                  More Info
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Blood Camps */}
          <TabsContent value="camps" className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Blood Donation Camps</h2>

            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 min-w-max md:grid md:grid-cols-3 md:min-w-0">
                {bloodCamps.map((camp) => (
                  <Card key={camp.id} className="min-w-[320px] md:min-w-0 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-red-50">
                    <CardContent className="p-6">
                      <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-4 mb-4 text-white">
                        <Calendar className="w-8 h-8 mb-2" />
                        <div className="text-sm font-medium mb-1">Upcoming Camp</div>
                        <div className="text-2xl font-bold">{new Date(camp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{camp.name}</h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{camp.organizer}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{camp.location}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{camp.time}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleJoinCamp(camp)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90"
                        >
                          Join Camp
                        </Button>
                        <Button
                          onClick={() => handleReminder(camp)}
                          variant="outline"
                          size="icon"
                          className="border-red-300 hover:bg-red-50"
                        >
                          <Calendar className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Guidelines */}
          <TabsContent value="guidelines" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Eligibility */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-700 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Age: 18-65 years</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Weight: Minimum 50kg</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Hemoglobin: &gt;12.5 g/dL</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Must be healthy and fit</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>90 days gap from last donation</span>
                  </div>
                </CardContent>
              </Card>

              {/* Do's */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Do's
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>Drink plenty of water before</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>Eat a healthy meal 2-3 hours prior</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>Get adequate sleep</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>Bring valid ID proof</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span>Rest for 10-15 min after donation</span>
                  </div>
                </CardContent>
              </Card>

              {/* Don'ts */}
              <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    Don'ts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5" />
                    <span>Don't donate on empty stomach</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5" />
                    <span>Avoid alcohol 24 hours before</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5" />
                    <span>Don't smoke 2 hours before/after</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5" />
                    <span>Avoid strenuous activity after</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-600 mt-0.5" />
                    <span>Don't donate if you have cold/fever</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recovery Tips */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-700">Recovery Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-purple-600 mt-0.5" />
                    <span>Drink extra fluids for 24-48 hours after donation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-purple-600 mt-0.5" />
                    <span>Eat iron-rich foods to replenish iron stores</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-purple-600 mt-0.5" />
                    <span>Keep bandage on for 4-5 hours</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-purple-600 mt-0.5" />
                    <span>If you feel dizzy, lie down and elevate feet</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Request Blood Dialog */}
        <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Request Blood</DialogTitle>
              <DialogDescription>Fill in the details for blood requirement</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bloodGroup">Blood Group *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map(group => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hospital">Hospital Name *</Label>
                <Input id="hospital" placeholder="Enter hospital name" />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div>
                <Label htmlFor="units">Units Needed *</Label>
                <Input id="units" type="number" placeholder="Enter number of units" />
              </div>
              <div>
                <Label htmlFor="urgency">Urgency *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contact">Contact Number *</Label>
                <Input id="contact" placeholder="Enter contact number" />
              </div>
              <Button
                onClick={() => {
                  toast.success('Blood request submitted successfully!');
                  setShowRequestForm(false);
                }}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white"
              >
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Donor Registration Dialog */}
        <Dialog open={showDonorForm} onOpenChange={setShowDonorForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Update Donor Profile</DialogTitle>
              <DialogDescription>Keep your donor information up to date</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" defaultValue={currentUser.name} />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input id="age" type="number" placeholder="Enter age" />
              </div>
              <div>
                <Label htmlFor="bloodGroupUpdate">Blood Group *</Label>
                <Select defaultValue={currentUser.bloodGroup}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map(group => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" defaultValue={currentUser.city} />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" defaultValue={currentUser.phone} />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" defaultValue={currentUser.email} />
              </div>
              <div>
                <Label htmlFor="lastDonation">Last Donation Date</Label>
                <Input id="lastDonation" type="date" defaultValue={currentUser.lastDonation} />
              </div>
              <Button
                onClick={() => {
                  toast.success('Donor profile updated successfully!');
                  setShowDonorForm(false);
                }}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white"
              >
                Update Profile
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
