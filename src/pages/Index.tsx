import { useState, useEffect } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { CitySelection } from "@/components/onboarding/CitySelection";
import { SubscriptionPlans } from "@/components/subscription/SubscriptionPlans";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Users, Crown, Shield, MessageCircle } from "lucide-react";

// Mock user state for MVP demo
interface User {
  id: string;
  email: string;
  profile?: {
    firstName?: string;
    city?: string;
    hasCompletedSurvey?: boolean;
    subscription?: {
      tier: string;
      isFounder: boolean;
    };
  };
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentFlow, setCurrentFlow] = useState<'auth' | 'city' | 'subscription' | 'dashboard'>('auth');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock authentication
  const handleAuth = async (email: string, password: string, isSignUp: boolean) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      profile: {
        firstName: email.split('@')[0],
        city: undefined,
        hasCompletedSurvey: false,
        subscription: undefined
      }
    };
    
    setUser(mockUser);
    setCurrentFlow('city');
    setLoading(false);
    
    toast({
      title: isSignUp ? "Account created!" : "Welcome back!",
      description: "Let's get you set up on Haven."
    });
  };

  const handleCitySelect = (cityId: string) => {
    if (user) {
      setUser({
        ...user,
        profile: {
          ...user.profile,
          city: cityId
        }
      });
      setCurrentFlow('subscription');
    }
  };

  const handlePlanSelect = (planId: string, billing: 'monthly' | 'annual') => {
    if (user) {
      setUser({
        ...user,
        profile: {
          ...user.profile,
          subscription: {
            tier: planId,
            isFounder: true // Demo as founder for first 500
          }
        }
      });
      setCurrentFlow('dashboard');
      
      toast({
        title: "Subscription activated!",
        description: `Welcome to Haven ${planId === 'plus' ? '+' : planId === 'select' ? 'Select' : ''}! Time to complete your relationship survey.`
      });
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentFlow('auth');
  };

  // Demo dashboard content
  const DashboardContent = () => (
    <AppLayout user={user} onSignOut={handleSignOut}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  Welcome to Haven, {user?.profile?.firstName}!
                </CardTitle>
                <CardDescription className="text-base">
                  Austin's private relationship matching community
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {user?.profile?.subscription?.isFounder && (
                  <Badge variant="outline" className="border-founder text-founder">
                    <Crown className="h-3 w-3 mr-1" />
                    Founder
                  </Badge>
                )}
                <Badge variant="outline">
                  {user?.profile?.subscription?.tier === 'plus' ? 'HAVEN+' : 
                   user?.profile?.subscription?.tier === 'select' ? 'HAVEN Select' : 'Free'}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Next Steps */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Complete Your Survey
              </CardTitle>
              <CardDescription>
                Tell us about yourself to unlock personalized matching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="primary" className="w-full">
                Start Relationship Survey
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Verify Your Identity
              </CardTitle>
              <CardDescription>
                Add trust to your profile with photo & ID verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Start Verification
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Austin Community Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Austin Community</CardTitle>
            <CardDescription>
              See what's happening in your local Haven community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">342</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-compatibility-high">89</div>
                <div className="text-sm text-muted-foreground">Handshakes Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-founder">158</div>
                <div className="text-sm text-muted-foreground">Founder Spots Left</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder for future features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Discovery
              </CardTitle>
              <CardDescription>
                Find compatible matches based on your survey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">Coming after survey</Badge>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Messages
              </CardTitle>
              <CardDescription>
                Connect with matches through handshakes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">Coming after survey</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );

  // Render current flow
  if (currentFlow === 'auth') {
    return <AuthForm onAuth={handleAuth} loading={loading} />;
  }

  if (currentFlow === 'city') {
    return <CitySelection onCitySelect={handleCitySelect} />;
  }

  if (currentFlow === 'subscription') {
    return (
      <SubscriptionPlans
        isFounder={true} // Demo as founder
        cityIsLive={user?.profile?.city === 'austin'}
        onPlanSelect={handlePlanSelect}
      />
    );
  }

  return <DashboardContent />;
};

export default Index;
