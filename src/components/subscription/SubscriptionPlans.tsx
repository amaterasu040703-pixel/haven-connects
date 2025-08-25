import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  isPopular?: boolean;
  isFounder?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Basic discovery and limited interactions",
    price: { monthly: 0, annual: 0 },
    features: [
      "Complete relationship survey",
      "View match compatibility scores",
      "Limited match details",
      "Receive nudges from paid members",
      "Basic safety features"
    ]
  },
  {
    id: "plus",
    name: "HAVEN+",
    description: "Full access to matching and messaging",
    price: { monthly: 29, annual: 290 },
    features: [
      "Everything in Free",
      "Send likes and nudges",
      "Unlimited messaging after handshakes",
      "View full match profiles",
      "Access to public photos",
      "Priority customer support"
    ],
    isPopular: true
  },
  {
    id: "select",
    name: "HAVEN Select",
    description: "Premium experience with enhanced verification",
    price: { monthly: 59, annual: 590 },
    features: [
      "Everything in HAVEN+",
      "Enhanced verification badge",
      "Background check verification",
      "Priority in discovery",
      "Access to exclusive events",
      "Concierge matching support"
    ]
  }
];

interface SubscriptionPlansProps {
  isFounder?: boolean;
  cityIsLive?: boolean;
  onPlanSelect: (planId: string, billing: 'monthly' | 'annual') => void;
}

export function SubscriptionPlans({ isFounder, cityIsLive, onPlanSelect }: SubscriptionPlansProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            Choose Your Membership
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Haven is built for intentional connections. Choose the plan that matches your relationship goals.
          </p>
          
          {isFounder && (
            <div className="flex items-center justify-center gap-2 p-4 bg-founder/10 rounded-lg border border-founder/20">
              <Crown className="h-5 w-5 text-founder" />
              <span className="font-medium text-founder">
                Founder benefits: 30 days free + lifetime discount
              </span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${plan.isPopular ? 'ring-2 ring-primary shadow-elegant' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                
                <div className="space-y-2">
                  {plan.price.monthly > 0 ? (
                    <>
                      <div className="text-3xl font-bold">
                        ${isFounder ? Math.round(plan.price.monthly * 0.8) : plan.price.monthly}
                        <span className="text-base font-normal text-muted-foreground">/month</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${isFounder ? Math.round(plan.price.annual * 0.8) : plan.price.annual} billed annually
                        {isFounder && <span className="text-founder ml-1">(20% off)</span>}
                      </div>
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-muted-foreground">Free</div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-compatibility-high mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-2">
                  {plan.price.monthly > 0 ? (
                    <>
                      <Button 
                        variant={plan.isPopular ? "primary" : "outline"}
                        className="w-full"
                        onClick={() => onPlanSelect(plan.id, 'monthly')}
                        disabled={!cityIsLive}
                      >
                        {cityIsLive ? "Start Monthly" : "Join Waitlist"}
                      </Button>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        onClick={() => onPlanSelect(plan.id, 'annual')}
                        disabled={!cityIsLive}
                      >
                        {cityIsLive ? "Start Annual (Save 17%)" : "Join Waitlist - Annual"}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => onPlanSelect(plan.id, 'monthly')}
                      disabled={!cityIsLive}
                    >
                      {cityIsLive ? "Start Free" : "Join Waitlist"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>All plans include basic safety features and community guidelines enforcement</p>
          <p>Cancel anytime • 30-day money-back guarantee • No hidden fees</p>
        </div>
      </div>
    </div>
  );
}