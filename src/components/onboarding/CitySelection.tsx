import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock } from "lucide-react";

interface City {
  id: string;
  name: string;
  state: string;
  isLive: boolean;
  foundersAvailable: number;
  estimatedLaunch?: string;
}

const CITIES: City[] = [
  {
    id: "austin",
    name: "Austin",
    state: "TX",
    isLive: true,
    foundersAvailable: 342,
  },
  {
    id: "portland",
    name: "Portland",
    state: "OR",
    isLive: false,
    foundersAvailable: 500,
    estimatedLaunch: "Q2 2024",
  },
];

interface CitySelectionProps {
  onCitySelect: (cityId: string) => void;
}

export function CitySelection({ onCitySelect }: CitySelectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            Choose Your City
          </h1>
          <p className="text-muted-foreground">
            Haven launches city by city to build authentic local communities
          </p>
        </div>

        <div className="grid gap-4">
          {CITIES.map((city) => (
            <Card 
              key={city.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-card ${
                selectedCity === city.id ? "ring-2 ring-primary shadow-elegant" : ""
              }`}
              onClick={() => setSelectedCity(city.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">
                      {city.name}, {city.state}
                    </CardTitle>
                  </div>
                  {city.isLive ? (
                    <Badge className="bg-compatibility-high text-white">Live</Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      Waitlist
                    </Badge>
                  )}
                </div>
                
                <CardDescription>
                  {city.isLive 
                    ? "Start matching and connecting with verified members"
                    : `Join the waitlist - estimated launch ${city.estimatedLaunch}`
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>
                    {city.foundersAvailable} Founder spots available
                  </span>
                  {city.foundersAvailable < 100 && (
                    <Badge variant="outline" className="text-xs">
                      Limited
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="primary"
            size="lg"
            onClick={() => selectedCity && onCitySelect(selectedCity)}
            disabled={!selectedCity}
            className="px-8"
          >
            Continue to {selectedCity && CITIES.find(c => c.id === selectedCity)?.name}
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>Don't see your city? More locations coming soon.</p>
        </div>
      </div>
    </div>
  );
}