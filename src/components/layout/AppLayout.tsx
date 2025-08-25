import { Header } from "./Header";
import { Badge } from "@/components/ui/badge";

interface AppLayoutProps {
  children: React.ReactNode;
  user?: any;
  onSignOut?: () => void;
}

export function AppLayout({ children, user, onSignOut }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header user={user} onSignOut={onSignOut} />
      
      {/* Beta watermark */}
      <div className="fixed top-20 right-4 z-50 opacity-60">
        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
          BETA MVP
        </Badge>
      </div>
      
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}