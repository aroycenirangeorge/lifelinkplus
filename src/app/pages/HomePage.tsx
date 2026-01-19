import { Droplet, DollarSign, AlertTriangle, Calendar, Heart, Users, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { DemoLogin } from '@/app/components/DemoLogin';
import { useState } from 'react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [showDemoLogin, setShowDemoLogin] = useState(false);

  const mainActions = [
    {
      id: 'blood',
      title: 'Donate Blood',
      description: 'Save lives by donating blood to those in critical need',
      icon: Droplet,
      gradient: 'from-red-500 to-red-700',
      stat: '3 Critical Requests',
      bgImage: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800'
    },
    {
      id: 'donations',
      title: 'Donate Money',
      description: 'Support verified NGOs and make a lasting impact',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-700',
      stat: '12 Verified NGOs',
      bgImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800'
    },
    {
      id: 'disaster',
      title: 'Disaster Relief',
      description: 'Help communities affected by natural disasters',
      icon: AlertTriangle,
      gradient: 'from-orange-500 to-red-700',
      stat: '2 Active Emergencies',
      bgImage: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800'
    },
    {
      id: 'events',
      title: 'Events Near Me',
      description: 'Join volunteer activities in your community',
      icon: Calendar,
      gradient: 'from-blue-500 to-indigo-700',
      stat: '5 Upcoming Events',
      bgImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800'
    }
  ];

  const impactStats = [
    { label: 'Lives Saved', value: '2,500+', icon: Heart, color: 'text-red-600' },
    { label: 'Active Volunteers', value: '1,200+', icon: Users, color: 'text-blue-600' },
    { label: 'Funds Raised', value: '₹25L+', icon: TrendingUp, color: 'text-green-600' },
    { label: 'NGOs Verified', value: '50+', icon: Award, color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-pink-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Heart className="w-5 h-5" fill="currentColor" />
              <span className="text-sm font-medium">AI-Powered Social Impact Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              One Platform,
              <br />
              <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Infinite Impact
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Donate blood, support causes, volunteer, and help disaster relief - all in one place
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => setShowDemoLogin(true)}
                className="bg-white text-red-600 hover:bg-gray-100 shadow-lg text-lg px-8 py-6 rounded-2xl"
              >
                <Heart className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('blood')}
                className="border-2 border-white text-white hover:bg-white/10 shadow-lg text-lg px-8 py-6 rounded-2xl"
              >
                See Critical Needs
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-white shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How Can You Help Today?</h2>
          <p className="text-xl text-gray-600">Choose your way to make an impact</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {mainActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.id}
                className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-red-200"
                onClick={() => onNavigate(action.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={action.bgImage}
                    alt={action.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-800">{action.stat}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 mb-4">{action.description}</p>
                  <Button className={`w-full bg-gradient-to-r ${action.gradient} text-white hover:opacity-90`}>
                    Explore Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why LifeLink AI?</h2>
            <p className="text-xl text-gray-600">Powered by AI, driven by compassion</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-red-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unified Platform</h3>
              <p className="text-gray-600">One account for all your social impact activities - blood, money, volunteering, and disaster relief</p>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Matching</h3>
              <p className="text-gray-600">Smart algorithms match urgent needs with available donors and volunteers in real-time</p>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified & Trusted</h3>
              <p className="text-gray-600">All NGOs are verified, and you can track exactly where your contributions make an impact</p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-white/90">Join thousands of community heroes changing lives every day</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={() => setShowDemoLogin(true)}
              className="bg-white text-red-600 hover:bg-gray-100 shadow-lg text-lg px-8 py-6 rounded-2xl"
            >
              Start Your Impact Journey
            </Button>
          </div>
        </div>
      </div>

      <DemoLogin open={showDemoLogin} onOpenChange={setShowDemoLogin} onNavigate={onNavigate} />
    </div>
  );
}