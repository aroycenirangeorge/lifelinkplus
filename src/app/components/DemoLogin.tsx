import { useState } from 'react';
import { User, Shield, Building2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { toast } from 'sonner';

interface DemoLoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: string) => void;
}

export function DemoLogin({ open, onOpenChange, onNavigate }: DemoLoginProps) {
  const demoUsers = [
    {
      type: 'user',
      title: 'Regular User',
      description: 'Experience the platform as a donor/volunteer',
      icon: User,
      color: 'from-blue-500 to-indigo-600',
      page: 'dashboard'
    },
    {
      type: 'ngo',
      title: 'NGO Account',
      description: 'Manage campaigns and events',
      icon: Building2,
      color: 'from-green-500 to-emerald-600',
      page: 'donations'
    },
    {
      type: 'admin',
      title: 'Admin Panel',
      description: 'Platform management and oversight',
      icon: Shield,
      color: 'from-purple-500 to-violet-600',
      page: 'admin'
    }
  ];

  const handleLogin = (type: string, page: string) => {
    toast.success(`Logged in as ${type}!`, {
      description: 'Welcome to LifeLink AI'
    });
    onOpenChange(false);
    onNavigate(page);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Demo Login</DialogTitle>
          <DialogDescription>
            Choose a demo account to explore LifeLink AI
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-4">
          {demoUsers.map((user) => {
            const Icon = user.icon;
            return (
              <Card
                key={user.type}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleLogin(user.title, user.page)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`bg-gradient-to-r ${user.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{user.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{user.description}</p>
                  <Button className={`w-full bg-gradient-to-r ${user.color} text-white hover:opacity-90`}>
                    Login
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          This is a demo application. No real authentication is required.
        </p>
      </DialogContent>
    </Dialog>
  );
}
