import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, ArrowLeft, ArrowRight } from "lucide-react";

interface SurveyProgressProps {
  currentSection: number;
  totalSections: number;
  sectionTitle: string;
  canGoBack: boolean;
  canGoNext: boolean;
  onSave: () => void;
  onBack: () => void;
  onNext: () => void;
  isSaving?: boolean;
}

export function SurveyProgress({
  currentSection,
  totalSections,
  sectionTitle,
  canGoBack,
  canGoNext,
  onSave,
  onBack,
  onNext,
  isSaving
}: SurveyProgressProps) {
  const progressPercent = (currentSection / totalSections) * 100;

  return (
    <Card className="sticky top-4 bg-card/95 backdrop-blur-sm border shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{sectionTitle}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentSection} of {totalSections}
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            disabled={!canGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Progress"}
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}