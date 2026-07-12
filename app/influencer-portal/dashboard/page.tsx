"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Calendar, Copy, CheckCircle, LogOut, Gift } from 'lucide-react';

export default function InfluencerDashboard() {
  const router = useRouter();
  const [influencer, setInfluencer] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedInfluencer = localStorage.getItem('influencer');
    console.log('Stored influencer:', storedInfluencer); // Debug log
    
    if (!storedInfluencer) {
      router.push('/influencer-portal');
      return;
    }
    
    const data = JSON.parse(storedInfluencer);
    setInfluencer(data);
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('influencer');
    router.push('/influencer-portal');
  };

  const copyPromoCode = () => {
    if (influencer) {
      navigator.clipboard.writeText(influencer.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <main className="pt-20 min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  if (!influencer) {
    return (
      <main className="pt-20 min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <h2 className="text-2xl font-bold mb-4">No Data Found</h2>
          <p className="text-muted-foreground mb-6">We couldn't find your influencer data. Please contact support.</p>
          <Button onClick={() => router.push('/influencer-portal')}>Go Back</Button>
        </Card>
      </main>
    );
  }

  const totalEarnings = influencer.totalReferrals * influencer.commissionPerReferral;

  return (
    <main className="pt-20 min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container-custom section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <Badge variant="outline" className="mb-4">
                <TrendingUp className="w-4 h-4 mr-2" />
                Welcome Back
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold">
                Hello, {influencer.name}! 
              </h1>
              <p className="text-muted-foreground mt-2">
                Here's your referral performance overview
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">Total</Badge>
                </div>
                <p className="text-5xl font-bold text-primary">{influencer.totalReferrals}</p>
                <p className="text-muted-foreground mt-2">Total Referrals</p>
                <p className="text-xs text-muted-foreground mt-1">Clients who booked using your code</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100/30">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <Gift className="w-7 h-7 text-green-600" />
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Earnings</Badge>
                </div>
                <p className="text-5xl font-bold text-green-600">£{totalEarnings}</p>
                <p className="text-muted-foreground mt-2">Total Commission</p>
                <p className="text-xs text-muted-foreground mt-1">£{influencer.commissionPerReferral} per successful referral</p>
              </CardContent>
            </Card>
          </div>

          {/* Promo Code Section */}
          <Card className="mb-8 border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Your Promo Code</p>
                  <div className="flex items-center gap-3">
                    <code className="text-2xl font-mono font-bold text-primary">
                      {influencer.promoCode}
                    </code>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyPromoCode}
                      className="gap-2"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Share this code with your audience</p>
                  <p className="text-xs text-muted-foreground">Earn £{influencer.commissionPerReferral} for every successful booking</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Clients Table */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Your Referrals</h2>
                <Badge variant="outline">
                  <Calendar className="w-3 h-3 mr-1" />
                  Recent Clients
                </Badge>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Client Name</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                      <th className="text-center py-3 px-2 font-medium text-muted-foreground">Status</th>
                     </tr>
                  </thead>
                  <tbody>
                    {influencer.clients && influencer.clients.map((client: any, index: number) => (
                      <tr key={client.id || index} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-2 font-medium">{client.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">{client.date}</td>
                        <td className="py-3 px-2 text-center">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            ✓ Confirmed
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {(!influencer.clients || influencer.clients.length === 0) && (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No referrals yet. Start sharing your promo code!</p>
                  <p className="text-sm mt-1">Earn £{influencer.commissionPerReferral} for every client who books using your code</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}