import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Shield, Crown, Users } from "lucide-react";

interface Match {
  id: string;
  firstName: string;
  age: number;
  location: string;
  bio: string;
  compatibilityScore: number;
  relationshipType: string;
  isVerified: boolean;
  isFounder: boolean;
  hasPolycule: boolean;
  badges: string[];
}

interface MatchCardProps {
  match: Match;
  onLike: (matchId: string) => void;
  onNudge: (matchId: string) => void;
  onViewProfile: (matchId: string) => void;
  isPaidUser: boolean;
}

export function MatchCard({ match, onLike, onNudge, onViewProfile, isPaidUser }: MatchCardProps) {
  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "compatibility-high";
    if (score >= 60) return "compatibility-medium";
    return "compatibility-low";
  };

  const getCompatibilityTier = (score: number) => {
    if (score >= 80) return "High";
    if (score >= 60) return "Medium";
    return "Low";
  };

  return (
    <Card className="hover:shadow-card transition-all duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {match.firstName[0]}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{match.firstName}, {match.age}</h3>
                {match.isFounder && (
                  <Crown className="h-4 w-4 text-founder" />
                )}
                {match.isVerified && (
                  <Shield className="h-4 w-4 text-compatibility-high" />
                )}
                {match.hasPolycule && (
                  <Users className="h-4 w-4 text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{match.location}</p>
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <Badge 
              variant="outline" 
              className={`text-${getCompatibilityColor(match.compatibilityScore)}`}
            >
              {match.compatibilityScore}% • {getCompatibilityTier(match.compatibilityScore)}
            </Badge>
            <p className="text-xs text-muted-foreground">{match.relationshipType}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground line-clamp-3">{match.bio}</p>
        
        {match.badges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {match.badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {isPaidUser ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onLike(match.id)}
                className="flex-1"
              >
                <Heart className="h-4 w-4 mr-1" />
                Like
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => onNudge(match.id)}
                className="flex-1"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Nudge
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewProfile(match.id)}
              className="flex-1"
            >
              View Details
            </Button>
          )}
        </div>
        
        {!isPaidUser && (
          <div className="text-center p-2 bg-muted/50 rounded text-xs text-muted-foreground">
            Upgrade to HAVEN+ to send likes and start conversations
          </div>
        )}
      </CardContent>
    </Card>
  );
}