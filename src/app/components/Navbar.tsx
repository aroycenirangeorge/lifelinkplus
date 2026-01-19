import { useState } from "react";
import {
  Heart,
  Home,
  Droplet,
  DollarSign,
  AlertTriangle,
  Calendar,
  User,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({
  currentPage,
  onNavigate,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "blood", label: "Blood", icon: Droplet },
    { id: "donations", label: "Donations", icon: DollarSign },
    { id: "disaster", label: "Disaster", icon: AlertTriangle },
    { id: "events", label: "Events", icon: Calendar },
    { id: "dashboard", label: "Dashboard", icon: User },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-2 rounded-lg">
              <Heart
                className="w-6 h-6 text-white"
                fill="white"
              />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              LifeLink+
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                      : "text-gray-700 hover:bg-red-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}

            {/* Admin Panel Access */}
            <Button
              variant="ghost"
              onClick={() => onNavigate("admin")}
              className="flex items-center gap-2 text-purple-700 hover:bg-purple-50 relative"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
              <Badge className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs px-1">
                Demo
              </Badge>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-start gap-3 ${
                    isActive
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                      : "text-gray-700 hover:bg-red-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}