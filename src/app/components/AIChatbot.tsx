import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { ScrollArea } from '@/app/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m LifeLink AI Assistant. How can I help you make an impact today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickReplies = [
    'Find blood donors near me',
    'Show urgent causes',
    'Upcoming events',
    'How can I help?'
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('blood') || input.includes('donate blood')) {
      return 'I found 3 critical blood requests near you in Mumbai. The most urgent is O- blood needed at Kokilaben Hospital, just 1.2 km away. Would you like to help?';
    }
    if (input.includes('urgent') || input.includes('critical')) {
      return 'There are 2 critical needs right now:\n1. Emergency Medical Fund needs ₹2000 (can save one life)\n2. O- blood needed at Kokilaben Hospital\n\nWhich would you like to support?';
    }
    if (input.includes('event')) {
      return 'Upcoming events near you:\n1. Beach Cleanup Drive - Jan 26 at Juhu Beach\n2. Teaching Workshop - Feb 1 at Andheri\n\nInterested in volunteering?';
    }
    if (input.includes('help') || input.includes('how')) {
      return 'You can make an impact in 4 ways:\n1. Donate Blood - Save lives directly\n2. Donate Money - Support verified causes\n3. Volunteer - Give your time\n4. Disaster Relief - Help in emergencies\n\nWhat interests you most?';
    }
    if (input.includes('impact') || input.includes('difference')) {
      return 'Amazing impact so far! You\'ve:\n✓ Saved 3 lives through blood donation\n✓ Supported 12 causes\n✓ Attended 5 volunteer events\n\nYour impact score: 950 points! Keep going! 🌟';
    }
    
    return 'I can help you find:\n• Blood donation opportunities\n• NGOs and causes to support\n• Volunteer events near you\n• Disaster relief needs\n\nWhat would you like to explore?';
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
        </div>
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-red-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-2 rounded-full">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold">LifeLink AI Assistant</h3>
            <p className="text-xs text-white/90">Here to help you make an impact</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-white border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <Button
                key={reply}
                variant="outline"
                size="sm"
                onClick={() => handleQuickReply(reply)}
                className="text-xs hover:bg-red-50 hover:border-red-300"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-br from-red-500 to-pink-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
