import { Heart, Droplet, DollarSign, Calendar, Award, TrendingUp, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { currentUser, thankYouMessages, events, bloodRequests, getGreeting, isBirthday } from '@/data/mockData';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const greeting = getGreeting();
  const isUserBirthday = isBirthday(currentUser.birthday);

  const stats = [
    {
      label: 'Blood Donated',
      value: `${currentUser.totalDonations} times`,
      subtext: 'Last: Nov 15, 2025',
      icon: Droplet,
      gradient: 'from-red-500 to-red-600',
      iconBg: 'bg-red-100'
    },
    {
      label: 'Money Donated',
      value: `₹${currentUser.totalMoneyDonated.toLocaleString()}`,
      subtext: `${currentUser.causesSupported} causes supported`,
      icon: DollarSign,
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100'
    },
    {
      label: 'People Helped',
      value: '150+',
      subtext: 'Direct impact',
      icon: Heart,
      gradient: 'from-pink-500 to-pink-600',
      iconBg: 'bg-pink-100'
    },
    {
      label: 'Events Attended',
      value: `${currentUser.eventsAttended}`,
      subtext: 'Volunteer activities',
      icon: Calendar,
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      label: 'Impact Score',
      value: `${currentUser.impactScore}`,
      subtext: 'Top 5% contributor',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Greeting Section */}
        <Card className="mb-6 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {greeting}, {currentUser.name}! 👋
                </h1>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-3 py-1">
                    ⭐ You saved {currentUser.totalDonations > 3 ? '3' : currentUser.totalDonations} lives
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-3 py-1">
                    🏆 Community Hero
                  </Badge>
                  {currentUser.totalDonations >= 5 && (
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-3 py-1">
                      💪 Consistent Donor
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => onNavigate('blood')}
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                >
                  <Droplet className="w-4 h-4 mr-2" />
                  Donate Now
                </Button>
              </div>
            </div>

            {/* Birthday Reminder */}
            {isUserBirthday && (
              <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">🎂</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Happy Birthday, {currentUser.name}! 🎉</h3>
                    <p className="text-white/90 text-sm mb-3">
                      Celebrate by making someone else's day special! Consider donating blood or supporting a cause close to your heart.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => onNavigate('donations')}
                      className="bg-white text-pink-600 hover:bg-white/90"
                    >
                      Make a Birthday Impact
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Horizontal Stats Cards */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Impact Dashboard</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max md:grid md:grid-cols-5 md:min-w-0">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label} className="min-w-[200px] md:min-w-0 hover:shadow-lg transition-shadow bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`${stat.iconBg} p-3 rounded-xl`}>
                          <Icon className={`w-6 h-6 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`} style={{ fill: 'currentColor' }} />
                        </div>
                      </div>
                      <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
                      <div className="text-xs text-gray-500">{stat.subtext}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <Card className="mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Your Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {currentUser.badges.map((badge) => (
                <div
                  key={badge}
                  className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
                >
                  🏆 {badge}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vertical Split View - Thank You Messages & Upcoming Opportunities */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Thank You Messages & Impact Stories */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
              Your Impact Stories
            </h2>
            
            <ScrollArea className="h-[600px]">
              <div className="space-y-4 pr-4">
                {thankYouMessages.map((message) => {
                  const typeColors = {
                    blood: 'from-red-500 to-red-600',
                    money: 'from-green-500 to-green-600',
                    volunteer: 'from-blue-500 to-blue-600',
                    disaster: 'from-orange-500 to-orange-600'
                  };

                  const typeLabels = {
                    blood: 'Blood Donation',
                    money: 'Money Donation',
                    volunteer: 'Volunteering',
                    disaster: 'Disaster Relief'
                  };

                  return (
                    <Card key={message.id} className="hover:shadow-md transition-shadow bg-white">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`bg-gradient-to-br ${typeColors[message.type]} p-2 rounded-lg`}>
                            <Heart className="w-5 h-5 text-white" fill="white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-gray-900">{message.from}</h3>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {typeLabels[message.type]}
                                </Badge>
                              </div>
                              <span className="text-xs text-gray-500">{new Date(message.date).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{message.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Right Column - Nearby Events & Opportunities */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-500" />
              Opportunities Near You
            </h2>

            <ScrollArea className="h-[600px]">
              <div className="space-y-4 pr-4">
                {/* Critical Blood Needs */}
                <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center gap-2 text-lg">
                      <Droplet className="w-5 h-5" />
                      Critical Blood Needs Nearby
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {bloodRequests.slice(0, 2).map((request) => (
                      <div key={request.id} className="bg-white rounded-lg p-3 border border-red-200">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{request.hospital}</h4>
                            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {request.location} • {request.distance}
                            </p>
                          </div>
                          <Badge className={`
                            ${request.urgency === 'Critical' ? 'bg-red-600' : request.urgency === 'High' ? 'bg-orange-500' : 'bg-yellow-500'}
                            text-white
                          `}>
                            {request.urgency}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="border-red-300 text-red-700">
                            {request.bloodGroup}
                          </Badge>
                          <span className="text-xs text-gray-600">{request.unitsNeeded} units needed</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => onNavigate('blood')}
                          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
                        >
                          Help Now
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                {events.slice(0, 3).map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{event.name}</h3>
                              <p className="text-xs text-gray-600 mt-1">by {event.ngo}</p>
                            </div>
                            <Badge variant="outline">{event.category}</Badge>
                          </div>
                          <div className="space-y-1 mb-3">
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(event.date).toLocaleDateString()} at {event.time}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onNavigate('events')}
                            className="w-full hover:bg-blue-50 hover:border-blue-300"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* See All Events */}
                <Button
                  onClick={() => onNavigate('events')}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90"
                >
                  See All Events & Opportunities
                </Button>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
