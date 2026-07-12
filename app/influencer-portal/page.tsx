"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, Users, DollarSign, BarChart3, Lock, AlertCircle } from 'lucide-react';

// Complete influencer accounts with ALL data
const VALID_INFLUENCERS = {
  'VISABITS10': { 
    password: 'visabits123', 
    name: 'Sarah Johnson',
    promoCode: 'VISABITS10',
    totalReferrals: 24,
    commissionPerReferral: 10,
    clients: [
      { id: 1, name: 'John Doe', date: '2024-03-15' },
      { id: 2, name: 'Emma Smith', date: '2024-03-14' },
      { id: 3, name: 'Michael Brown', date: '2024-03-12' },
      { id: 4, name: 'Lisa Wong', date: '2024-03-10' },
      { id: 5, name: 'David Miller', date: '2024-03-08' },
    ]
  },
  'TRAVEL20': { 
    password: 'travel2024', 
    name: 'Mike Travels',
    promoCode: 'TRAVEL20',
    totalReferrals: 4,
    commissionPerReferral: 10,
    clients: [
      { id: 1, name: 'Alice Cooper', date: '2024-03-15' },
      { id: 2, name: 'Robert Lee', date: '2024-03-13' },
      { id: 3, name: 'Sophia Chen', date: '2024-03-10' },
      { id: 4, name: 'James Wilson', date: '2024-03-08' },
    ]
  },
  'VISABITS25': { 
    password: 'partner25', 
    name: 'Emma Davis',
    promoCode: 'VISABITS25',
    totalReferrals: 3,
    commissionPerReferral: 10,
    clients: [
      { id: 1, name: 'Olivia Martinez', date: '2024-03-14' },
      { id: 2, name: 'William Taylor', date: '2024-03-12' },
      { id: 3, name: 'Ava Anderson', date: '2024-03-09' },
    ]
  }
};

export default function InfluencerPortalPage() {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const upperCode = promoCode.toUpperCase();
    const influencer = VALID_INFLUENCERS[upperCode as keyof typeof VALID_INFLUENCERS];

    if (influencer && influencer.password === password) {
      // Store the COMPLETE influencer data (all fields)
      localStorage.setItem('influencer', JSON.stringify(influencer));
      router.push('/influencer-portal/dashboard');
    } else {
      setError('Invalid promo code or password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <main className="pt-20 min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container-custom section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mx-auto mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              Influencer Portal
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Partner Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your referrals, view earnings, and manage your partnership with VisaBits
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Login Form */}
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Influencer Login</h2>
                    <p className="text-sm text-muted-foreground">Access your dashboard</p>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="promo-code">Your Promo Code *</Label>
                    <Input
                      id="promo-code"
                      placeholder="Enter your unique promo code"
                      className="text-lg font-mono"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This is the code provided to you by VisaBits
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Demo passwords: visabits123, travel2024, partner25
                    </p>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Access Dashboard'}
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t">
                  <p className="text-sm text-muted-foreground mb-4">
                    Not a partner yet?
                  </p>
                  <Button variant="outline" className="w-full">
                    Apply to Become a Partner
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Features Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Dashboard Features</h3>
                <p className="text-muted-foreground mb-6">
                  Once logged in, you'll have access to powerful tools to track and grow your referrals
                </p>
              </div>

              <div className="grid gap-4">
                <Card className="border-2 border-primary/20 hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Track Referrals</h4>
                        <p className="text-sm text-muted-foreground">
                          See how many clients have used your promo code in real-time
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary/20 hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Booking Statistics</h4>
                        <p className="text-sm text-muted-foreground">
                          View detailed analytics of successful bookings from your referrals
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary/20 hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Commission Tracking</h4>
                        <p className="text-sm text-muted-foreground">
                          Monitor your earnings per client and total commission generated
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary/20 hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Growth Insights</h4>
                        <p className="text-sm text-muted-foreground">
                          Get insights on your performance and tips to increase referrals
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}